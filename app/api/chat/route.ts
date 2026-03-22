import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { personalData } from "@/data/personalData";
import { buildSystemPrompt } from "@/lib/buildSystemPrompt";

export async function POST(req: NextRequest) {
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
}