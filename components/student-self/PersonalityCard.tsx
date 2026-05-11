"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useDemo } from "@/components/layout/DemoProvider";
import { PersonalityEvolutionChart } from "@/components/student/PersonalityEvolutionChart";

export function PersonalityCard() {
  const { state } = useDemo();
  const student = state.students[0];
  return (
    <Card className="p-6">
      <Badge>Student-owned personality reflection</Badge>
      <h2 className="mt-3 font-display text-4xl text-forest">{student.personalityType}</h2>
      <p className="mt-3 max-w-2xl text-ink-soft">
        This reflection can help you notice how you learn, communicate, and recharge. It is here to help you understand yourself better, not to box you in.
      </p>
      <div className="mt-5">
        <PersonalityEvolutionChart compact />
      </div>
      <div className="mt-5 rounded-lg border border-stone-light bg-paper p-4">
        <p className="mono-label">About this personality type</p>
        <p className="text-sm leading-6 text-ink-soft">{student.personalityBlurb}</p>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          For you, this may mean ideas feel clearer after sketching, writing, building, or rehearsing. You can use that as a strength when choosing projects, study strategies, and ways to participate.
        </p>
      </div>
      <label className="mt-5 block text-sm font-semibold text-forest">
        What I want teachers to know
        <textarea
          className="mt-2 min-h-28 w-full rounded-md border border-stone-light bg-paper px-3 py-2 text-ink outline-none focus:border-terracotta"
          defaultValue="I like having time to plan what I want to say. Sketching or writing first helps me explain my ideas."
        />
      </label>
    </Card>
  );
}
