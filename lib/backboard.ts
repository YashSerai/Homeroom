import { clarifyObservation, extractObservation, extractionSchema, fallbackProviderStatus } from "@/lib/demoAiFallback";
import { CLARIFICATION_PROMPT, EXTRACTION_PROMPT } from "@/lib/prompts";

const BACKBOARD_BASE_URL = "https://app.backboard.io/api";

type BackboardMessageResponse = {
  content?: string;
  thread_id?: string;
  model?: string;
  error?: string;
};

async function sendBackboardMessage(input: {
  content: string;
  threadId?: string;
  systemPrompt?: string;
  memory?: "Auto" | "Readonly" | "off";
}) {
  const apiKey = process.env.BACKBOARD_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(`${BACKBOARD_BASE_URL}/threads/messages`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      thread_id: input.threadId,
      content: input.systemPrompt ? `${input.systemPrompt}\n\n${input.content}` : input.content,
      stream: false,
      memory: input.memory ?? "Readonly"
    })
  });

  if (!response.ok) {
    throw new Error(`Backboard request failed with ${response.status}`);
  }

  return (await response.json()) as BackboardMessageResponse;
}

function extractJsonBlock(content: string) {
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return fenced?.[1] ?? content;
}

export async function askBackboardForClarification(input: {
  studentName: string;
  transcript: string[];
  lastMessage: string;
}) {
  if (!process.env.BACKBOARD_API_KEY) {
    return {
      text: clarifyObservation(input.transcript, input.lastMessage),
      ...fallbackProviderStatus()
    };
  }

  try {
    const result = await sendBackboardMessage({
      systemPrompt: CLARIFICATION_PROMPT,
      memory: "Readonly",
      content: `Student: ${input.studentName}
Conversation so far:
${input.transcript.join("\n")}
Teacher's latest message: ${input.lastMessage}

Output one sentence question OR READY.`
    });

    return {
      text: result?.content?.trim() || clarifyObservation(input.transcript, input.lastMessage),
      provider: "backboard",
      model: result?.model ?? "backboard-router"
    };
  } catch (error) {
    return {
      text: clarifyObservation(input.transcript, input.lastMessage),
      ...fallbackProviderStatus(),
      error: error instanceof Error ? error.message : "Backboard clarification failed"
    };
  }
}

export async function askBackboardForExtraction(input: { fullTranscript: string }) {
  if (!process.env.BACKBOARD_API_KEY) {
    return {
      json: extractObservation(input.fullTranscript),
      ...fallbackProviderStatus()
    };
  }

  try {
    const result = await sendBackboardMessage({
      systemPrompt: EXTRACTION_PROMPT,
      memory: "Readonly",
      content: `Source conversation:
${input.fullTranscript}

Output JSON exactly:
{
  "observedBehavior": string,
  "context": string,
  "setting": "Full-class discussion" | "Small-group" | "Written work" | "Lab" | "Presentation" | "1:1" | "Other",
  "dimension": "writtenExpression" | "preparedSpeaking" | "smallGroupCollab" | "projectExecution" | "visualReasoning" | "spontaneousPart",
  "confidence": "low" | "medium" | "high",
  "evidenceQuote": string,
  "needsMoreInfo": boolean
}`
    });
    const parsed = extractionSchema.parse(JSON.parse(extractJsonBlock(result?.content ?? "{}")));
    return {
      json: parsed,
      provider: "backboard",
      model: result?.model ?? "backboard-router"
    };
  } catch (error) {
    return {
      json: extractObservation(input.fullTranscript),
      ...fallbackProviderStatus(),
      error: error instanceof Error ? error.message : "Backboard extraction failed"
    };
  }
}

export async function writeBackboardMemory(input: { studentId: string; observationId: string; summary: string }) {
  if (!process.env.BACKBOARD_API_KEY) {
    return {
      ok: true,
      provider: "demo-fallback",
      memoryEvent: `local-memory:${input.studentId}:${input.observationId}:${input.summary.slice(0, 32)}`
    };
  }

  try {
    const result = await sendBackboardMessage({
      memory: "Auto",
      content: `Student memory update for ${input.studentId}. Approved observation ${input.observationId}: ${input.summary}`
    });
    return { ok: true, provider: "backboard", memoryEvent: result?.thread_id ?? "queued" };
  } catch (error) {
    return {
      ok: true,
      provider: "demo-fallback",
      memoryEvent: `local-memory:${input.studentId}:${input.observationId}`,
      error: error instanceof Error ? error.message : "Backboard memory write failed"
    };
  }
}
