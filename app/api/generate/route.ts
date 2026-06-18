import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { subject, topics, examDate } = await req.json();

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
        Create a study plan.

        Subject: ${subject}
        Topics: ${topics}
        Exam Date: ${examDate}
        `,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  return NextResponse.json({
    plan: completion.choices[0].message.content,
  });
}