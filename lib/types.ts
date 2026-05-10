export type Dimension =
  | "writtenExpression"
  | "preparedSpeaking"
  | "smallGroupCollab"
  | "projectExecution"
  | "visualReasoning"
  | "spontaneousPart";

export type Signal = "current" | "historical" | "stale" | "contradicted" | "revalidated";
export type Confidence = "low" | "medium" | "high";
export type Visibility = "teacher" | "handoff" | "parent" | "student" | "counselor" | "doNotCarryForward";

export type Student = {
  id: string;
  name: string;
  currentGrade: number;
  currentYear: string;
  personalityType: string;
  personalityBlurb: string;
  interests: string[];
  extracurriculars: string[];
  recentBooks: string[];
  classes: string[];
  backboardThreadId?: string;
};

export type Teacher = {
  id: string;
  name: string;
  subject: string;
  grade: number;
};

export type RawNote = {
  id: string;
  studentId: string;
  teacherId?: string;
  parentId?: string;
  grade: number;
  subject?: string;
  setting?: string;
  rawText: string;
  chatTranscript?: string;
  processed: boolean;
  createdAt: number;
  containsBannedLabel?: boolean;
  labelWarning?: string;
};

export type Observation = {
  id: string;
  studentId: string;
  sourceNoteId: string;
  teacherId?: string;
  grade: number;
  subject?: string;
  setting: string;
  observedBehavior: string;
  context: string;
  dimension: Dimension;
  signal: Signal;
  confidence: Confidence;
  visibility: Visibility;
  evidenceQuote: string;
  humanApproved: boolean;
  needsRevalidation: boolean;
  createdAt: number;
  lastValidated?: number;
};

export type Insight = {
  id: string;
  studentId: string;
  summary: string;
  evidenceObservationIds: string[];
  dimension: Dimension;
  confidence: Confidence;
  visibility: Visibility;
  humanApproved: boolean;
  needsRevalidation: boolean;
  createdAt: number;
  lastValidated?: number;
};

export type Pattern = {
  id: string;
  studentId: string;
  pattern: string;
  description: string;
  evidenceObservationIds: string[];
  suggestedSupport: string;
  confidence: Confidence;
  isContradiction: boolean;
  firstDetected: number;
  lastValidated: number;
};

export type GrowthMap = {
  studentId: string;
  grade: number;
  writtenExpression: number;
  preparedSpeaking: number;
  smallGroupCollab: number;
  projectExecution: number;
  visualReasoning: number;
  spontaneousPart: number;
};

export type SubjectPerformance = {
  id: string;
  studentId: string;
  grade: number;
  year: string;
  subject: string;
  score: string;
  numericAverage: number;
  gpaPoints: number;
};

export type CurriculumCompetency = {
  id: string;
  studentId: string;
  grade: number;
  subject: string;
  competency: string;
  score: number;
  evidenceObservationIds: string[];
};

export type PersonalitySnapshot = {
  id: string;
  studentId: string;
  grade: number;
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  emotionalRange: number;
  source: string;
  completedAt: number;
};

export type PathwaySuggestion = {
  id: string;
  studentId: string;
  grade: number;
  area: string;
  rationale: string;
  evidenceObservationIds: string[];
  explorationSteps: string[];
  icon: string;
};

export type ConversationPrompt = {
  id: string;
  studentId: string;
  prompt: string;
  derivedFrom: string[];
};

export type HandoffSummary = {
  strengths: { title: string; detail: string; evidenceCount: number; evidenceObservationIds: string[] }[];
  learningStyle: { type: string; detail: string; worksWell: string[]; avoid: string[] };
  thingsToObserve: string[];
};

export type AuditEvent = {
  id: string;
  studentId: string;
  actorRole: string;
  actorName: string;
  action: string;
  targetType: string;
  targetId?: string;
  details: string;
  createdAt: number;
};

export type DemoState = {
  students: Student[];
  teachers: Teacher[];
  rawNotes: RawNote[];
  observations: Observation[];
  insights: Insight[];
  patterns: Pattern[];
  growthMaps: GrowthMap[];
  subjectPerformance: SubjectPerformance[];
  curriculumCompetencies: CurriculumCompetency[];
  personalitySnapshots: PersonalitySnapshot[];
  pathways: PathwaySuggestion[];
  conversationPrompts: ConversationPrompt[];
  handoffRevealed: boolean;
  auditEvents: AuditEvent[];
};
