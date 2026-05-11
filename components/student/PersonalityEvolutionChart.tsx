"use client";

import { useMemo, useState } from "react";
import { Radar, RadarChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useDemo } from "@/components/layout/DemoProvider";
import { YearScrubber } from "@/components/student/YearScrubber";

const profileByGrade: Record<number, { label: string; score: number }[]> = {
  8: [
    { label: "Creative Curiosity", score: 76 },
    { label: "Independent Focus", score: 72 },
    { label: "Prepared Voice", score: 42 },
    { label: "Group Ease", score: 38 },
    { label: "Visual Thinking", score: 62 },
    { label: "Follow-through", score: 58 },
    { label: "Flexibility", score: 64 },
    { label: "Confidence Under Pressure", score: 34 }
  ],
  9: [
    { label: "Creative Curiosity", score: 79 },
    { label: "Independent Focus", score: 76 },
    { label: "Prepared Voice", score: 48 },
    { label: "Group Ease", score: 41 },
    { label: "Visual Thinking", score: 68 },
    { label: "Follow-through", score: 63 },
    { label: "Flexibility", score: 57 },
    { label: "Confidence Under Pressure", score: 32 }
  ],
  10: [
    { label: "Creative Curiosity", score: 84 },
    { label: "Independent Focus", score: 70 },
    { label: "Prepared Voice", score: 62 },
    { label: "Group Ease", score: 52 },
    { label: "Visual Thinking", score: 81 },
    { label: "Follow-through", score: 56 },
    { label: "Flexibility", score: 60 },
    { label: "Confidence Under Pressure", score: 39 }
  ],
  11: [
    { label: "Creative Curiosity", score: 87 },
    { label: "Independent Focus", score: 78 },
    { label: "Prepared Voice", score: 73 },
    { label: "Group Ease", score: 61 },
    { label: "Visual Thinking", score: 88 },
    { label: "Follow-through", score: 74 },
    { label: "Flexibility", score: 66 },
    { label: "Confidence Under Pressure", score: 47 }
  ]
};

const notesByGrade: Record<number, string> = {
  8: "Maya's reflection starts with high curiosity and independent focus, while group ease and pressure confidence are still emerging.",
  9: "Independent making remains strong, but group settings still need structure and repeated practice.",
  10: "Visual thinking rises as design and project work give Maya more concrete ways to explain ideas.",
  11: "Prepared voice and follow-through strengthen as Maya prepares for Grade 12 with clearer evidence about how she communicates best."
};

export function PersonalityEvolutionChart({ compact = false }: { compact?: boolean }) {
  const { state } = useDemo();
  const [grade, setGrade] = useState(11);
  const student = state.students[0];
  const data = useMemo(() => profileByGrade[grade] ?? profileByGrade[11], [grade]);

  return (
    <div className="paper-panel rounded-lg p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <p className="mono-label">Personality profile</p>
          <h3 className="mt-2 font-display text-3xl text-forest">{student.personalityType}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
            Maya&apos;s student-owned reflection, shown by year. This is a learning profile to discuss and revise, not a fixed score.
          </p>
        </div>
        {!compact && <YearScrubber grade={grade} onGrade={setGrade} />}
      </div>
      <div className={compact ? "mt-4 h-72" : "mt-4 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]"}>
        <div className={compact ? "h-full" : "h-96"}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius={compact ? 92 : 145}>
              <PolarGrid stroke="#D6CFC2" />
              <PolarAngleAxis dataKey="label" tick={{ fill: "#3A3733", fontSize: compact ? 10 : 12 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="score" name={`Grade ${grade}`} stroke="#1F3D2E" fill="#1F3D2E" fillOpacity={0.22} strokeWidth={2} />
              <Tooltip contentStyle={{ background: "#FAF6EC", border: "1px solid #D6CFC2" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        {!compact && (
          <div className="space-y-4">
            <div className="rounded-md border border-stone-light bg-paper p-4">
              <p className="mono-label">Grade {grade} read</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{notesByGrade[grade]}</p>
            </div>
            <div className="rounded-md border border-sage-light bg-sage-light/30 p-4">
              <p className="font-semibold text-forest">What changed over time</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                The biggest shift is not that every dimension increased. Maya became more comfortable using prepared voice, visual thinking, and structured group roles while pressure-heavy participation stayed a growth edge.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
