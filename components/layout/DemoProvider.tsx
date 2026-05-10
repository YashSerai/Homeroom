"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { initialDemoState } from "@/lib/demoData";
import { extractObservation } from "@/lib/demoAiFallback";
import { type DemoState, type Observation, type RawNote } from "@/lib/types";

type DemoContextValue = {
  state: DemoState;
  revealHandoff: () => void;
  addObservationFromTranscript: (transcript: string[], approvedExtraction?: ReturnType<typeof extractObservation>) => Observation;
  updateInterests: (interests: string[]) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);
const storageKey = "homeroom-demo-state-v1";

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const convexData = useQuery(api.students.demoData, {});
  const approveConvexObservation = useMutation(api.observations.approveDraft);
  const updateConvexInterests = useMutation(api.students.updateInterests);
  const [localState, setLocalState] = useState<DemoState>(initialDemoState);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setLocalState(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(localState));
  }, [localState]);

  const state = useMemo(() => mapConvexData(convexData) ?? localState, [convexData, localState]);

  const value = useMemo<DemoContextValue>(
    () => ({
      state,
      revealHandoff: () => setLocalState((current) => ({ ...current, handoffRevealed: true })),
      updateInterests: (interests) =>
        setLocalState((current) => ({
          ...current,
          students: current.students.map((student) => (student.id === "maya" ? { ...student, interests } : student))
        })),
      addObservationFromTranscript: (transcript, approvedExtraction) => {
        const fullTranscript = transcript.join("\n");
        const extraction = approvedExtraction ?? extractObservation(fullTranscript);
        const now = Date.now();
        const rawText = transcript.find((line) => line.startsWith("Teacher:"))?.replace("Teacher:", "").trim() ?? "";
        const rawNote: RawNote = {
          id: `rn-demo-${now}`,
          studentId: "maya",
          teacherId: "t11-civ",
          grade: 11,
          subject: "Math",
          setting: extraction.setting,
          rawText,
          chatTranscript: fullTranscript,
          processed: true,
          createdAt: now,
          containsBannedLabel: /quiet|shy|lazy|introverted|struggling/i.test(rawText),
          labelWarning: /quiet|shy|lazy|introverted|struggling/i.test(rawText) ? "label-only · low confidence" : undefined
        };
        const observation: Observation = {
          id: `o-demo-${now}`,
          studentId: "maya",
          sourceNoteId: rawNote.id,
          teacherId: "t11-civ",
          grade: 11,
          subject: "Math",
          setting: extraction.setting,
          observedBehavior: extraction.observedBehavior,
          context: extraction.context,
          dimension: extraction.dimension,
          signal: "current",
          confidence: extraction.confidence,
          visibility: "handoff",
          evidenceQuote: extraction.evidenceQuote,
          humanApproved: true,
          needsRevalidation: extraction.confidence === "low",
          createdAt: now,
          lastValidated: now
        };
        const convexStudentId = convexData?.student?._id;
        const convexTeacherId = convexData?.teachers.find((teacher) => teacher.grade === 11 && teacher.subject === "Civics")?._id;
        if (convexStudentId && convexTeacherId) {
          void approveConvexObservation({
            studentId: convexStudentId,
            teacherId: convexTeacherId,
            rawText,
            chatTranscript: fullTranscript,
            observedBehavior: extraction.observedBehavior,
            context: extraction.context,
            setting: extraction.setting,
            dimension: extraction.dimension,
            confidence: extraction.confidence,
            evidenceQuote: extraction.evidenceQuote
          });
        }
        setLocalState((current) => ({
          ...current,
          rawNotes: [rawNote, ...current.rawNotes],
          observations: [observation, ...current.observations],
          handoffRevealed: true,
          growthMaps: current.growthMaps.map((map) =>
            map.grade === 11 ? { ...map, spontaneousPart: Math.min(100, map.spontaneousPart + 3) } : map
          ),
          auditEvents: [
            {
              id: `audit-${now}`,
              studentId: "maya",
              actorRole: "teacher",
              actorName: "Demo Teacher",
              action: "approved_observation",
              targetType: "observation",
              targetId: observation.id,
              details: "Approved AI-structured observation draft using deterministic fallback.",
              createdAt: now
            },
            ...current.auditEvents
          ]
        }));
        return observation;
      }
    }),
    [approveConvexObservation, convexData, state]
  );

  useEffect(() => {
    const convexStudentId = convexData?.student?._id;
    if (!convexStudentId) return;
    const current = state.students[0]?.interests.join("|");
    const local = localState.students[0]?.interests.join("|");
    if (current !== local && localState !== initialDemoState) {
      void updateConvexInterests({ studentId: convexStudentId, interests: localState.students[0].interests });
    }
  }, [convexData?.student?._id, localState, state.students, updateConvexInterests]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used inside DemoProvider");
  return context;
}

