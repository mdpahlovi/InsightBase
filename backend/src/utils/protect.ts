import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { AppError } from "./AppError";
import { catchAsync } from "./catchAsync";

interface DecodedToken {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

declare global {
    namespace Express {
        interface Request {
            user?: DecodedToken;
        }
    }
}

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(new AppError("Please login to access this route", 401));
    }

    const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken;

    if (!decoded) {
        return next(new AppError("Please login to access this route", 401));
    }

    req.user = decoded;

    next();
});
