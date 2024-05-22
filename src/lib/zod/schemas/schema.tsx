import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
    email: z
        .string()
        .email()
        .refine((value) => value.includes("@") && value.includes("."), {
            message: "Enter a valid email",
        }),
});

export const LoginFormSchema = z.object({
    email: z
        .string()
        .email()
        .refine((value) => value.includes("@") && value.includes("."), {
            message: "Enter a valid email",
        }),
    password: z.string().min(1, "Password is required"),
});

export const RegisterFormSchema = z
    .object({
        Email: z
            .string()
            .email()
            .refine((value) => value.includes("@") && value.includes("."), {
                message: "Enter a valid email",
            }),
        Password: z
            .string()
            .min(8, "Min. 8 characters")
            .refine((value) => /[a-z]/.test(value), {
                message: "Password need a lowercase",
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: "Password need a  uppercase",
            })
            .refine((value) => /\d/.test(value), {
                message: "Password need a  number",
            })
            .refine((value) => /\W|_/.test(value), {
                message: "Password need a  special character",
            }),
        ConfirmPassword: z.string().min(8, "Password is required"),
        
    })
    .refine((data) => data.Password === data.ConfirmPassword, {
        message: "Passwords do not match",
        path: ["ConfirmPassword"],
    });
