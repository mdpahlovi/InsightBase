import { z } from "zod";

const signup = z.object({
    body: z.object({
        name: z.string({ error: "Full name is required" }),
        email: z.email({ error: "Email is required" }),
        password: z.string({ error: "Password is required" }).min(6),
    }),
});

const signin = z.object({
    body: z.object({
        email: z.email({ error: "Email is required" }),
        password: z.string({ error: "Password is required" }),
    }),
});

export const authValidation = { signup, signin };
