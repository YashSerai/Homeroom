import {
  type CurriculumCompetency,
  type DemoState,
  type GrowthMap,
  type Observation,
  type PathwaySuggestion,
  type PersonalitySnapshot,
  type RawNote,
  type SubjectPerformance
} from "@/lib/types";

const now = new Date("2026-05-10T12:00:00-07:00").getTime();
const day = 24 * 60 * 60 * 1000;

export const dimensionLabels: Record<string, string> = {
  writtenExpression: "Written expression",
  preparedSpeaking: "Prepared speaking",
  smallGroupCollab: "Small-group collaboration",
  projectExecution: "Project execution",
  visualReasoning: "Visual reasoning",
  spontaneousPart: "Spontaneous participation"
};

export const signalCopy: Record<string, string> = {
  current: "current",
  historical: "historical",
  stale: "stale",
  contradicted: "contradicted",
  revalidated: "revalidated"
};

const teachers = [
  { id: "t8-math", name: "Nora Patel", subject: "Math", grade: 8 },
  { id: "t8-eng", name: "Luis Romero", subject: "English", grade: 8 },
  { id: "t9-math", name: "Ari Feldman", subject: "Math", grade: 9 },
  { id: "t9-eng", name: "Janet Okafor", subject: "English", grade: 9 },
  { id: "t9-hist", name: "Mina Alvarez", subject: "History", grade: 9 },
  { id: "t10-sci", name: "Priya Shah", subject: "Biology", grade: 10 },
  { id: "t10-art", name: "Elliot Kim", subject: "Design", grade: 10 },
  { id: "t11-eng", name: "Grace Miller", subject: "AP English", grade: 11 },
  { id: "t11-civ", name: "Marcus Reed", subject: "Civics", grade: 11 }
];

export const rawNotes: RawNote[] = [
  note("rn-1", "t8-math", 8, "Math", "Full-class discussion", "Maya is quiet in math and rarely raises her hand.", true),
  note("rn-2", "t8-eng", 8, "English", "Written work", "Her reading journal connected character choices to family expectations with careful quotes.", false),
  note("rn-3", "t8-math", 8, "Math", "Written work", "On the geometry reflection, Maya explained her diagram choices clearly and revised after feedback.", false),
  note("rn-4", "t8-eng", 8, "English", "Small-group", "During literature circles, Maya prepared notes and helped the group return to the text.", false),
  note("rn-5", "t9-math", 9, "Math", "Full-class discussion", "Maya is too quiet in algebra; I cannot tell if she understands unless I call on her.", true),
  note("rn-6", "t9-math", 9, "Math", "Quiz correction", "After written error analysis, Maya identified where she mixed up slope and rate of change.", false),
  note("rn-7", "t9-eng", 9, "English", "Small-group", "In peer workshop, Maya named the argument gap in another student's essay and suggested a stronger source.", false),
  note("rn-8", "t9-hist", 9, "History", "Project", "For the civil rights museum project, Maya coordinated source cards and kept the timeline moving.", false),
  note("rn-9", "t9-eng", 9, "English", "Presentation", "With a prepared speaking role, Maya delivered the opening claim and fielded one source question.", false),
  note("rn-10", "t10-sci", 10, "Biology", "Lab", "Maya sketched the osmosis setup before collecting data, which helped her lab group catch a missing control.", false),
  note("rn-11", "t10-sci", 10, "Biology", "Full-class discussion", "When asked without preparation, Maya passed, then submitted a precise written exit ticket.", false),
  note("rn-12", "t10-art", 10, "Design", "Project", "Her yearbook spread used photo sequencing to show cause and effect across the event.", false),
  note("rn-13", "t10-art", 10, "Design", "Critique", "In critique, Maya referenced layout principles and asked the editor to explain the audience goal.", false),
  note("rn-14", "t10-sci", 10, "Biology", "Small-group", "With a data-checker role, Maya spoke up twice to ask the group to compare measurements.", false),
  note("rn-15", "t11-eng", 11, "AP English", "Written work", "Maya's essay on Just Mercy layered legal evidence with a personal ethics frame.", false),
  note("rn-16", "t11-civ", 11, "Civics", "Debate prep", "Before the policy debate, Maya built a cross-examination question bank and rehearsed transitions.", false),
  note("rn-17", "t11-civ", 11, "Civics", "Presentation", "In the prepared debate, Maya made a concise rebuttal using the opponent's source language.", false),
  note("rn-18", "t11-eng", 11, "AP English", "Small-group", "Maya helped her seminar group distinguish theme from author's claim and invited a peer to test a counterexample.", false),
  note("rn-19", "t11-civ", 11, "Civics", "Full-class discussion", "During a cold-call opening, Maya gave a short answer and later added a stronger point in the written reflection.", false),
  note("rn-20", "t11-eng", 11, "AP English", "Conference", "In a 1:1 conference, Maya said writing first helps her organize what she wants to say.", false),
  note("rn-21", "t11-civ", 11, "Civics", "Project", "Maya's Model UN brief connected housing policy to migration data and included source caveats.", false),
  note("rn-22", "t11-eng", 11, "AP English", "Written work", "Her op-ed draft used a vivid lead from urban photography and revised the claim after peer questions.", false),
  {
    id: "rn-p1",
    studentId: "maya",
    parentId: "p-helen",
    grade: 11,
    subject: "Home",
    setting: "Parent note",
    rawText: "Maya talks a lot at home after she has had time to think, especially about books, cities, and fairness.",
    processed: true,
    createdAt: now - 11 * day
  },
  {
    id: "rn-p2",
    studentId: "maya",
    parentId: "p-david",
    grade: 11,
    subject: "Home",
    setting: "Parent note",
    rawText: "When projects feel vague, Maya does better if she can make a checklist and see one strong example.",
    processed: true,
    createdAt: now - 7 * day
  }
];

