"use server";

import z from "zod";
import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { postSchema } from "./schemas/blog";
import { redirect } from "next/navigation";
import { fetchAuthMutation } from "@/lib/auth-server";


export const createBlogAction = async (values: z.infer<typeof postSchema>) => {
    const parsed = postSchema.safeParse(values)

    if (!parsed.success) {
        throw new Error('something went wrong')
    }

    await fetchAuthMutation(api.post.createPost, {
        body: parsed.data.content,
        title: parsed.data.title,
    })

    return redirect('/')

}