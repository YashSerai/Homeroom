import { NextResponse } from "next/server";
import { askBackboardForExtraction } from "@/lib/backboard";

const mayaContext =
  "Maya Chen is finishing Grade 11 and preparing for Grade 12. Her record suggests reflective visual communication. Do not infer more than the teacher said. If the teacher mentions low participation, preserve the setting. If the teacher mentions sketches, models, building, diagrams, prepared roles, or written planning, those may support visual reasoning, project execution, prepared communication, or written expression.";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await askBackboardForExtraction({
    fullTranscript: body.fullTranscript ?? "",
    studentContext: body.studentContext ?? mayaContext
  });

  return NextResponse.json(result);
}
