"use client";

import { useMemo, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { YearScrubber } from "@/components/student/YearScrubber";
import { useDemo } from "@/components/layout/DemoProvider";
import { dimensionLabels, getTeacherName } from "@/lib/demoData";
import { type Dimension } from "@/lib/types";

const dimensions = Object.keys(dimensionLabels) as Dimension[];

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
          <p className="mono-label">Growth Map</p>
          <h2 className="font-display text-3xl text-forest">Grade {visibleGrade} evidence profile</h2>
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
      <p className="text-sm text-stone">Click an axis to inspect the observations behind the score.</p>
      <Sheet open={Boolean(axis)} onOpenChange={(open) => !open && setAxis(null)}>
        <SheetContent>
          <h2 className="font-display text-3xl text-forest">{axis ? dimensionLabels[axis] : "Evidence"}</h2>
          <p className="mt-2 text-ink-soft">Grouped across years with confidence and signal state visible.</p>
          <div className="mt-6 space-y-4">
            {axisObservations.map((observation) => (
              <div key={observation.id} className="rounded-lg border border-stone-light bg-paper p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Grade {observation.grade}</Badge>
                  <Badge>{observation.signal}</Badge>
                  <Badge>{observation.confidence}</Badge>
                </div>
                <p className="mt-3 font-medium">{observation.observedBehavior}</p>
                <p className="mt-2 text-sm text-stone">{getTeacherName(observation.teacherId)} · “{observation.evidenceQuote}”</p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
