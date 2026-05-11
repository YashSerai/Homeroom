import { z } from "zod";
import { type Dimension } from "@/lib/types";

export const extractionSchema = z.object({
  observedBehavior: z.string(),
  context: z.string(),
  setting: z.enum(["Full-class discussion", "Small-group", "Written work", "Lab", "Presentation", "1:1", "Other"]),
  dimension: z.enum([
    "writtenExpression",
    "preparedSpeaking",
    "smallGroupCollab",
    "projectExecution",
    "visualReasoning",
    "spontaneousPart"
  ]),
  confidence: z.enum(["low", "medium", "high"]),
  evidenceQuote: z.string(),
  needsMoreInfo: z.boolean()
});

export type ExtractionOutput = z.infer<typeof extractionSchema>;

export function clarifyObservation(transcript: string[], latest: string): string {
  const turns = transcript.filter((line) => line.startsWith("Teacher:")).length;
  const lower = latest.toLowerCase();
  if (turns >= 3 || lower.includes("that's all") || lower.includes("that is all")) return "READY";
  if (/\bsucks?\b|terrible|awful|bad attitude|dumb|stupid/i.test(lower)) {
    return "What happened today that made you feel concerned?";
  }
  if (lower.includes("quiet") || lower.includes("shy") || lower.includes("lazy")) {
    return "What moment in class made you notice that?";
  }
  if (!/(full-class|small-group|written|lab|presentation|1:1|group|discussion|writing|math)/i.test(latest)) {
    return "Was this during full-class discussion, small-group work, written work, or another setting?";
  }
  if (!/(sketch|draw|diagram|visual|model|built|build|made|wrote|prepared|plan|checklist)/i.test(transcript.join(" "))) {
    return "Did Maya have a chance to sketch, write, build, prepare, or use a visual before sharing?";
  }
  if (!/(helped|worked|support|shared more|wrote|prepared)/i.test(latest)) {
    return "Did you notice a setting where she shared more clearly?";
  }
  return "READY";
}

export function extractObservation(fullTranscript: string): ExtractionOutput {
  const teacherLines = fullTranscript
    .split("\n")
    .filter((line) => line.startsWith("Teacher:"))
    .map((line) => line.replace("Teacher:", "").trim());
  const evidence = teacherLines[0] || "Maya is quiet in math class.";
  const joined = teacherLines.join(" ");
  const hostileOnly = /\bsucks?\b|terrible|awful|bad attitude|dumb|stupid/i.test(joined) &&
    !/when|during|because|today|asked|wrote|group|discussion|project|assignment|class|after|before/i.test(joined);
  const hasOnlyLabel =
    /quiet|shy|lazy|introverted|struggling/i.test(evidence) &&
    !teacherLines.some((line) => /when|during|discussion|group|wrote|shared|asked|prepared/i.test(line));

  return extractionSchema.parse({
    observedBehavior: hostileOnly
      ? "The teacher shared a concern but did not yet provide an observable classroom moment."
      : hasOnlyLabel
      ? "In math class, Maya spoke less during the moment the teacher noticed; more context is needed before carrying this forward."
      : "In math class, Maya contributed less during full-class discussion, while the available note does not yet describe how she participated in other settings.",
    context: hostileOnly
      ? "Homeroom cannot convert a negative judgment into a learner observation without evidence."
      : hasOnlyLabel
      ? "The source note is label-heavy and lacks a specific classroom moment, so this is marked for revalidation."
      : "Teacher-entered observation from the add-observation flow.",
    setting: "Full-class discussion",
    dimension: "spontaneousPart" satisfies Dimension,
    confidence: "low",
    evidenceQuote: evidence,
    needsMoreInfo: hostileOnly
  });
}

export function fallbackProviderStatus() {
  return {
    provider: "demo-fallback",
    model: "deterministic-homeroom-local",
    reason: "No Backboard credentials were found in the local environment."
  };
}
