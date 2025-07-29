import { useEffect, useRef } from "react";
import { type Message as TMessage } from "@ai-sdk/react";
import { MessageSquare, Sparkles } from "lucide-react";
import MessageCard from "./message-card";

interface MessagesProps {
    messages: TMessage[];
    isLoading?: boolean;
}

const Messages = ({ messages, isLoading }: MessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="h-full">
            {messages.length ? (
                <div className="space-y-0">
                    {messages.map((message, index) => (
                        <MessageCard
                            key={message.id || index}
                            content={message.content}
                            isUserMessage={message.role === "user"}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                    {isLoading &&
                        (messages.length === 0 ||
                            messages.at(-1)?.role === "user") && (
                            <MessageCard
                                content="Thinking..."
                                isUserMessage={false}
                                isLoading={true}
                            />
                        )}
                </div>
            ) : (
                <div className="flex h-full items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                                <MessageSquare className="h-8 w-8 text-primary" />
                                <Sparkles className="absolute ml-8 mt-8 h-4 w-4 text-primary animate-pulse" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Ready to Chat!
                            </h3>
                            <p className="text-muted-foreground text-base">
                                I&apos;ve analyzed the content and I&apos;m
                                ready to answer your questions. Ask me anything
                                about what you&apos;re reading!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;