function mapConvexData(data: any): DemoState | null {
  if (!data?.student) return null;
  const fallback = initialDemoState;
  return {
    students: [
      {
        id: data.student._id,
        name: data.student.name,
        currentGrade: data.student.currentGrade,
        currentYear: data.student.currentYear,
        personalityType: data.student.personalityType,
        personalityBlurb: data.student.personalityBlurb,
        interests: data.student.interests,
        extracurriculars: data.student.extracurriculars,
        recentBooks: data.student.recentBooks,
        classes: ["AP English", "Civics", "Precalculus", "Design Lab"],
        backboardThreadId: data.student.backboardThreadId
      }
    ],
    teachers: data.teachers.map((teacher: any) => ({
      id: teacher._id,
      name: teacher.name,
      subject: teacher.subject,
      grade: teacher.grade
    })),
    rawNotes: data.rawNotes.map((note: any) => ({
      id: note._id,
      studentId: note.studentId,
      teacherId: note.teacherId,
      parentId: note.parentId,
      grade: note.grade,
      subject: note.subject,
      setting: note.setting,
      rawText: note.rawText,
      chatTranscript: note.chatTranscript,
      processed: note.processed,
      createdAt: note.createdAt,
      containsBannedLabel: note.containsBannedLabel,
      labelWarning: note.labelWarning
    })),
    observations: data.observations.map((observation: any) => ({
      id: observation._id,
      studentId: observation.studentId,
      sourceNoteId: observation.sourceNoteId,
      teacherId: observation.teacherId,
      grade: observation.grade,
      subject: observation.subject,
      setting: observation.setting,
      observedBehavior: observation.observedBehavior,
      context: observation.context,
      dimension: observation.dimension,
      signal: observation.signal,
      confidence: observation.confidence,
      visibility: observation.visibility,
      evidenceQuote: observation.evidenceQuote,
      humanApproved: observation.humanApproved,
      needsRevalidation: observation.needsRevalidation,
      createdAt: observation.createdAt,
      lastValidated: observation.lastValidated
    })),
    insights: data.insights.map((insight: any) => ({
      id: insight._id,
      studentId: insight.studentId,
      summary: insight.summary,
      evidenceObservationIds: insight.evidenceObservationIds,
      dimension: insight.dimension,
      confidence: insight.confidence,
      visibility: insight.visibility,
      humanApproved: insight.humanApproved,
      needsRevalidation: insight.needsRevalidation,
      createdAt: insight.createdAt,
      lastValidated: insight.lastValidated
    })),
    patterns: data.patterns.map((pattern: any) => ({
      id: pattern._id,
      studentId: pattern.studentId,
      pattern: pattern.pattern,
      description: pattern.description,
      evidenceObservationIds: pattern.evidenceObservationIds,
      suggestedSupport: pattern.suggestedSupport,
      confidence: pattern.confidence,
      isContradiction: pattern.isContradiction,
      firstDetected: pattern.firstDetected,
      lastValidated: pattern.lastValidated
    })),
    growthMaps: data.growthMaps.map((map: any) => ({
      studentId: map.studentId,
      grade: map.grade,
      writtenExpression: map.writtenExpression,
      preparedSpeaking: map.preparedSpeaking,
      smallGroupCollab: map.smallGroupCollab,
      projectExecution: map.projectExecution,
      visualReasoning: map.visualReasoning,
      spontaneousPart: map.spontaneousPart
    })),
    subjectPerformance: data.subjectPerformance?.length ? data.subjectPerformance.map((item: any) => ({
      id: item._id,
      studentId: item.studentId,
      grade: item.grade,
      year: item.year,
      subject: item.subject,
      score: item.score,
      numericAverage: item.numericAverage,
      gpaPoints: item.gpaPoints
    })) : fallback.subjectPerformance,
    curriculumCompetencies: data.curriculumCompetencies?.length ? data.curriculumCompetencies.map((item: any) => ({
      id: item._id,
      studentId: item.studentId,
      grade: item.grade,
      subject: item.subject,
      competency: item.competency,
      score: item.score,
      evidenceObservationIds: item.evidenceObservationIds
    })) : fallback.curriculumCompetencies,
    personalitySnapshots: data.personalitySnapshots?.length ? data.personalitySnapshots.map((item: any) => ({
      id: item._id,
      studentId: item.studentId,
      grade: item.grade,
      openness: item.openness,
      conscientiousness: item.conscientiousness,
      extraversion: item.extraversion,
      agreeableness: item.agreeableness,
      emotionalRange: item.emotionalRange,
      source: item.source,
      completedAt: item.completedAt
    })) : fallback.personalitySnapshots,
    pathways: data.pathways.map((pathway: any) => ({
      id: pathway._id,
      studentId: pathway.studentId,
      grade: pathway.grade,
      area: pathway.area,
      rationale: pathway.rationale,
      evidenceObservationIds: pathway.evidenceObservationIds,
      explorationSteps: pathway.explorationSteps,
      icon: pathway.icon
    })),
    conversationPrompts: data.conversationPrompts.map((prompt: any) => ({
      id: prompt._id,
      studentId: prompt.studentId,
      prompt: prompt.prompt,
      derivedFrom: prompt.derivedFrom
    })),
    handoffRevealed: Boolean(data.handoffState?.firstObservationLogged || data.handoffState?.revealedAt),
    auditEvents: data.auditEvents.map((event: any) => ({
      id: event._id,
      studentId: event.studentId,
      actorRole: event.actorRole,
      actorName: event.actorName,
      action: event.action,
      targetType: event.targetType,
      targetId: event.targetId,
      details: event.details,
      createdAt: event.createdAt
    }))
  };
}
