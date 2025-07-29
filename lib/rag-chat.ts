import { OpenAIChatLanguageModel, RAGChat } from "@upstash/rag-chat";
import { createOpenAI } from "@ai-sdk/openai";
import { redis } from "./redis";

const model = createOpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "", // Local Ollama doesn't require an API key
});

const llamaModel = model("llama2") as OpenAIChatLanguageModel;

export const ragChat = new RAGChat({
    model: llamaModel,
    redis: redis,
    debug: false,
});
