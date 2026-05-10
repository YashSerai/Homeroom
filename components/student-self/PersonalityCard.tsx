"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDemo } from "@/components/layout/DemoProvider";
import { LearnerReflectionSummary } from "@/components/student-self/LearnerReflectionSummary";
import { PersonalityTraitGraph } from "@/components/student-self/PersonalityTraitGraph";
import { TraitLearnMoreDialog } from "@/components/student-self/TraitLearnMoreDialog";

export function PersonalityCard() {
  const { state } = useDemo();
  const student = state.students[0];
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Badge>Completed learner reflection</Badge>
          <h2 className="mt-3 font-display text-4xl text-forest">Big Five/IPIP-style reflection</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            This is a self-reflection, not a label. You can retake or edit what feels off.
          </p>
        </div>
        <TraitLearnMoreDialog />
      </div>
      <div className="mt-5">
        <PersonalityTraitGraph />
      </div>
      <div className="mt-5 rounded-lg border border-stone-light bg-paper p-4">
        <h3 className="font-display text-2xl text-forest">{student.personalityType}</h3>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{student.personalityBlurb}</p>
      </div>
      <div className="mt-5">
        <LearnerReflectionSummary />
      </div>
    </Card>
  );
}
