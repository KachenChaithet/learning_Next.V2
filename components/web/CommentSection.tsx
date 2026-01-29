"use client";

import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { commentSchema } from "@/app/schemas/comment"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";

interface iAppProps {
    comments: {
        _id: Id<"comments">,
        _creationTime: number
        authorId: string
        authorName: string
        body: string
        postId: Id<"posts">
    }[]
}


const CommentSection = () => {
    const [isPending, startTransition] = useTransition()
    const { postId } = useParams<{ postId: Id<'posts'> }>()
    const comments = useQuery(api.comments.getCommentsByPost, { postId })
    const createComment = useMutation(api.comments.createComment)
    console.log(comments);


    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            body: "",
            postId: postId
        }
    })
    const handleSubmit = (data: z.infer<typeof commentSchema>) => {
        startTransition(async () => {
            try {
                await createComment(data)
                form.reset()
                toast.success("Comment post!")
            } catch (error) {
                toast.error("Failed to create post")
            }
        })
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 border-b border-muted-foreground">
                <MessageSquare className="size-5" />
                <h2 className="text-xl font-bold">5 Coments</h2>
            </CardHeader>

            <CardContent>
                <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                    <Controller
                        name="body"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Content</FieldLabel>
                                <Textarea placeholder="Share your thoughts" aria-invalid={fieldState.invalid}   {...field} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}></FieldError>
                                )}
                            </Field>
                        )}
                    />

                    <Button type="submit" disabled={isPending}>{isPending ? "Submit..." : "Submit"}</Button>
                    {JSON.stringify(comments)}
                </form>

                <section className="space-y-6">
                    {comments?.map((comment) => (
                        <div key={comment._id} className="flex gap-4">

                        </div>
                    ))}
                </section>
            </CardContent>
        </Card>
    )
}
export default CommentSection