"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const Header = () => {
    const params = useParams();
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const url = params.url as string[];

    const getWebsite = () => {
        if (!url || url.length === 0) return "Unknown website";
        let decoded = url.map(decodeURIComponent);
        let joined = decoded.join("/");
        return joined.replace(/^https?:\/{0,2}(www\.)?/, "");
    };

    const website = getWebsite();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <header className="flex items-center justify-center w-full h-16 bg-background px-4 mb-4">
            <div className="flex items-center gap-3 max-w-full">
                <h1 className="text-sm font-medium text-muted-foreground text-center border-b border-border pb-1">
                    Ask questions about{" "}
                    <span
                        className="text-foreground max-w-xs inline-block truncate align-bottom"
                        title={website}
                    >
                        <a
                            href={`https://${website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {website}
                        </a>
                    </span>
                </h1>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="h-8 w-8 p-0 cursor-pointer rounded-full hover:bg-accent flex-shrink-0"
                >
                    {mounted &&
                        (theme === "dark" ? (
                            <Sun className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        ) : (
                            <Moon className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        ))}
                </Button>
            </div>
        </header>
    );
};

export default Header;
