import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createPost = mutation({
    args: {
        title: v.string(),
        body: v.string(),
        imageStorageId: v.optional(v.id("_storage"))

    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx)
        if (!user) {
            throw new ConvexError('Not authentication')
        }
        const blogArticle = await ctx.db.insert("posts", { title: args.title, body: args.body, authorId: user._id, imageStorageId: args.imageStorageId });
        return blogArticle;
    },
});

export const getPost = query({
    args: {},
    handler: async (ctx, args) => {
        const posts = await ctx.db.query('posts').order('desc').collect();
        return Promise.all(
            posts.map(async (post) => ({
                ...post,
                ...(post.imageStorageId && { imageUrl: await ctx.storage.getUrl(post.imageStorageId) }),
            }))
        );
    },
})


export const generateImageUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx)
        if (!user) {
            throw new ConvexError('Not authentication')
        }

        return await ctx.storage.generateUploadUrl();

    }
})

export const getPostById = query({
    args: { postId: v.id("posts") },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId)
        if (!post) {
            return null;
        }
        const resolvedImageUrl = post?.imageStorageId !== undefined && await ctx.storage.getUrl(post?.imageStorageId)
        return {
            ...post,
            imageUrl: resolvedImageUrl
        }
    },
})