function note(
  id: string,
  teacherId: string,
  grade: number,
  subject: string,
  setting: string,
  rawText: string,
  containsBannedLabel: boolean
): RawNote {
  return {
    id,
    studentId: "maya",
    teacherId,
    grade,
    subject,
    setting,
    rawText,
    processed: true,
    containsBannedLabel,
    labelWarning: containsBannedLabel ? "label-only · low confidence" : undefined,
    createdAt: now - (40 - grade) * day - Number(id.replace(/\D/g, "")) * day
  };
}

export const observations: Observation[] = [
  obs("o1", "rn-1", "t8-math", 8, "Math", "Full-class discussion", "Maya spoke less often during Grade 8 math full-class discussions.", "The note does not include what she understood or how she participated in writing.", "spontaneousPart", "stale", "low", "teacher", "rarely raises her hand"),
  obs("o2", "rn-2", "t8-eng", "8" as unknown as number, "English", "Written work", "Maya connected character choices to family expectations using textual evidence.", "Grade 8 reading journal.", "writtenExpression", "historical", "high", "handoff", "connected character choices to family expectations"),
  obs("o3", "rn-4", "t8-eng", 8, "English", "Small-group", "Maya prepared notes before literature circles and helped peers return to the text.", "Small-group literature discussion.", "smallGroupCollab", "historical", "medium", "handoff", "prepared notes and helped the group return to the text"),
  obs("o4", "rn-5", "t9-math", 9, "Math", "Full-class discussion", "In Grade 9 algebra, Maya's understanding was less visible during full-class discussion unless directly prompted.", "This is a low-confidence note because it relies on participation visibility.", "spontaneousPart", "contradicted", "low", "teacher", "I cannot tell if she understands unless I call on her"),
  obs("o5", "rn-7", "t9-eng", 9, "English", "Small-group", "Maya identified a gap in a peer's argument and suggested stronger source support.", "Peer workshop.", "smallGroupCollab", "revalidated", "high", "handoff", "named the argument gap"),
  obs("o6", "rn-8", "t9-hist", 9, "History", "Project", "Maya coordinated source cards and helped keep a group history timeline moving.", "Civil rights museum project.", "projectExecution", "revalidated", "high", "handoff", "coordinated source cards"),
  obs("o7", "rn-9", "t9-eng", 9, "English", "Presentation", "With a prepared speaking role, Maya delivered an opening claim and answered a source question.", "Prepared presentation role.", "preparedSpeaking", "revalidated", "medium", "handoff", "delivered the opening claim"),
  obs("o8", "rn-10", "t10-sci", 10, "Biology", "Lab", "Maya used a sketch to reason through a lab setup and helped the group catch a missing control.", "Biology osmosis lab.", "visualReasoning", "current", "high", "handoff", "sketched the osmosis setup"),
  obs("o9", "rn-11", "t10-sci", 10, "Biology", "Full-class discussion", "When asked without preparation, Maya passed, then gave a precise written exit-ticket response.", "The contrast suggests setting matters for how her thinking appears.", "spontaneousPart", "contradicted", "medium", "teacher", "passed, then submitted a precise written exit ticket"),
  obs("o10", "rn-12", "t10-art", 10, "Design", "Project", "Maya sequenced photos to show cause and effect in a yearbook layout.", "Yearbook design spread.", "visualReasoning", "current", "high", "handoff", "photo sequencing to show cause and effect"),
  obs("o11", "rn-14", "t10-sci", 10, "Biology", "Small-group", "With a data-checker role, Maya spoke up to ask the group to compare measurements.", "Role-based lab collaboration.", "smallGroupCollab", "revalidated", "high", "handoff", "spoke up twice"),
  obs("o12", "rn-15", "t11-eng", 11, "AP English", "Written work", "Maya layered legal evidence with a personal ethics frame in literary analysis.", "AP English essay on Just Mercy.", "writtenExpression", "current", "high", "handoff", "layered legal evidence"),
  obs("o13", "rn-16", "t11-civ", 11, "Civics", "Debate prep", "Maya built a cross-examination question bank and rehearsed transitions before debate.", "Civics policy debate preparation.", "projectExecution", "current", "high", "handoff", "built a cross-examination question bank"),
  obs("o14", "rn-17", "t11-civ", 11, "Civics", "Presentation", "In a prepared debate, Maya made a concise rebuttal using the opponent's source language.", "Prepared advocacy setting.", "preparedSpeaking", "current", "high", "handoff", "concise rebuttal"),
  obs("o15", "rn-18", "t11-eng", 11, "AP English", "Small-group", "Maya helped a seminar group distinguish theme from author's claim and invited a counterexample.", "Small-group seminar.", "smallGroupCollab", "current", "high", "handoff", "invited a peer to test a counterexample"),
  obs("o16", "rn-19", "t11-civ", 11, "Civics", "Full-class discussion", "During a cold-call opener, Maya gave a short answer and later developed the point in writing.", "Current evidence revalidates write-before-speak support.", "spontaneousPart", "current", "medium", "handoff", "later added a stronger point in the written reflection"),
  obs("o17", "rn-20", "t11-eng", 11, "AP English", "1:1", "Maya reported that writing first helps her organize what she wants to say.", "Student-reported learning strategy from conference.", "preparedSpeaking", "current", "medium", "handoff", "writing first helps her organize"),
  obs("o18", "rn-21", "t11-civ", 11, "Civics", "Project", "Maya connected housing policy to migration data and included source caveats.", "Model UN brief.", "projectExecution", "current", "high", "handoff", "connected housing policy to migration data")
];

