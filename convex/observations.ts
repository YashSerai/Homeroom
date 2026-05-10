import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const byStudent = query({
  args: { studentId: v.id("students") },
  handler: async (ctx, args) =>
    ctx.db.query("observations").withIndex("by_student", (q) => q.eq("studentId", args.studentId)).collect()
});

export const approveDraft = mutation({
  args: {
    studentId: v.id("students"),
    teacherId: v.id("teachers"),
    rawText: v.string(),
    chatTranscript: v.string(),
    observedBehavior: v.string(),
    context: v.string(),
    setting: v.string(),
    dimension: v.union(
      v.literal("writtenExpression"),
      v.literal("preparedSpeaking"),
      v.literal("smallGroupCollab"),
      v.literal("projectExecution"),
      v.literal("visualReasoning"),
      v.literal("spontaneousPart")
    ),
    confidence: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    evidenceQuote: v.string()
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const noteId = await ctx.db.insert("rawNotes", {
      studentId: args.studentId,
      teacherId: args.teacherId,
      grade: 11,
      subject: "Math",
      setting: args.setting,
      rawText: args.rawText,
      chatTranscript: args.chatTranscript,
      processed: true,
      createdAt: now,
      containsBannedLabel: /quiet|shy|lazy|introverted|struggling/i.test(args.rawText),
      labelWarning: /quiet|shy|lazy|introverted|struggling/i.test(args.rawText) ? "label-only · low confidence" : undefined
    });
    const observationId = await ctx.db.insert("observations", {
      studentId: args.studentId,
      sourceNoteId: noteId,
      teacherId: args.teacherId,
      grade: 11,
      subject: "Math",
      setting: args.setting,
      observedBehavior: args.observedBehavior,
      context: args.context,
      dimension: args.dimension,
      signal: "current",
      confidence: args.confidence,
      visibility: "handoff",
      evidenceQuote: args.evidenceQuote,
      humanApproved: true,
      needsRevalidation: args.confidence === "low",
      createdAt: now,
      lastValidated: now
    });
    await ctx.db.insert("auditEvents", {
      studentId: args.studentId,
      actorRole: "teacher",
      actorName: "Demo Teacher",
      action: "approved_observation",
      targetType: "observation",
      targetId: observationId,
      details: "Teacher approved AI-structured observation draft.",
      createdAt: now
    });
    const handoff = await ctx.db
      .query("handoffState")
      .withIndex("by_student_teacher", (q) => q.eq("studentId", args.studentId).eq("teacherId", args.teacherId))
      .first();
    if (handoff) {
      await ctx.db.patch(handoff._id, { firstObservationLogged: true, revealedAt: now });
    } else {
      await ctx.db.insert("handoffState", {
        studentId: args.studentId,
        teacherId: args.teacherId,
        firstObservationLogged: true,
        revealedAt: now
      });
    }
    await ctx.db.insert("aiWorkflowRuns", {
      studentId: args.studentId,
      workflowType: "observation_approval",
      status: "completed",
      provider: "demo-fallback",
      model: "deterministic-homeroom-local",
      steps: [
        { name: "raw_note_saved", status: "completed", at: now },
        { name: "observation_saved", status: "completed", at: now },
        { name: "handoff_gate_updated", status: "completed", at: now }
      ],
      startedAt: now,
      completedAt: now
    });
    return observationId;
  }
});
