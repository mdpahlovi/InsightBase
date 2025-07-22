import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

dotenv.config();

export const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    appPrefix: process.env.APP_PREFIX,

    jwtSecret: process.env.JWT_SECRET as Secret,
};