function obs(
  id: string,
  sourceNoteId: string,
  teacherId: string,
  grade: number,
  subject: string,
  setting: string,
  observedBehavior: string,
  context: string,
  dimension: Observation["dimension"],
  signal: Observation["signal"],
  confidence: Observation["confidence"],
  visibility: Observation["visibility"],
  evidenceQuote: string
): Observation {
  return {
    id,
    studentId: "maya",
    sourceNoteId,
    teacherId,
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
    createdAt: now - Number(id.replace(/\D/g, "")) * day,
    lastValidated: now - Number(id.replace(/\D/g, "")) * day
  };
}

export const growthMaps: GrowthMap[] = [
  growth(8, 72, 54, 64, 58, 68, 38),
  growth(9, 78, 67, 82, 80, 70, 36),
  growth(10, 82, 72, 78, 84, 88, 44),
  growth(11, 91, 86, 88, 90, 86, 50)
];

function growth(
  grade: number,
  writtenExpression: number,
  preparedSpeaking: number,
  smallGroupCollab: number,
  projectExecution: number,
  visualReasoning: number,
  spontaneousPart: number
): GrowthMap {
  return { studentId: "maya", grade, writtenExpression, preparedSpeaking, smallGroupCollab, projectExecution, visualReasoning, spontaneousPart };
}

