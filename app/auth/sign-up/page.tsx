"use client";

import { signUpSchema } from "@/app/schemas/auth"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner";
import z from "zod";

const SignUpPage = () => {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        await authClient.signUp.email({
            email: data.email,
            name: data.name,
            password: data.password,
            fetchOptions: {
                onSuccess: () => {
                    toast.success('singup success')
                },
                onError: (error) => {
                    toast.error(error.error.message)
                }
            }
        })
    }
    return (
        <>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Create an account to get started
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-4">
                            <Controller name="name" control={form.control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="John doe" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}></FieldError>
                                    )}
                                </Field>
                            )} />
                            <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} type="email" placeholder="John@doe.com" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}></FieldError>
                                    )}
                                </Field>
                            )} />
                            <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} type="password" placeholder="****" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}></FieldError>
                                    )}
                                </Field>
                            )} />

                            <Button variant={'outline'} type="submit">Sigh Up</Button>
                        </FieldGroup>
                    </form>
                </CardContent>

            </Card>
        </>
    )
}
export default SignUpPage