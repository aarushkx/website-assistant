import { cookies } from "next/headers";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import ChatContainer from "@/components/chat-container";

interface DynamicChatPageProps {
    params: {
        url: Promise<string[] | undefined>;
    };
}

const reconstructUrl = ({ url }: { url: string[] }) => {
    let decoded = url.map((component) => decodeURIComponent(component));
    let joined = decoded.join("/");
    joined = joined.replace(/^(https?:\/)([^/])/, "$1/$2");
    return joined;
};

const DynamicChatPage = async ({ params }: DynamicChatPageProps) => {
    const { url } = await params;

    if (!Array.isArray(url) || url.length === 0)
        throw new Error("Invalid URL parameters for catch-all route");

    const userSessionCookie = (await cookies()).get("sessionId")?.value;
    const targetUrl = reconstructUrl({ url });

    const chatSessionId = (targetUrl + "-" + userSessionCookie).replace(
        /\//g,
        ""
    );

    const isIndexed = await redis.sismember("indexed-urls", targetUrl);
    console.log(
        `Content from ${targetUrl} already indexed?`,
        Boolean(isIndexed)
    );

    const initialMessages = await ragChat.history.getMessages({
        amount: 10,
        sessionId: chatSessionId,
    });

    try {
        if (!isIndexed) {
            console.log(`Indexing new content from: ${targetUrl}`);

            await ragChat.context.add({
                type: "html",
                source: targetUrl,
                config: { chunkOverlap: 50, chunkSize: 200 },
            });

            await redis.sadd("indexed-urls", targetUrl);
            console.log(`Successfully indexed: ${targetUrl}`);
        }
    } catch (error) {
        console.error("Failed to index content:", error);
    }

    return (
        <ChatContainer
            initialMessages={initialMessages}
            sessionId={chatSessionId}
        />
    );
};

export default DynamicChatPage;
