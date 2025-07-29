"use client";

import { Message, useChat } from "@ai-sdk/react";
import ChatInput from "./chat-input";
import Header from "./header";
import MessagesContainer from "./messages-container";

const ChatContainer = ({
    initialMessages,
    sessionId,
}: {
    initialMessages: Message[];
    sessionId: string;
}) => {
    const { messages, handleInputChange, handleSubmit, input, isLoading } =
        useChat({
            api: "/api/chat",
            body: { sessionId },
            initialMessages,
        });

    return (
        <div className="flex h-screen w-full flex-col">
            <Header />
            <MessagesContainer messages={messages} isLoading={isLoading} />

            <div className="fixed bottom-0 left-0 right-0 p-4">
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl">
                        <div className="rounded-2xl">
                            <ChatInput
                                input={input}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-28" />
        </div>
    );
};

export default ChatContainer;