export const subjectPerformance: SubjectPerformance[] = [
  perf("sp-8-eng", 8, "2022-2023", "English", "A-", 91, 3.7),
  perf("sp-8-math", 8, "2022-2023", "Math", "B+", 88, 3.3),
  perf("sp-8-hum", 8, "2022-2023", "Humanities", "A-", 90, 3.7),
  perf("sp-8-des", 8, "2022-2023", "Design", "A", 94, 4.0),
  perf("sp-9-eng", 9, "2023-2024", "English", "A", 94, 4.0),
  perf("sp-9-math", 9, "2023-2024", "Math", "B", 84, 3.0),
  perf("sp-9-hum", 9, "2023-2024", "History", "A-", 91, 3.7),
  perf("sp-9-des", 9, "2023-2024", "Design", "A-", 90, 3.7),
  perf("sp-10-eng", 10, "2024-2025", "English", "A-", 92, 3.7),
  perf("sp-10-math", 10, "2024-2025", "Math", "B+", 87, 3.3),
  perf("sp-10-sci", 10, "2024-2025", "Science", "A", 94, 4.0),
  perf("sp-10-des", 10, "2024-2025", "Design", "A", 96, 4.0),
  perf("sp-11-eng", 11, "2025-2026", "AP English", "A", 95, 4.0),
  perf("sp-11-math", 11, "2025-2026", "Math", "B+", 88, 3.3),
  perf("sp-11-civ", 11, "2025-2026", "Civics", "A", 94, 4.0),
  perf("sp-11-des", 11, "2025-2026", "Design Lab", "A", 95, 4.0),
  perf("sp-12-pending", 12, "2026-2027", "Grade 12", "Pending", 0, 0)
];

function perf(id: string, grade: number, year: string, subject: string, score: string, numericAverage: number, gpaPoints: number): SubjectPerformance {
  return { id, studentId: "maya", grade, year, subject, score, numericAverage, gpaPoints };
}

export const curriculumCompetencies: CurriculumCompetency[] = [
  comp("cc-1", 11, "AP English", "Evidence selection", 94, ["o12", "o15"]),
  comp("cc-2", 11, "AP English", "Claim revision", 90, ["o15", "o22"]),
  comp("cc-3", 11, "Civics", "Prepared advocacy", 92, ["o13", "o14"]),
  comp("cc-4", 11, "Civics", "Source caveats", 91, ["o18"]),
  comp("cc-5", 10, "Science", "Visual modeling", 88, ["o8"]),
  comp("cc-6", 10, "Science", "Collaborative data checks", 84, ["o11"]),
  comp("cc-7", 9, "History", "Project coordination", 86, ["o6"]),
  comp("cc-8", 9, "English", "Peer argument feedback", 88, ["o5"]),
  comp("cc-9", 8, "English", "Text-grounded reflection", 82, ["o2"]),
  comp("cc-10", 8, "Math", "Written reasoning", 74, ["o3"])
];

