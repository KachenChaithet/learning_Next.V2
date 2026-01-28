"use client";

import { createBlogAction } from "@/app/actions";
import { postSchema } from "@/app/schemas/blog"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner";
import z from "zod";

const CreatePage = () => {
    const route = useRouter()
    const [isPending, startTransition] = useTransition()
    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            content: '',
            title: '',
            image: undefined
        }
    })

    const handleCreatePost = async (values: z.infer<typeof postSchema>) => {
        startTransition(async () => {
            await createBlogAction(values)
            toast.success('Created Post Successfully')
        })


    }
    return (
        <div className="py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl ">Create Post</h1>
                <p className="text-lg text-muted-foreground pt-4 ">Share your thoughts with the big world</p>
            </div>

            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Blog Article</CardTitle>
                    <CardDescription>Create a new blog article</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(handleCreatePost)}>
                        <FieldGroup className="gap-y-4">

                            <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Title</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} type="text" placeholder="Enter your title" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}></FieldError>
                                    )}
                                </Field>
                            )} />

                            <Controller name="content" control={form.control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Content</FieldLabel>
                                    <Textarea aria-invalid={fieldState.invalid} placeholder="Enter your Content" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}></FieldError>
                                    )}
                                </Field>
                            )} />
                            <Controller name="image" control={form.control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Image</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Enter your Content" type="file" accept="image/*" onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        field.onChange(file)
                                    }} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}></FieldError>
                                    )}
                                </Field>
                            )} />

                            <Button variant={'outline'} disabled={isPending}>{isPending ? 'Create Post...' : 'Create Post'}</Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
export default CreatePage