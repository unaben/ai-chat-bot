import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { personalData } from "@/data/personalData";
import { buildSystemPrompt } from "@/lib/buildSystemPrompt";

const isDev = process.env.NODE_ENV === "development";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Empty prompt" }, { status: 400 });
    }

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: buildSystemPrompt(personalData),
      prompt,
    });

    return NextResponse.json({ text });
  } catch (err) {
    if (isDev) {
      console.error("Chat route error:", err);
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
