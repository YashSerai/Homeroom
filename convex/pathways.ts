import { query } from "./_generated/server";
import { v } from "convex/values";

export const byStudent = query({
  args: { studentId: v.id("students") },
  handler: async (ctx, args) =>
    ctx.db.query("pathwaySuggestions").withIndex("by_student", (q) => q.eq("studentId", args.studentId)).collect()
});

