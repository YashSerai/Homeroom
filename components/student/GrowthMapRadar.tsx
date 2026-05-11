"use client";

import { useMemo, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { YearScrubber } from "@/components/student/YearScrubber";
import { useDemo } from "@/components/layout/DemoProvider";
import { dimensionLabels, getTeacherName } from "@/lib/demoData";
import { type Dimension } from "@/lib/types";

const dimensions = Object.keys(dimensionLabels) as Dimension[];

const competencyHelp: Record<Dimension, string> = {
  writtenExpression: "How Maya develops ideas in writing, uses evidence, and revises claims.",
  preparedSpeaking: "How Maya communicates when she can rehearse, write first, or hold a planned role.",
  smallGroupCollab: "How Maya moves peer work forward in smaller settings through questions, roles, and shared evidence.",
  projectExecution: "How Maya organizes complex tasks, timelines, sources, and deliverables.",
  visualReasoning: "How Maya uses diagrams, layouts, sketches, models, or visual sequencing to explain ideas.",
  spontaneousPart: "How visible Maya's thinking is when she is asked to respond without preparation."
};

export function GrowthMapRadar({ compact = false, selectedGrade }: { compact?: boolean; selectedGrade?: number }) {
  const { state } = useDemo();
  const [grade, setGrade] = useState(11);
  const [axis, setAxis] = useState<Dimension | null>(null);
  const visibleGrade = selectedGrade ?? grade;
  const active = state.growthMaps.find((map) => map.grade === visibleGrade) ?? state.growthMaps[0];
  const data = useMemo(
    () => dimensions.map((dimension) => ({ dimension, label: dimensionLabels[dimension], score: active[dimension] })),
    [active]
  );
  const axisObservations = axis
    ? state.observations.filter((observation) => observation.dimension === axis).sort((a, b) => b.grade - a.grade)
    : [];

  return (
    <section className="paper-panel rounded-lg p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="mono-label">02 · Growth signals</p>
          <h2 className="font-display text-3xl text-forest">Growth competencies radar</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
            These are evidence-backed growth signals, not fixed traits. The pattern is uneven by year because settings, courses, and support changed.
          </p>
        </div>
        {!selectedGrade && <YearScrubber grade={grade} onGrade={setGrade} />}
      </div>
      <div className={compact ? "h-[280px]" : "h-[470px]"}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius={compact ? 90 : 155}>
            <PolarGrid stroke="#D6CFC2" />
            <PolarAngleAxis
              dataKey="label"
              tick={{ fill: "#3A3733", fontSize: compact ? 10 : 12 }}
              onClick={(event) => {
                const found = data.find((item) => item.label === event.value);
                if (found) setAxis(found.dimension);
              }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar dataKey="score" stroke="#B85A38" fill="#B85A38" fillOpacity={0.26} strokeWidth={2} isAnimationActive />
            <Tooltip contentStyle={{ background: "#FAF6EC", border: "1px solid #D6CFC2" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-3 text-sm text-ink-soft md:grid-cols-2">
        {dimensions.map((dimension) => (
          <button
            key={dimension}
            type="button"
            onClick={() => setAxis(dimension)}
            className="rounded-md border border-stone-light bg-paper/70 p-3 text-left transition hover:border-terracotta"
          >
            <span className="font-semibold text-forest">{dimensionLabels[dimension]}</span>
            <span className="mt-1 block">{competencyHelp[dimension]}</span>
          </button>
        ))}
      </div>
      <Sheet open={Boolean(axis)} onOpenChange={(open) => !open && setAxis(null)}>
        <SheetContent>
          <SheetTitle className="font-display text-3xl text-forest">{axis ? dimensionLabels[axis] : "Evidence"}</SheetTitle>
          <p className="mt-2 text-ink-soft">{axis ? competencyHelp[axis] : "Grouped across years with confidence and signal state visible."}</p>
          <div className="mt-6 space-y-4">
            {axisObservations.map((observation) => (
              <div key={observation.id} className="rounded-lg border border-stone-light bg-paper p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Grade {observation.grade}</Badge>
                  <Badge>{observation.signal}</Badge>
                  <Badge>{observation.confidence}</Badge>
                </div>
                <p className="mt-3 font-medium">{observation.observedBehavior}</p>
                <p className="mt-2 text-sm text-stone">{getTeacherName(observation.teacherId)} · &quot;{observation.evidenceQuote}&quot;</p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
