"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
}
    from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
}
    from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/assets/icons";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "@/lib/zod/schemas/schema";
import { RegisterFormSchemaTypes } from "../../lib/types/types";
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function RegisterForm({ className, ...props }: RegisterFormProps) {
    const form = useForm<RegisterFormSchemaTypes>({
        resolver: zodResolver(RegisterFormSchema),
        mode: "onChange",
    });
    
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: RegisterFormSchemaTypes) => {

        try {
            const response = await axios.post('https://run.mocky.io/v3/66c3a16b-34b2-4d2b-9819-cc6c52bac79b', ///api/v1/register  https://perfectly-funny-kid.ngrok-free.app/api/v1/register
                JSON.stringify({
                    Email: data.Email,
                    Password: data.Password,
                    ConfirmPassword: data.ConfirmPassword
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }
            );

            if (response.status == 201 && response.data.Registered) {
                toast.success("Registration Successful!.", { theme: "colored" });
                console.log('Registration successful');
                setRegistrationSuccess(true);

                setTimeout(() => {
                    router.push('/dashboard');   
                }, 1000)

            }
        } catch (error: any) {
            handleErrors(error.response);
        }

        if (registrationSuccess) {
            form.reset({
                Email: "",
                Password: "",
                ConfirmPassword: "",
            });
        }
        console.log(data);
    };

    const handleErrors = (response: any) => {
        const errorMessages: { [key: number]: string } = {
            401: 'Unauthorized: Please register or provide valid credentials.',
            403: "Forbidden: You don't have permission to access this resource.",
            404: 'Not Found: The requested resource could not be found. Try again.',
            500: 'Internal Server Error: Something went wrong on the server. Try again later.',
            503: 'Service Unavailable: The server is currently unavailable. Please try again later.',
        };

        
        if (response !== undefined) {
            if (response.status == 422 && response.data && response.data.FieldErrors) {
                if (response.data.FieldErrors.Password) {
                    toast.error(response.data.FieldErrors.Password, { theme: 'colored' });
                }
                if (response.data.FieldErrors.Email) {
                    toast.error(response.data.FieldErrors.Email, { theme: 'colored' });
                }
            } else {
                const message = errorMessages[response.status] || 'Registration Failed! Try again.';
                toast.error(message, { theme: 'colored' });   
            }
        } 
        else {
            console.error('Unexpected error: Response data does not contain FieldErrors property', response);
            toast.error('Unexpected error, try again later', { theme: 'colored' });
        }
        };


    return (
        <Card className="mx-auto max-w-sm outline-none shadow-none border-none mt-[60px]">
            <CardHeader>
                <CardTitle className="text-2xl font-mainhead ">Register</CardTitle>
                <CardDescription>
                    Enter your details below to register to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
                        <div className="grid gap-4">

                            <FormField
                                control={form.control}
                                name="Email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="mail@example.com"
                                                disabled={form.formState.isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="Password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="password"
                                                type="password"
                                                placeholder="Create Password"
                                                disabled={form.formState.isSubmitting}
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e); // Update the password field
                                                    form.trigger("ConfirmPassword"); // Manually trigger validation of the confirmPassword field
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ConfirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="Confirm Password"
                                                disabled={form.formState.isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 ||
                                    form.formState.isSubmitting
                                }
                                type="submit"
                                className="w-full"
                            >
                                {form.formState.isSubmitting && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Register
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    type="button"
                    disabled={form.formState.isSubmitting}
                    className="flex items-center w-full"
                >
                    {form.formState.isSubmitting ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                    )}{" "}
                    Register with Google
                </Button>
            </CardContent>

            <CardFooter>
                <p className="text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </CardFooter>

        </Card>
    );
}
