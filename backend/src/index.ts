import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { config } from "./config/config";
import { articleRoutes } from "./modules/articles/articles.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { AppError } from "./utils/AppError";

const app: Express = express();

app.set("trust proxy", 1);

app.use(cookieParser());

app.use(
    cors({
        origin: config.frontendUrl,
        credentials: true,
    })
);

app.use(express.json());

app.use(`/${config.appPrefix}/auth`, authRoutes);
app.use(`/${config.appPrefix}/article`, articleRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("InsightBase Server");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
        });
    } else if (error instanceof ZodError) {
        return res.status(500).json({
            message: error.issues.map((issue) => issue.message),
        });
    } else {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
});

app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}/${config.appPrefix}`);
});
