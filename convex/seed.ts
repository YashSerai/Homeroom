import { mutation } from "./_generated/server";

const now = new Date("2026-05-10T12:00:00-07:00").getTime();
const day = 24 * 60 * 60 * 1000;

const teachers = [
  ["t8-math", "Nora Patel", "Math", 8],
  ["t8-eng", "Luis Romero", "English", 8],
  ["t9-math", "Ari Feldman", "Math", 9],
  ["t9-eng", "Janet Okafor", "English", 9],
  ["t9-hist", "Mina Alvarez", "History", 9],
  ["t10-sci", "Priya Shah", "Biology", 10],
  ["t10-art", "Elliot Kim", "Design", 10],
  ["t11-eng", "Grace Miller", "AP English", 11],
  ["t11-civ", "Marcus Reed", "Civics", 11]
] as const;

const rawNotes = [
  ["rn-1", "t8-math", 8, "Math", "Full-class discussion", "Maya is quiet in math and rarely raises her hand.", true],
  ["rn-2", "t8-eng", 8, "English", "Written work", "Her reading journal connected character choices to family expectations with careful quotes.", false],
  ["rn-3", "t8-math", 8, "Math", "Written work", "On the geometry reflection, Maya explained her diagram choices clearly and revised after feedback.", false],
  ["rn-4", "t8-eng", 8, "English", "Small-group", "During literature circles, Maya prepared notes and helped the group return to the text.", false],
  ["rn-5", "t9-math", 9, "Math", "Full-class discussion", "Maya is too quiet in algebra; I cannot tell if she understands unless I call on her.", true],
  ["rn-6", "t9-math", 9, "Math", "Quiz correction", "After written error analysis, Maya identified where she mixed up slope and rate of change.", false],
  ["rn-7", "t9-eng", 9, "English", "Small-group", "In peer workshop, Maya named the argument gap in another student's essay and suggested a stronger source.", false],
  ["rn-8", "t9-hist", 9, "History", "Project", "For the civil rights museum project, Maya coordinated source cards and kept the timeline moving.", false],
  ["rn-9", "t9-eng", 9, "English", "Presentation", "With a prepared speaking role, Maya delivered the opening claim and fielded one source question.", false],
  ["rn-10", "t10-sci", 10, "Biology", "Lab", "Maya sketched the osmosis setup before collecting data, which helped her lab group catch a missing control.", false],
  ["rn-11", "t10-sci", 10, "Biology", "Full-class discussion", "When asked without preparation, Maya passed, then submitted a precise written exit ticket.", false],
  ["rn-12", "t10-art", 10, "Design", "Project", "Her yearbook spread used photo sequencing to show cause and effect across the event.", false],
  ["rn-13", "t10-art", 10, "Design", "Critique", "In critique, Maya referenced layout principles and asked the editor to explain the audience goal.", false],
  ["rn-14", "t10-sci", 10, "Biology", "Small-group", "With a data-checker role, Maya spoke up twice to ask the group to compare measurements.", false],
  ["rn-15", "t11-eng", 11, "AP English", "Written work", "Maya's essay on Just Mercy layered legal evidence with a personal ethics frame.", false],
  ["rn-16", "t11-civ", 11, "Civics", "Debate prep", "Before the policy debate, Maya built a cross-examination question bank and rehearsed transitions.", false],
  ["rn-17", "t11-civ", 11, "Civics", "Presentation", "In the prepared debate, Maya made a concise rebuttal using the opponent's source language.", false],
  ["rn-18", "t11-eng", 11, "AP English", "Small-group", "Maya helped her seminar group distinguish theme from author's claim and invited a peer to test a counterexample.", false],
  ["rn-19", "t11-civ", 11, "Civics", "Full-class discussion", "During a cold-call opening, Maya gave a short answer and later added a stronger point in the written reflection.", false],
  ["rn-20", "t11-eng", 11, "AP English", "Conference", "In a 1:1 conference, Maya said writing first helps her organize what she wants to say.", false],
  ["rn-21", "t11-civ", 11, "Civics", "Project", "Maya's Model UN brief connected housing policy to migration data and included source caveats.", false],
  ["rn-22", "t11-eng", 11, "AP English", "Written work", "Her op-ed draft used a vivid lead from urban photography and revised the claim after peer questions.", false]
] as const;

