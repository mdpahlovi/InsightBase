import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { AppError } from "./AppError";

export const validate = (schema: z.ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const meaasges = error.issues.map((issue) => issue.message);
                next(new AppError(meaasges, 400));
            }
            next(error);
        }
    };
};
