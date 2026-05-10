import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query("students").collect()
});

export const demoData = query({
  args: { studentName: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const student = await ctx.db
      .query("students")
      .withIndex("by_name", (q) => q.eq("name", args.studentName ?? "Maya Chen"))
      .first();
    if (!student) return null;
    const [
      teachers,
      parents,
      grades,
      rawNotes,
      observations,
      insights,
      patterns,
      growthMaps,
      subjectPerformance,
      curriculumCompetencies,
      personalitySnapshots,
      pathways,
      conversationPrompts,
      auditEvents
    ] =
      await Promise.all([
        ctx.db.query("teachers").collect(),
        ctx.db.query("parents").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("grades").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("rawNotes").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("observations").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("insights").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("patterns").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("growthMapDimensions").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("subjectPerformance").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("curriculumCompetencies").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("personalitySnapshots").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("pathwaySuggestions").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("conversationPrompts").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect(),
        ctx.db.query("auditEvents").withIndex("by_student", (q) => q.eq("studentId", student._id)).collect()
      ]);
    const handoffState = await ctx.db.query("handoffState").filter((q) => q.eq(q.field("studentId"), student._id)).first();
    return {
      student,
      teachers,
      parents,
      grades,
      rawNotes,
      observations,
      insights,
      patterns,
      growthMaps,
      subjectPerformance,
      curriculumCompetencies,
      personalitySnapshots,
      pathways,
      conversationPrompts,
      handoffState,
      auditEvents
    };
  }
});

export const updateInterests = mutation({
  args: { studentId: v.id("students"), interests: v.array(v.string()) },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.studentId, { interests: args.interests });
    return { ok: true };
  }
});
