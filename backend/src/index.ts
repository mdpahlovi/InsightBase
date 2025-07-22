import express, { Express, Request, Response } from "express";
import userRoutes from "./modules/users/users.routes";
import { config } from "./config/config";

const app: Express = express();

app.use("/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("InsightBase Server");
});

app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}/${config.appPrefix}`);
});