const observationDefs = [
  ["o1", "rn-1", "t8-math", 8, "Math", "Full-class discussion", "Maya spoke less often during Grade 8 math full-class discussions.", "The note does not include what she understood or how she participated in writing.", "spontaneousPart", "stale", "low", "teacher", "rarely raises her hand"],
  ["o2", "rn-2", "t8-eng", 8, "English", "Written work", "Maya connected character choices to family expectations using textual evidence.", "Grade 8 reading journal.", "writtenExpression", "historical", "high", "handoff", "connected character choices to family expectations"],
  ["o3", "rn-4", "t8-eng", 8, "English", "Small-group", "Maya prepared notes before literature circles and helped peers return to the text.", "Small-group literature discussion.", "smallGroupCollab", "historical", "medium", "handoff", "prepared notes and helped the group return to the text"],
  ["o4", "rn-5", "t9-math", 9, "Math", "Full-class discussion", "In Grade 9 algebra, Maya's understanding was less visible during full-class discussion unless directly prompted.", "This is a low-confidence note because it relies on participation visibility.", "spontaneousPart", "contradicted", "low", "teacher", "I cannot tell if she understands unless I call on her"],
  ["o5", "rn-7", "t9-eng", 9, "English", "Small-group", "Maya identified a gap in a peer's argument and suggested stronger source support.", "Peer workshop.", "smallGroupCollab", "revalidated", "high", "handoff", "named the argument gap"],
  ["o6", "rn-8", "t9-hist", 9, "History", "Project", "Maya coordinated source cards and helped keep a group history timeline moving.", "Civil rights museum project.", "projectExecution", "revalidated", "high", "handoff", "coordinated source cards"],
  ["o7", "rn-9", "t9-eng", 9, "English", "Presentation", "With a prepared speaking role, Maya delivered an opening claim and answered a source question.", "Prepared presentation role.", "preparedSpeaking", "revalidated", "medium", "handoff", "delivered the opening claim"],
  ["o8", "rn-10", "t10-sci", 10, "Biology", "Lab", "Maya used a sketch to reason through a lab setup and helped the group catch a missing control.", "Biology osmosis lab.", "visualReasoning", "current", "high", "handoff", "sketched the osmosis setup"],
  ["o9", "rn-11", "t10-sci", 10, "Biology", "Full-class discussion", "When asked without preparation, Maya passed, then gave a precise written exit-ticket response.", "The contrast suggests setting matters for how her thinking appears.", "spontaneousPart", "contradicted", "medium", "teacher", "passed, then submitted a precise written exit ticket"],
  ["o10", "rn-12", "t10-art", 10, "Design", "Project", "Maya sequenced photos to show cause and effect in a yearbook layout.", "Yearbook design spread.", "visualReasoning", "current", "high", "handoff", "photo sequencing to show cause and effect"],
  ["o11", "rn-14", "t10-sci", 10, "Biology", "Small-group", "With a data-checker role, Maya spoke up to ask the group to compare measurements.", "Role-based lab collaboration.", "smallGroupCollab", "revalidated", "high", "handoff", "spoke up twice"],
  ["o12", "rn-15", "t11-eng", 11, "AP English", "Written work", "Maya layered legal evidence with a personal ethics frame in literary analysis.", "AP English essay on Just Mercy.", "writtenExpression", "current", "high", "handoff", "layered legal evidence"],
  ["o13", "rn-16", "t11-civ", 11, "Civics", "Debate prep", "Maya built a cross-examination question bank and rehearsed transitions before debate.", "Civics policy debate preparation.", "projectExecution", "current", "high", "handoff", "built a cross-examination question bank"],
  ["o14", "rn-17", "t11-civ", 11, "Civics", "Presentation", "In a prepared debate, Maya made a concise rebuttal using the opponent's source language.", "Prepared advocacy setting.", "preparedSpeaking", "current", "high", "handoff", "concise rebuttal"],
  ["o15", "rn-18", "t11-eng", 11, "AP English", "Small-group", "Maya helped a seminar group distinguish theme from author's claim and invited a counterexample.", "Small-group seminar.", "smallGroupCollab", "current", "high", "handoff", "invited a peer to test a counterexample"],
  ["o16", "rn-19", "t11-civ", 11, "Civics", "Full-class discussion", "During a cold-call opener, Maya gave a short answer and later developed the point in writing.", "Current evidence revalidates write-before-speak support.", "spontaneousPart", "current", "medium", "handoff", "later added a stronger point in the written reflection"],
  ["o17", "rn-20", "t11-eng", 11, "AP English", "1:1", "Maya reported that writing first helps her organize what she wants to say.", "Student-reported learning strategy from conference.", "preparedSpeaking", "current", "medium", "handoff", "writing first helps her organize"],
  ["o18", "rn-21", "t11-civ", 11, "Civics", "Project", "Maya connected housing policy to migration data and included source caveats.", "Model UN brief.", "projectExecution", "current", "high", "handoff", "connected housing policy to migration data"]
] as const;

