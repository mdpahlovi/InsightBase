import { config } from "../config/config";
import { ChatGroq } from "@langchain/groq";

export const model = new ChatGroq({
    apiKey: config.groqApiKey,
    model: "llama-3.1-8b-instant",
});
