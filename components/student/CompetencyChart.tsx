"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDemo } from "@/components/layout/DemoProvider";
import { EvidenceTrail } from "@/components/student/EvidenceTrail";

export function CompetencyChart({ grade, subject }: { grade: number; subject: string }) {
  const { state } = useDemo();
  const rows = state.curriculumCompetencies.filter(
    (item) => item.grade === grade && (subject === "All" || item.subject === subject)
  );

  return (
    <div className="paper-panel rounded-lg p-5">
      <p className="mono-label">Core competencies</p>
      <h3 className="mt-2 font-display text-2xl text-forest">Curriculum-tied evidence</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} layout="vertical" margin={{ left: 30 }}>
            <XAxis type="number" domain={[0, 100]} stroke="#78716C" />
            <YAxis type="category" dataKey="competency" width={140} stroke="#78716C" fontSize={11} />
            <Tooltip contentStyle={{ background: "#FAF6EC", border: "1px solid #D6CFC2" }} />
            <Bar dataKey="score" name="Competency score" fill="#B6843A" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {rows.map((row) => (
          <div key={row.id} className="rounded-md border border-stone-light bg-paper p-3">
            <p className="font-medium text-forest">{row.competency}</p>
            <p className="text-sm text-stone">{row.subject} · {row.score}/100</p>
            {row.evidenceObservationIds.length > 0 && <EvidenceTrail observationIds={row.evidenceObservationIds} />}
          </div>
        ))}
      </div>
    </div>
  );
}
