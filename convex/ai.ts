import { action, mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { askBackboardForClarification, askBackboardForExtraction } from "../lib/backboard";

export const createWorkflowRun = mutation({
  args: {
    studentId: v.optional(v.id("students")),
    workflowType: v.string(),
    provider: v.string(),
    model: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    if (!args.studentId) return null;
    return await ctx.db.insert("aiWorkflowRuns", {
      studentId: args.studentId,
      workflowType: args.workflowType,
      status: "running",
      steps: [{ name: "started", status: "complete", at: Date.now() }],
      provider: args.provider,
      model: args.model,
      startedAt: Date.now()
    });
  }
});

export const completeWorkflowRun = mutation({
  args: {
    runId: v.optional(v.id("aiWorkflowRuns")),
    status: v.string(),
    provider: v.string(),
    model: v.optional(v.string()),
    stepName: v.string(),
    error: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    if (!args.runId) return { ok: true };
    const run = await ctx.db.get(args.runId);
    if (!run) return { ok: true };
    await ctx.db.patch(args.runId, {
      status: args.status,
      provider: args.provider,
      model: args.model,
      completedAt: Date.now(),
      error: args.error,
      steps: [...run.steps, { name: args.stepName, status: args.status, at: Date.now(), detail: args.error }]
    });
    return { ok: true };
  }
});

export const clarifyObservation = action({
  args: {
    studentId: v.optional(v.id("students")),
    studentName: v.string(),
    transcript: v.array(v.string()),
    lastMessage: v.string()
  },
  handler: async (ctx, args) => {
    const runId = await ctx.runMutation(api.ai.createWorkflowRun, {
      studentId: args.studentId,
      workflowType: "clarification",
      provider: "backboard-or-fallback"
    });
    const result = await askBackboardForClarification(args);
    const error = "error" in result ? result.error : undefined;
    await ctx.runMutation(api.ai.completeWorkflowRun, {
      runId: runId ?? undefined,
      status: error ? "fallback" : "complete",
      provider: result.provider,
      model: result.model,
      stepName: "clarification_response",
      error
    });
    return result;
  }
});

export const extractObservation = action({
  args: {
    studentId: v.optional(v.id("students")),
    fullTranscript: v.string()
  },
  handler: async (ctx, args) => {
    const runId = await ctx.runMutation(api.ai.createWorkflowRun, {
      studentId: args.studentId,
      workflowType: "extraction",
      provider: "backboard-or-fallback"
    });
    const result = await askBackboardForExtraction(args);
    const error = "error" in result ? result.error : undefined;
    await ctx.runMutation(api.ai.completeWorkflowRun, {
      runId: runId ?? undefined,
      status: error ? "fallback" : "complete",
      provider: result.provider,
      model: result.model,
      stepName: "extraction_response",
      error
    });
    return result;
  }
});
