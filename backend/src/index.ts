import express, { Express, Request, Response } from "express";
import { config } from "./config/config";
import { authRoutes } from "./modules/auth/auth.routes";

const app: Express = express();

app.use(`/${config.appPrefix}/auth`, authRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("InsightBase Server");
});

app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}/${config.appPrefix}`);
});
