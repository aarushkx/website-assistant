"use client";

import { Message } from "@ai-sdk/react";
import { ScrollArea } from "./ui/scroll-area";
import Messages from "./messages";

interface MessagesContainerProps {
    messages: Message[];
    isLoading?: boolean;
}

const MessagesContainer = ({ messages, isLoading }: MessagesContainerProps) => {
    return (
        <div className="flex-1 overflow-hidden">
            <div className="h-full flex justify-center">
                <div className="w-full max-w-4xl">
                    <ScrollArea className="h-full">
                        <Messages messages={messages} isLoading={isLoading} />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default MessagesContainer;
