"use server";

import z from "zod";
import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { postSchema } from "./schemas/blog";
import { redirect } from "next/navigation";
import { fetchAuthMutation } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";


export const createBlogAction = async (values: z.infer<typeof postSchema>) => {
    try {
        const parsed = postSchema.safeParse(values)

        if (!parsed.success) {
            throw new Error('something went wrong')
        }

        const imageUrl = await fetchAuthMutation(api.post.generateImageUploadUrl, {})

        const uploadResult = await fetch(imageUrl, {
            method: "POST",
            headers: {
                "Content-Type": parsed.data.image.type,
            },
            body: parsed.data.image,
        })

        if (!uploadResult.ok) {
            return {
                error: 'Faild to upload image'
            }
        }

        const { storageId } = await uploadResult.json()
        await fetchAuthMutation(api.post.createPost, {
            body: parsed.data.content,
            title: parsed.data.title,
            imageStorageId: storageId
        })

    } catch (error) {
        error: 'Faild to create post'

    }


    revalidatePath('/blog')

    return redirect('/')

}