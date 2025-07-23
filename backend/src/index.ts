import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import { config } from "./config/config";
import { authRoutes } from "./modules/auth/auth.routes";
import { articleRoutes } from "./modules/articles/articles.routes";
import { AppError } from "./utils/AppError";
import { ZodError } from "zod";
import cookieParser from "cookie-parser";
import { protect } from "./utils/protect";

const app: Express = express();

app.use(cookieParser());

app.use(
    cors({
        origin: config.frontendUrl?.split(","),
        credentials: true,
    })
);

app.use(express.json());

app.use(`/${config.appPrefix}/auth`, authRoutes);
app.use(`/${config.appPrefix}/articles`, articleRoutes);

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
