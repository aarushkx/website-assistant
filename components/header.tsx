"use client";

import { useParams } from "next/navigation";
import ThemeToggle from "./theme-toggle";

const Header = () => {
    const params = useParams();
    const url = params.url as string[];

    const getWebsite = () => {
        if (!url || url.length === 0) return "Unknown website";
        const decoded = url.map(decodeURIComponent);
        const joined = decoded.join("/");
        return joined.replace(/^https?:\/{0,2}(www\.)?/, "");
    };

    const website = getWebsite();

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

                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
