import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages payload" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      temperature: 0.7,
    });

    const reply = response.choices?.[0]?.message?.content || "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("OpenAI API error:", err);
    return NextResponse.json({ error: "OpenAI request failed" }, { status: 500 });
  }
}