export const seedMaya = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("students").withIndex("by_name", (q) => q.eq("name", "Maya Chen")).first();
    if (existing) {
      await ensureAnalytics(ctx, existing._id, {});
      return { ok: true, skipped: true, studentId: existing._id };
    }

    const studentId = await ctx.db.insert("students", {
      name: "Maya Chen",
      currentGrade: 11,
      currentYear: "Grade 11 complete · entering Grade 12",
      personalityType: "Reflective visual communicator",
      personalityBlurb: "Maya tends to process before speaking and communicates best when she can prepare, draw, diagram, or structure her ideas visually.",
      interests: ["architecture", "woodwork", "urban photography", "graphic novels", "community spaces"],
      extracurriculars: ["Woodwork workshop", "Design boot camp", "Club volleyball", "Yearbook design"],
      recentBooks: ["The Architecture of Happiness by Alain de Botton", "Just Mercy by Bryan Stevenson", "Pachinko by Min Jin Lee"]
    });

    const teacherIds: Record<string, any> = {};
    for (const [key, name, subject, grade] of teachers) {
      teacherIds[key] = await ctx.db.insert("teachers", { name, subject, grade });
    }

    const helenId = await ctx.db.insert("parents", { name: "Helen Chen", studentId, relationship: "mother" });
    await ctx.db.insert("parents", { name: "David Chen", studentId, relationship: "father" });

    for (const [grade, year, english, math, humanities, elective] of [
      [8, "2022-2023", "A-", "B+", "A-", "A"],
      [9, "2023-2024", "A", "B", "A-", "A-"],
      [10, "2024-2025", "A-", "B+", "A", "A"],
      [11, "2025-2026", "A", "B+", "A", "A"]
    ] as const) {
      await ctx.db.insert("grades", { studentId, grade, year, subject: "English", score: english });
      await ctx.db.insert("grades", { studentId, grade, year, subject: "Math", score: math });
      await ctx.db.insert("grades", { studentId, grade, year, subject: "Humanities", score: humanities });
      await ctx.db.insert("grades", { studentId, grade, year, subject: "Elective", score: elective });
    }

    const noteIds: Record<string, any> = {};
    for (const [key, teacherKey, grade, subject, setting, rawText, containsBannedLabel] of rawNotes) {
      noteIds[key] = await ctx.db.insert("rawNotes", {
        studentId,
        teacherId: teacherIds[teacherKey],
        grade,
        subject,
        setting,
        rawText,
        processed: true,
        createdAt: now - Number(key.replace(/\D/g, "")) * day,
        containsBannedLabel,
        labelWarning: containsBannedLabel ? "label-only · low confidence" : undefined
      });
    }
    await ctx.db.insert("rawNotes", {
      studentId,
      parentId: helenId,
      grade: 11,
      subject: "Home",
      setting: "Parent note",
      rawText: "Maya talks a lot at home after she has had time to think, especially about books, cities, and fairness.",
      processed: true,
      createdAt: now - 11 * day
    });

    const observationIds: Record<string, any> = {};
    for (const [key, noteKey, teacherKey, grade, subject, setting, observedBehavior, context, dimension, signal, confidence, visibility, evidenceQuote] of observationDefs) {
      observationIds[key] = await ctx.db.insert("observations", {
        studentId,
        sourceNoteId: noteIds[noteKey],
        teacherId: teacherIds[teacherKey],
        grade,
        subject,
        setting,
        observedBehavior,
        context,
        dimension,
        signal,
        confidence,
        visibility,
        evidenceQuote,
        humanApproved: true,
        needsRevalidation: confidence === "low",
        createdAt: now - Number(key.replace(/\D/g, "")) * day,
        lastValidated: now - Number(key.replace(/\D/g, "")) * day
      });
    }

    for (const [grade, writtenExpression, preparedSpeaking, smallGroupCollab, projectExecution, visualReasoning, spontaneousPart] of [
      [8, 72, 54, 64, 58, 68, 38],
      [9, 78, 67, 82, 80, 70, 36],
      [10, 82, 72, 78, 84, 88, 44],
      [11, 91, 86, 88, 90, 86, 50]
    ] as const) {
      await ctx.db.insert("growthMapDimensions", { studentId, grade, writtenExpression, preparedSpeaking, smallGroupCollab, projectExecution, visualReasoning, spontaneousPart });
    }
    await ensureAnalytics(ctx, studentId, observationIds);

    await ctx.db.insert("patterns", {
      studentId,
      pattern: "Participation is context-dependent.",
      description: "Maya's thinking is less visible during cold full-class openings, but becomes much more visible in writing, prepared roles, and small-group evidence work.",
      evidenceObservationIds: ["o4", "o5", "o7", "o9", "o14", "o16", "o17"].map((id) => observationIds[id]),
      suggestedSupport: "Try prepared discussion roles, write-before-speak prompts, recurring opener slots, and avoid cold-calling without warm-up.",
      confidence: "high",
      isContradiction: true,
      firstDetected: now - 160 * day,
      lastValidated: now - 5 * day
    });

    for (const [summary, evidence, dimension] of [
      ["Maya builds layered written arguments using evidence, ethics, and source caveats.", ["o12", "o18", "o2"], "writtenExpression"],
      ["Prepared speaking roles help Maya make her thinking visible in class.", ["o7", "o14", "o17"], "preparedSpeaking"],
      ["In small groups, Maya often uses evidence questions to move work forward.", ["o5", "o11", "o15"], "smallGroupCollab"]
    ] as const) {
      await ctx.db.insert("insights", {
        studentId,
        summary,
        evidenceObservationIds: evidence.map((id) => observationIds[id]),
        dimension,
        confidence: "high",
        visibility: "handoff",
        humanApproved: true,
        needsRevalidation: false,
        createdAt: now - 2 * day,
        lastValidated: now - 2 * day
      });
    }

    for (const [area, rationale, evidenceObservationIds, explorationSteps, icon] of [
      ["Architecture / Spatial Design", "Maya may enjoy exploring architecture or spatial design because multiple observations show visual reasoning, diagram-based explanation, prepared presentation, and sustained interest in built environments.", ["o8", "o10", "o13", "o14"], ["Build a small portfolio with 2-3 design sketches or models.", "Enter a youth architecture or community-space design challenge.", "Interview an architect, urban planner, or design student.", "Try a summer workshop in architecture, design, or urban planning."], "Building2"],
      ["Design Communication", "Maya may enjoy exploring design communication because teachers have seen her use sequence, layout, and visual evidence to explain cause and effect.", ["o8", "o10", "o12"], ["Create one visual explainer for a class concept.", "Ask the design teacher for feedback on layout and audience clarity.", "Collect two examples of public-interest design that explain complex ideas."], "PenTool"],
      ["Urban Planning / Community Spaces", "Maya may enjoy exploring community-space work because her Model UN brief connected housing policy, migration data, and source caveats.", ["o18", "o13", "o16"], ["Map one neighborhood space and note who it serves.", "Compare two city housing or transit choices.", "Find a local planning meeting or youth civic design workshop."], "Map"],
      ["Prepared Advocacy / Public Speaking", "Maya may enjoy exploring prepared advocacy because rehearsed roles, question banks, and source-based rebuttals help her communicate clearly.", ["o7", "o13", "o14"], ["Visit one debate or mock council practice.", "Draft a short prepared statement with a visual aid.", "Practice one planned response before a class discussion."], "Mic2"],
      ["Visual Education / Teaching Through Design", "Maya may enjoy exploring visual education because she often helps peers understand ideas by organizing evidence, diagrams, and examples.", ["o5", "o8", "o15"], ["Make a diagram-based study guide for one unit.", "Try explaining a concept with a sketch before words.", "Ask a teacher where visual explanation could support classmates."], "BookOpen"]
    ] as const) {
      await ctx.db.insert("pathwaySuggestions", { studentId, grade: 11, area, rationale, evidenceObservationIds: evidenceObservationIds.map((id) => observationIds[id]), explorationSteps: [...explorationSteps], icon });
    }

    for (const prompt of [
      "What kind of writing or speaking feels worth preparing for right now?",
      "When a project feels open-ended, what helps you decide the first step?",
      "Which book, article, or image has been staying with you lately?"
    ]) {
      await ctx.db.insert("conversationPrompts", { studentId, prompt, derivedFrom: [] });
    }

    await ctx.db.insert("handoffState", { studentId, teacherId: teacherIds["t11-civ"], firstObservationLogged: false });
    return { ok: true, skipped: false, studentId };
  }
});

