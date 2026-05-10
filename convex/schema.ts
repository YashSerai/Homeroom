import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const confidence = v.union(v.literal("low"), v.literal("medium"), v.literal("high"));
const dimension = v.union(
  v.literal("writtenExpression"),
  v.literal("preparedSpeaking"),
  v.literal("smallGroupCollab"),
  v.literal("projectExecution"),
  v.literal("visualReasoning"),
  v.literal("spontaneousPart")
);
const signal = v.union(
  v.literal("current"),
  v.literal("historical"),
  v.literal("stale"),
  v.literal("contradicted"),
  v.literal("revalidated")
);
const visibility = v.union(
  v.literal("teacher"),
  v.literal("handoff"),
  v.literal("parent"),
  v.literal("student"),
  v.literal("counselor"),
  v.literal("doNotCarryForward")
);

export default defineSchema({
  students: defineTable({
    name: v.string(),
    currentGrade: v.number(),
    currentYear: v.string(),
    personalityType: v.string(),
    personalityBlurb: v.string(),
    interests: v.array(v.string()),
    extracurriculars: v.array(v.string()),
    recentBooks: v.array(v.string()),
    backboardThreadId: v.optional(v.string())
  }).index("by_name", ["name"]),
  teachers: defineTable({
    name: v.string(),
    subject: v.string(),
    grade: v.number()
  }).index("by_grade", ["grade"]),
  parents: defineTable({
    name: v.string(),
    studentId: v.id("students"),
    relationship: v.string()
  }).index("by_student", ["studentId"]),
  grades: defineTable({
    studentId: v.id("students"),
    grade: v.number(),
    subject: v.string(),
    score: v.string(),
    year: v.string()
  }).index("by_student", ["studentId"]).index("by_student_grade", ["studentId", "grade"]),
  rawNotes: defineTable({
    studentId: v.id("students"),
    teacherId: v.optional(v.id("teachers")),
    parentId: v.optional(v.id("parents")),
    grade: v.number(),
    subject: v.optional(v.string()),
    setting: v.optional(v.string()),
    rawText: v.string(),
    chatTranscript: v.optional(v.string()),
    processed: v.boolean(),
    createdAt: v.number(),
    containsBannedLabel: v.optional(v.boolean()),
    labelWarning: v.optional(v.string())
  }).index("by_student", ["studentId"]).index("by_grade", ["studentId", "grade"]).index("by_teacher", ["teacherId"]),
  observations: defineTable({
    studentId: v.id("students"),
    sourceNoteId: v.id("rawNotes"),
    teacherId: v.optional(v.id("teachers")),
    grade: v.number(),
    subject: v.optional(v.string()),
    setting: v.string(),
    observedBehavior: v.string(),
    context: v.string(),
    dimension,
    signal,
    confidence,
    visibility,
    evidenceQuote: v.string(),
    humanApproved: v.boolean(),
    needsRevalidation: v.boolean(),
    createdAt: v.number(),
    lastValidated: v.optional(v.number())
  }).index("by_student", ["studentId"]).index("by_source_note", ["sourceNoteId"]).index("by_grade", ["studentId", "grade"]),
  insights: defineTable({
    studentId: v.id("students"),
    summary: v.string(),
    evidenceObservationIds: v.array(v.id("observations")),
    dimension,
    confidence,
    visibility,
    humanApproved: v.boolean(),
    needsRevalidation: v.boolean(),
    createdAt: v.number(),
    lastValidated: v.optional(v.number())
  }).index("by_student", ["studentId"]),
  patterns: defineTable({
    studentId: v.id("students"),
    pattern: v.string(),
    description: v.string(),
    evidenceObservationIds: v.array(v.id("observations")),
    suggestedSupport: v.string(),
    confidence,
    isContradiction: v.boolean(),
    firstDetected: v.number(),
    lastValidated: v.number()
  }).index("by_student", ["studentId"]),
  growthMapDimensions: defineTable({
    studentId: v.id("students"),
    grade: v.number(),
    writtenExpression: v.number(),
    preparedSpeaking: v.number(),
    smallGroupCollab: v.number(),
    projectExecution: v.number(),
    visualReasoning: v.number(),
    spontaneousPart: v.number()
  }).index("by_student", ["studentId"]).index("by_student_grade", ["studentId", "grade"]),
  subjectPerformance: defineTable({
    studentId: v.id("students"),
    grade: v.number(),
    year: v.string(),
    subject: v.string(),
    score: v.string(),
    numericAverage: v.number(),
    gpaPoints: v.number()
  }).index("by_student", ["studentId"]).index("by_student_grade", ["studentId", "grade"]),
  curriculumCompetencies: defineTable({
    studentId: v.id("students"),
    grade: v.number(),
    subject: v.string(),
    competency: v.string(),
    score: v.number(),
    evidenceObservationIds: v.array(v.id("observations"))
  }).index("by_student", ["studentId"]).index("by_student_grade", ["studentId", "grade"]),
  personalitySnapshots: defineTable({
    studentId: v.id("students"),
    grade: v.number(),
    openness: v.number(),
    conscientiousness: v.number(),
    extraversion: v.number(),
    agreeableness: v.number(),
    emotionalRange: v.number(),
    source: v.string(),
    completedAt: v.number()
  }).index("by_student", ["studentId"]).index("by_student_grade", ["studentId", "grade"]),
  pathwaySuggestions: defineTable({
    studentId: v.id("students"),
    grade: v.number(),
    area: v.string(),
    rationale: v.string(),
    evidenceObservationIds: v.array(v.id("observations")),
    explorationSteps: v.array(v.string()),
    icon: v.string()
  }).index("by_student", ["studentId"]).index("by_grade", ["studentId", "grade"]),
  conversationPrompts: defineTable({
    studentId: v.id("students"),
    prompt: v.string(),
    derivedFrom: v.array(v.string())
  }).index("by_student", ["studentId"]),
  handoffState: defineTable({
    studentId: v.id("students"),
    teacherId: v.id("teachers"),
    firstObservationLogged: v.boolean(),
    revealedAt: v.optional(v.number())
  }).index("by_student_teacher", ["studentId", "teacherId"]),
  auditEvents: defineTable({
    studentId: v.id("students"),
    actorRole: v.string(),
    actorName: v.string(),
    action: v.string(),
    targetType: v.string(),
    targetId: v.optional(v.string()),
    details: v.string(),
    createdAt: v.number()
  }).index("by_student", ["studentId"]),
  aiWorkflowRuns: defineTable({
    studentId: v.id("students"),
    workflowType: v.string(),
    status: v.string(),
    steps: v.array(v.object({ name: v.string(), status: v.string(), at: v.number(), detail: v.optional(v.string()) })),
    provider: v.string(),
    model: v.optional(v.string()),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
    error: v.optional(v.string())
  }).index("by_student", ["studentId"]).index("by_status", ["status"])
});