function comp(id: string, grade: number, subject: string, competency: string, score: number, evidenceObservationIds: string[]): CurriculumCompetency {
  return { id, studentId: "maya", grade, subject, competency, score, evidenceObservationIds };
}

export const personalitySnapshots: PersonalitySnapshot[] = [
  snap("ps-8", 8, 78, 70, 42, 76, 54),
  snap("ps-9", 9, 82, 73, 45, 80, 52),
  snap("ps-10", 10, 86, 76, 50, 82, 50),
  snap("ps-11", 11, 91, 81, 56, 86, 48)
];

function snap(id: string, grade: number, openness: number, conscientiousness: number, extraversion: number, agreeableness: number, emotionalRange: number): PersonalitySnapshot {
  return {
    id,
    studentId: "maya",
    grade,
    openness,
    conscientiousness,
    extraversion,
    agreeableness,
    emotionalRange,
    source: "Completed student Big Five/IPIP-style learner reflection",
    completedAt: now - (12 - grade) * 85 * day
  };
}

export const pathways: PathwaySuggestion[] = [
  path("path-1", "Journalism / Opinion Writing", "Maya may enjoy exploring opinion writing because her recent essays and op-ed drafts combine evidence, ethics, and vivid opening details.", ["o12", "o15"], ["Submit one op-ed to the school newspaper.", "Interview a local organizer for a reported column.", "Build a source log for claims and counterclaims."], "Newspaper"),
  path("path-2", "Law / Mock Trial", "Maya may enjoy exploring law-related activities because prepared advocacy and source-based rebuttal have been strong settings for her.", ["o13", "o14"], ["Visit one mock trial practice.", "Draft cross-examination questions from a sample case.", "Ask a civics teacher for a courtroom role that uses prepared speaking."], "Scale"),
  path("path-3", "International Relations", "Maya may enjoy exploring international relations because Model UN work connects her interests in policy, migration data, and careful source caveats.", ["o18", "o13"], ["Lead one Model UN briefing memo.", "Compare two city housing policies across countries.", "Find a mentor conversation with a local policy researcher."], "Globe2"),
  path("path-4", "Literary Studies", "Maya may enjoy exploring literary studies because she builds layered arguments from texts and helps peers test claims with counterexamples.", ["o2", "o12", "o15"], ["Annotate one novel around justice and place.", "Facilitate a seminar opening question.", "Create a short reading list with one classic and one contemporary text."], "BookOpen")
];

function path(id: string, area: string, rationale: string, evidenceObservationIds: string[], explorationSteps: string[], icon: string): PathwaySuggestion {
  return { id, studentId: "maya", grade: 11, area, rationale, evidenceObservationIds, explorationSteps, icon };
}

