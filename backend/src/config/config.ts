import dotenv from "dotenv";

dotenv.config();

export const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    appPrefix: process.env.APP_PREFIX,
};
