import { config } from "../config/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const model = new ChatGoogleGenerativeAI({
    apiKey: config.geminiKey,
    model: "gemini-2.0-flash",
    temperature: 0.7,
    maxOutputTokens: 2048,
});
