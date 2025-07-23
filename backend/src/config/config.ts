import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

dotenv.config();

export const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    appPrefix: process.env.APP_PREFIX,
    frontendUrl: process.env.FRONTEND_URL,

    jwtSecret: process.env.JWT_SECRET as Secret,

    geminiKey: process.env.GEMINI_API_KEY,
};
