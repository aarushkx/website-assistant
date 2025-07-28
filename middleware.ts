import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const middleware = (request: NextRequest) => {
    const response = NextResponse.next();

    const cookie = request.cookies.get("sessionId");
    if (!cookie) {
        response.cookies.set("sessionId", uuidv4(), {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
    }

    return response;
};
