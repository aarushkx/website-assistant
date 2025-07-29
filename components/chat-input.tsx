"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Loader2 } from "lucide-react";
import { BorderBeam } from "./magicui/border-beam";

interface ChatInputProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isLoading?: boolean;
}

const ChatInput = ({
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
}: ChatInputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="relative rounded-2xl overflow-hidden">
            <form
                onSubmit={handleSubmit}
                className="relative bg-background border border-border rounded-2xl"
            >
                <Textarea
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about this content..."
                    className="h-24 resize-none p-4 pr-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                    disabled={isLoading}
                    autoFocus
                />
                <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    size="sm"
                    className="absolute bottom-2 right-2 h-8 w-8 cursor-pointer rounded-md p-0"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <SendHorizontal className="h-4 w-4" />
                    )}
                </Button>
            </form>

            <BorderBeam
                duration={4}
                size={300}
                reverse
                className="from-transparent via-purple-400 to-transparent"
            />
        </div>
    );
};

export default ChatInput;
