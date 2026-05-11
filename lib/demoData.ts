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
  writtenExpression: "Written Expression",
  preparedSpeaking: "Prepared Communication",
  smallGroupCollab: "Small-Group Leadership",
  projectExecution: "Project Execution",
  visualReasoning: "Visual Reasoning",
  spontaneousPart: "Spontaneous Participation"
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
    labelWarning: containsBannedLabel ? "raw label · not saved as trait" : undefined,
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
  growth(8, 64, 42, 38, 51, 58, 28),
  growth(9, 68, 48, 45, 61, 66, 31),
  growth(10, 61, 63, 58, 74, 79, 37),
  growth(11, 78, 76, 68, 88, 87, 49)
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
  perf("sp-8-math", 8, "2022-2023", "Math", "B+", 87, 3.3),
  perf("sp-8-eng", 8, "2022-2023", "English", "B-", 80, 2.7),
  perf("sp-8-sci", 8, "2022-2023", "Science", "A", 94, 4.0),
  perf("sp-8-ss", 8, "2022-2023", "Social Studies", "C+", 77, 2.3),
  perf("sp-8-art-design", 8, "2022-2023", "Art / Design", "A-", 90, 3.7),
  perf("sp-8-pe", 8, "2022-2023", "Physical Education", "C", 74, 2.0),
  perf("sp-9-math", 9, "2023-2024", "Math", "A", 94, 4.0),
  perf("sp-9-eng", 9, "2023-2024", "English", "B", 84, 3.0),
  perf("sp-9-sci", 9, "2023-2024", "Science", "B+", 87, 3.3),
  perf("sp-9-ss", 9, "2023-2024", "Social Studies", "B+", 87, 3.3),
  perf("sp-9-pe", 9, "2023-2024", "Physical Education", "C", 74, 2.0),
  perf("sp-9-art-design", 9, "2023-2024", "Art / Design", "B+", 87, 3.3),
  perf("sp-10-math", 10, "2024-2025", "Math", "B-", 80, 2.7),
  perf("sp-10-eng", 10, "2024-2025", "English", "C", 74, 2.0),
  perf("sp-10-sci", 10, "2024-2025", "Science", "B", 84, 3.0),
  perf("sp-10-ss", 10, "2024-2025", "Social Studies", "A", 94, 4.0),
  perf("sp-10-art-design", 10, "2024-2025", "Art / Design", "B+", 87, 3.3),
  perf("sp-10-pe", 10, "2024-2025", "Physical Education", "A", 94, 4.0),
  perf("sp-11-math", 11, "2025-2026", "Math", "A", 94, 4.0),
  perf("sp-11-eng", 11, "2025-2026", "English", "A", 94, 4.0),
  perf("sp-11-sci", 11, "2025-2026", "Science", "B+", 87, 3.3),
  perf("sp-11-ss", 11, "2025-2026", "Social Studies", "A", 94, 4.0),
  perf("sp-11-art-design", 11, "2025-2026", "Art / Design", "A", 94, 4.0),
  perf("sp-11-pe", 11, "2025-2026", "Physical Education", "B+", 87, 3.3)
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
  snap("ps-8", 8, 74, 68, 38, 72, 61),
  snap("ps-9", 9, 77, 71, 36, 74, 58),
  snap("ps-10", 10, 81, 65, 43, 70, 63),
  snap("ps-11", 11, 84, 78, 51, 76, 55)
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
    source: "Completed student-owned learner reflection",
    completedAt: now - (12 - grade) * 85 * day
  };
}

export const pathways: PathwaySuggestion[] = [
  path("path-1", "Architecture / Spatial Design", "Maya may enjoy exploring architecture or spatial design because multiple observations show visual reasoning, diagram-based explanation, prepared presentation, and sustained interest in built environments.", ["o8", "o10", "o13", "o14"], ["Build a small portfolio with 2-3 design sketches or models.", "Enter a youth architecture or community-space design challenge.", "Interview an architect, urban planner, or design student.", "Try a summer workshop in architecture, design, or urban planning."], "Building2"),
  path("path-2", "Design Communication", "Maya may enjoy exploring design communication because teachers have seen her use sequence, layout, and visual evidence to explain cause and effect.", ["o8", "o10", "o12"], ["Create one visual explainer for a class concept.", "Ask the design teacher for feedback on layout and audience clarity.", "Collect two examples of public-interest design that explain complex ideas."], "PenTool"),
  path("path-3", "Urban Planning / Community Spaces", "Maya may enjoy exploring community-space work because her Model UN brief connected housing policy, migration data, and source caveats.", ["o18", "o13", "o16"], ["Map one neighborhood space and note who it serves.", "Compare two city housing or transit choices.", "Find a local planning meeting or youth civic design workshop."], "Map"),
  path("path-4", "Prepared Advocacy / Public Speaking", "Maya may enjoy exploring prepared advocacy because rehearsed roles, question banks, and source-based rebuttals help her communicate clearly.", ["o7", "o13", "o14"], ["Visit one debate or mock council practice.", "Draft a short prepared statement with a visual aid.", "Practice one planned response before a class discussion."], "Mic2"),
  path("path-5", "Visual Education / Teaching Through Design", "Maya may enjoy exploring visual education because she often helps peers understand ideas by organizing evidence, diagrams, and examples.", ["o5", "o8", "o15"], ["Make a diagram-based study guide for one unit.", "Try explaining a concept with a sketch before words.", "Ask a teacher where visual explanation could support classmates."], "BookOpen")
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
      currentYear: "Grade 11 complete · entering Grade 12",
      personalityType: "Reflective visual communicator",
      personalityBlurb:
        "Maya tends to process before speaking and communicates best when she can prepare, draw, diagram, or structure her ideas visually.",
      interests: ["architecture", "woodwork", "urban photography", "graphic novels", "community spaces"],
      extracurriculars: ["Woodwork workshop", "Design boot camp", "Club volleyball", "Yearbook design"],
      recentBooks: ["The Architecture of Happiness by Alain de Botton", "Just Mercy by Bryan Stevenson", "Pachinko by Min Jin Lee"],
      classes: ["English Seminar", "Applied Math", "Urban Studies", "Design Studio", "Woodwork"]
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
      title: "Visual explanation",
      detail: "Uses diagrams, sequencing, and visual models to make complex ideas easier to follow.",
      evidenceCount: 3,
      evidenceObservationIds: ["o8", "o10", "o13"]
    },
    {
      title: "Prepared communication",
      detail: "Prepared roles help her make concise claims, rebuttals, and source questions visible.",
      evidenceCount: 3,
      evidenceObservationIds: ["o7", "o13", "o14"]
    },
    {
      title: "Project/design thinking",
      detail: "Sustains project work by organizing sources, clarifying audience goals, and using visual structure.",
      evidenceCount: 3,
      evidenceObservationIds: ["o6", "o10", "o13"]
    }
  ],
  learningStyle: {
    type: "Reflective visual communicator",
    detail: "Maya often shows stronger reasoning after she has time to draft, diagram, annotate, or hold a defined discussion role.",
    worksWell: ["prepared discussion roles", "diagram-first explanations", "source question banks", "clear project checklists", "written reflection before discussion"],
    avoid: ["cold-calling as first contact", "treating low full-class visibility as low understanding", "turning one setting into a fixed conclusion"]
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
