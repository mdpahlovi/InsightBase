import { z } from "zod";

const create = z.object({
    body: z.object({
        title: z.string({ error: "Title is required" }),
        body: z.string({ error: "Body is required" }),
        tags: z.array(z.string({ error: "Tags are required" })),
    }),
});

export const articleValidation = { create };