export const initialDemoState: DemoState = {
  students: [
    {
      id: "maya",
      name: "Maya Chen",
      currentGrade: 11,
      currentYear: "2025-2026",
      personalityType: "Reflective meaning-maker",
      personalityBlurb:
        "Often processes through writing before speaking. Strong with layered arguments, prepared advocacy, and careful source analysis.",
      interests: ["debate prep", "graphic novels", "urban photography", "K-dramas", "architecture"],
      extracurriculars: ["School newspaper", "Model UN", "Yearbook design"],
      recentBooks: ["Pachinko by Min Jin Lee", "The Power by Naomi Alderman", "Just Mercy by Bryan Stevenson"],
      classes: ["AP English", "Civics", "Precalculus", "Design Lab"]
    }
  ],
  teachers,
  rawNotes,
  observations,
  insights: [
    {
      id: "i1",
      studentId: "maya",
      summary: "Maya builds layered written arguments using evidence, ethics, and source caveats.",
      evidenceObservationIds: ["o12", "o18", "o2"],
      dimension: "writtenExpression",
      confidence: "high",
      visibility: "handoff",
      humanApproved: true,
      needsRevalidation: false,
      createdAt: now - 2 * day,
      lastValidated: now - 2 * day
    },
    {
      id: "i2",
      studentId: "maya",
      summary: "Prepared speaking roles help Maya make her thinking visible in class.",
      evidenceObservationIds: ["o7", "o14", "o17"],
      dimension: "preparedSpeaking",
      confidence: "high",
      visibility: "handoff",
      humanApproved: true,
      needsRevalidation: false,
      createdAt: now - 2 * day,
      lastValidated: now - 2 * day
    },
    {
      id: "i3",
      studentId: "maya",
      summary: "In small groups, Maya often uses evidence questions to move work forward.",
      evidenceObservationIds: ["o5", "o11", "o15"],
      dimension: "smallGroupCollab",
      confidence: "high",
      visibility: "handoff",
      humanApproved: true,
      needsRevalidation: false,
      createdAt: now - 2 * day,
      lastValidated: now - 2 * day
    }
  ],
  patterns: [
    {
      id: "pat-1",
      studentId: "maya",
      pattern: "Participation is context-dependent.",
      description:
        "Maya's thinking is less visible during cold full-class openings, but becomes much more visible in writing, prepared roles, and small-group evidence work.",
      evidenceObservationIds: ["o4", "o5", "o7", "o9", "o14", "o16", "o17"],
      suggestedSupport:
        "Try prepared discussion roles, write-before-speak prompts, recurring opener slots, and avoid cold-calling without warm-up.",
      confidence: "high",
      isContradiction: true,
      firstDetected: now - 160 * day,
      lastValidated: now - 5 * day
    }
  ],
  growthMaps,
  subjectPerformance,
  curriculumCompetencies,
  personalitySnapshots,
  pathways,
  conversationPrompts: [
    {
      id: "cp1",
      studentId: "maya",
      prompt: "What kind of writing or speaking feels worth preparing for right now?",
      derivedFrom: ["o12", "o14"]
    },
    {
      id: "cp2",
      studentId: "maya",
      prompt: "When a project feels open-ended, what helps you decide the first step?",
      derivedFrom: ["rn-p2", "o13"]
    },
    {
      id: "cp3",
      studentId: "maya",
      prompt: "Which book, article, or image has been staying with you lately?",
      derivedFrom: ["rn-p1", "o22"]
    }
  ],
  handoffRevealed: false,
  auditEvents: []
};

export const handoffSummary = {
  strengths: [
    {
      title: "Evidence-rich written analysis",
      detail: "Builds layered claims using text evidence, policy context, and source caveats.",
      evidenceCount: 3,
      evidenceObservationIds: ["o2", "o12", "o18"]
    },
    {
      title: "Prepared advocacy",
      detail: "Prepared roles help her make concise claims, rebuttals, and source questions visible.",
      evidenceCount: 3,
      evidenceObservationIds: ["o7", "o13", "o14"]
    },
    {
      title: "Collaborative sense-making",
      detail: "In small groups, she often uses evidence questions to sharpen the group's thinking.",
      evidenceCount: 3,
      evidenceObservationIds: ["o5", "o11", "o15"]
    }
  ],
  learningStyle: {
    type: "Write-before-speak processor",
    detail: "Maya often shows stronger reasoning after she has time to draft, annotate, or hold a defined discussion role.",
    worksWell: ["prepared discussion roles", "source question banks", "clear project checklists", "written reflection before discussion"],
    avoid: ["cold-calling as first contact", "treating low full-class visibility as low understanding"]
  },
  thingsToObserve: [
    "Which opener formats help Maya share thinking earlier in class?",
    "Where does visual planning help her organize complex evidence?",
    "What classroom roles let her support peers without over-owning the project?"
  ]
};

export function getTeacherName(teacherId?: string) {
  return teachers.find((teacher) => teacher.id === teacherId)?.name ?? "Homeroom";
}
