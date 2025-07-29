"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
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
    );
};

export default ThemeToggle;
