import { NextRequest, NextResponse } from "next/server";
import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";

interface IRequestBody {
    messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
    sessionId: string;
}

export const POST = async (request: NextRequest) => {
    try {
        const { messages, sessionId }: IRequestBody = await request.json();

        if (!messages?.length || !sessionId) {
            return NextResponse.json(
                { error: "Messages and session ID are required" },
                { status: 400 }
            );
        }

        const lastMessage = messages.length > 0 ? messages.at(-1)!.content : "";

        console.log(`Processing chat request for session: ${sessionId}`);

        const response = await ragChat.chat(lastMessage, {
            streaming: true,
            sessionId,
        });

        console.log("RESPONSE:", response); // TODO: Remove this.

        return aiUseChatAdapter(response);
    } catch (error) {
        console.error("Error processing chat request:", error);
        return NextResponse.json(
            { error: "Error processing chat request" },
            { status: 500 }
        );
    }
};