async function ensureAnalytics(ctx: any, studentId: any, observationIds: Record<string, any>) {
  const existingObservations = await ctx.db.query("observations").withIndex("by_student", (q: any) => q.eq("studentId", studentId)).collect();
  const fallbackEvidence = (grade: number, subject: string) =>
    existingObservations
      .filter((observation: any) => observation.grade === grade && (!subject || observation.subject === subject || subject.includes(observation.subject)))
      .slice(0, 2)
      .map((observation: any) => observation._id);
  const existingPerformance = await ctx.db.query("subjectPerformance").withIndex("by_student", (q: any) => q.eq("studentId", studentId)).first();
  if (!existingPerformance) {
    for (const [grade, year, subject, score, numericAverage, gpaPoints] of [
      [8, "2022-2023", "Math", "B+", 87, 3.3],
      [8, "2022-2023", "English", "B-", 80, 2.7],
      [8, "2022-2023", "Science", "A", 94, 4.0],
      [8, "2022-2023", "Social Studies", "C+", 77, 2.3],
      [8, "2022-2023", "Art / Design", "A-", 90, 3.7],
      [8, "2022-2023", "Physical Education", "C", 74, 2.0],
      [9, "2023-2024", "Math", "A", 94, 4.0],
      [9, "2023-2024", "English", "B", 84, 3.0],
      [9, "2023-2024", "Science", "B+", 87, 3.3],
      [9, "2023-2024", "Social Studies", "B+", 87, 3.3],
      [9, "2023-2024", "Art / Design", "B+", 87, 3.3],
      [9, "2023-2024", "Physical Education", "C", 74, 2.0],
      [10, "2024-2025", "Math", "B-", 80, 2.7],
      [10, "2024-2025", "English", "C", 74, 2.0],
      [10, "2024-2025", "Science", "B", 84, 3.0],
      [10, "2024-2025", "Social Studies", "A", 94, 4.0],
      [10, "2024-2025", "Art / Design", "B+", 87, 3.3],
      [10, "2024-2025", "Physical Education", "A", 94, 4.0],
      [11, "2025-2026", "Math", "A", 94, 4.0],
      [11, "2025-2026", "English", "A", 94, 4.0],
      [11, "2025-2026", "Science", "B+", 87, 3.3],
      [11, "2025-2026", "Social Studies", "A", 94, 4.0],
      [11, "2025-2026", "Art / Design", "A", 94, 4.0],
      [11, "2025-2026", "Physical Education", "B+", 87, 3.3]
    ] as const) {
      await ctx.db.insert("subjectPerformance", { studentId, grade, year, subject, score, numericAverage, gpaPoints });
    }
  }

  const existingCompetency = await ctx.db.query("curriculumCompetencies").withIndex("by_student", (q: any) => q.eq("studentId", studentId)).first();
  if (!existingCompetency) {
    for (const [grade, subject, competency, score, evidence] of [
      [11, "AP English", "Evidence selection", 94, ["o12", "o15"]],
      [11, "AP English", "Claim revision", 90, ["o15"]],
      [11, "Civics", "Prepared advocacy", 92, ["o13", "o14"]],
      [11, "Civics", "Source caveats", 91, ["o18"]],
      [10, "Science", "Visual modeling", 88, ["o8"]],
      [10, "Science", "Collaborative data checks", 84, ["o11"]],
      [9, "History", "Project coordination", 86, ["o6"]],
      [9, "English", "Peer argument feedback", 88, ["o5"]],
      [8, "English", "Text-grounded reflection", 82, ["o2"]],
      [8, "Math", "Written reasoning", 74, ["o3"]]
    ] as const) {
      await ctx.db.insert("curriculumCompetencies", {
        studentId,
        grade,
        subject,
        competency,
        score,
        evidenceObservationIds: evidence.map((id) => observationIds[id]).filter(Boolean)
      });
    }
  } else {
    const competencies = await ctx.db.query("curriculumCompetencies").withIndex("by_student", (q: any) => q.eq("studentId", studentId)).collect();
    for (const competency of competencies) {
      if (competency.evidenceObservationIds.length === 0) {
        await ctx.db.patch(competency._id, {
          evidenceObservationIds: fallbackEvidence(competency.grade, competency.subject)
        });
      }
    }
  }

  const existingSnapshot = await ctx.db.query("personalitySnapshots").withIndex("by_student", (q: any) => q.eq("studentId", studentId)).first();
  if (!existingSnapshot) {
    for (const [grade, openness, conscientiousness, extraversion, agreeableness, emotionalRange] of [
      [8, 78, 70, 42, 76, 54],
      [9, 82, 73, 45, 80, 52],
      [10, 86, 76, 50, 82, 50],
      [11, 91, 81, 56, 86, 48]
    ] as const) {
      await ctx.db.insert("personalitySnapshots", {
        studentId,
        grade,
        openness,
        conscientiousness,
        extraversion,
        agreeableness,
        emotionalRange,
        source: "Completed student-owned learner reflection",
        completedAt: now - (12 - grade) * 85 * day
      });
    }
  }
}
