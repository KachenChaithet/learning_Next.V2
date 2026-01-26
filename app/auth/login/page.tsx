"use client";

import { loginSchema } from "@/app/schemas/auth"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner";
import z from "zod";

const LoginPage = () => {
    const route = useRouter()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleLogin = async (data: z.infer<typeof loginSchema>) => {
        try {
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('login success')
                    },
                    onError: (error) => {
                        toast.error(error.error.message)
                    }
                }
            })
            route.push("/")
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Go to account get started
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Login</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(handleLogin)}>
                        <FieldGroup className="gap-y-4">

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

                            <Button variant={'outline'} type="submit">Login</Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card >
        </>
    )
}
export default LoginPage