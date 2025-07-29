"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const LandingPage = () => {
    const [urlInput, setUrlInput] = useState("");
    const router = useRouter();

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!urlInput || !isValidUrl(urlInput.trim())) {
            alert(
                "Please enter a valid URL, including the protocol (https://)"
            );
            return;
        }

        const decoded = decodeURIComponent(urlInput.trim());
        router.push(`/${decoded}`);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="absolute top-4 right-6 p-6 z-20">
                <ThemeToggle />
            </div>

            <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16">
                <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                    <Badge variant="secondary" className="mb-8 px-4 py-2">
                        <Globe className="mr-1 h-4 w-4" />
                        AI-Powered Website Analysis
                    </Badge>

                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
                        Turn Any Website Into{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            a Conversation
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                        Why spend hours reading when you can have an intelligent
                        conversation instead? Paste any website URL and
                        instantly unlock its content through AI-powered chat.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto mb-16"
                    >
                        <div className="relative flex-1">
                            <Input
                                type="url"
                                placeholder="https://example.com"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                className="h-12 pl-4 pr-12"
                                autoComplete="off"
                                spellCheck={false}
                            />
                            <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={!urlInput.trim()}
                            className="h-12 cursor-pointer hover:bg-primary/90"
                        >
                            Start Chat
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default LandingPage;
