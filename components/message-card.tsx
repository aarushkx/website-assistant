"use client";

import { useEffect, useState } from "react";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageCardProps {
    content: string;
    isUserMessage: boolean;
    isLoading?: boolean;
}

const MessageCard = ({
    content,
    isUserMessage,
    isLoading,
}: MessageCardProps) => {
    const [timestamp, setTimestamp] = useState("");

    useEffect(() => {
        setTimestamp(
            new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    }, []);

    return (
        <div
            className={cn("p-4 rounded-2xl", {
                "bg-muted/50": isUserMessage,
            })}
        >
            <div className="mx-auto flex max-w-4xl items-start gap-4">
                <Avatar>
                    <AvatarFallback
                        className={cn({
                            "bg-primary text-primary-foreground": isUserMessage,
                            "bg-muted": !isUserMessage,
                        })}
                    >
                        {isUserMessage ? (
                            <User className="h-5 w-5" />
                        ) : (
                            <Bot className="h-5 w-5" />
                        )}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                            {isUserMessage ? "You" : "Assistant"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {timestamp}
                        </span>
                    </div>

                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                        {isLoading ? (
                            <AnimatedShinyText>Thinking...</AnimatedShinyText>
                        ) : (
                            content
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageCard;
