import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSystemPrompt } from "@/lib/systemPrompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, locale = "en", profile } = await req.json();

    if (!profile) {
      return NextResponse.json({ error: "Profile is required" }, { status: 400 });
    }

    const systemPrompt = getSystemPrompt(locale);

    const chatMessages = [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `User selected profile:\n${JSON.stringify(profile, null, 2)}\nPlease follow the Nabous AI Guide structure.`
      },
      ...(messages || [])
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      temperature: 0.7,
    });

    const reply = response.choices?.[0]?.message?.content || "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("OpenAI API error:", err);
    return NextResponse.json({ error: "OpenAI request failed" }, { status: 500 });
  }
}
