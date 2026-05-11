import { NextResponse } from "next/server";
import { askBackboardForClarification } from "@/lib/backboard";

const mayaContext =
  "Maya Chen is finishing Grade 11 and preparing for Grade 12. Her record suggests reflective visual communication. She often communicates best after preparing, writing, sketching, building, diagramming, or explaining something she helped create. Useful context to ask about: setting, specific moment, whether she had a visual or prepared role, and whether another setting showed clearer communication.";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await askBackboardForClarification({
    studentName: body.studentName ?? "Maya Chen",
    transcript: Array.isArray(body.transcript) ? body.transcript : [],
    lastMessage: body.lastMessage ?? "",
    studentContext: body.studentContext ?? mayaContext
  });

  return NextResponse.json(result);
}
