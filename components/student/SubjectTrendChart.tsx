"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDemo } from "@/components/layout/DemoProvider";

export function SubjectTrendChart({ grade, subject }: { grade: number; subject: string }) {
  const { state } = useDemo();
  const subjects = Array.from(new Set(state.subjectPerformance.filter((item) => item.grade === grade && item.numericAverage > 0).map((item) => item.subject)));
  const activeSubject = subject === "All" ? null : subject;
  const data = state.subjectPerformance
    .filter((item) => item.numericAverage > 0 && (!activeSubject || item.subject === activeSubject))
    .map((item) => ({ ...item, label: `G${item.grade} ${item.subject.replace("AP ", "")}` }));

  return (
    <div className="paper-panel rounded-lg p-5">
      <p className="mono-label">Subject layer</p>
      <h3 className="mt-2 font-display text-2xl text-forest">{activeSubject ?? `Grade ${grade} subjects`}</h3>
      <p className="mt-1 text-sm text-stone">{subjects.length} active subjects in this year. Scores are context, not learner labels.</p>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="label" stroke="#78716C" fontSize={11} />
            <YAxis domain={[70, 100]} stroke="#78716C" />
            <Tooltip contentStyle={{ background: "#FAF6EC", border: "1px solid #D6CFC2" }} />
            <Bar dataKey="numericAverage" name="Average" fill="#8FA89A" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
