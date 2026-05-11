"use client";

import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ReferenceLine } from "recharts";
import { useDemo } from "@/components/layout/DemoProvider";
import { YearScrubber } from "@/components/student/YearScrubber";

const subjectColors: Record<string, string> = {
  Math: "#1F3D2E",
  English: "#B85A38",
  Science: "#8FA89A",
  "Social Studies": "#B6843A",
  "Art / Design": "#2D5A44",
  "Physical Education": "#78716C",
  Woodwork: "#9A6A3A"
};

const gradeScale: Record<string, number> = {
  "A+": 97,
  A: 94,
  "A-": 90,
  "B+": 87,
  B: 84,
  "B-": 80,
  "C+": 77,
  C: 74,
  "C-": 70
};

export function GpaTrendChart() {
  const { state } = useDemo();
  const [grade, setGrade] = useState(11);
  const subjects = Array.from(new Set(state.subjectPerformance.filter((item) => item.grade <= 11 && item.score !== "Pending").map((item) => item.subject)));
  const data = [8, 9, 10, 11].map((grade) => {
    const rows = state.subjectPerformance.filter((item) => item.grade === grade && item.score !== "Pending");
    const values = rows.reduce<Record<string, number | string>>((acc, item) => {
      const score = gradeScale[item.score] ?? item.numericAverage;
      acc[item.subject] = score;
      acc[`${item.subject}Grade`] = item.score;
      return acc;
    }, {});
    return {
      grade: `Grade ${grade}`,
      ...values
    };
  });

  return (
    <div className="paper-panel rounded-lg p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <p className="mono-label">01 · Fresh-start handoff</p>
          <h3 className="mt-2 font-display text-3xl text-forest">Grades over time</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
            This is Maya&apos;s Grade 8-11 record as she prepares for Grade 12. Grades show performance, not the whole learner, so Homeroom reads them alongside teacher observations, parent context, and student interests.
          </p>
        </div>
        <YearScrubber grade={grade} onGrade={setGrade} />
      </div>
      <div className="mt-5 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 20, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="#D6CFC2" strokeDasharray="3 5" />
            <XAxis dataKey="grade" stroke="#78716C" />
            <YAxis domain={[70, 100]} stroke="#78716C" tickFormatter={(value) => `${value}`} />
            <Tooltip content={<GradeTooltip />} />
            <Legend />
            <ReferenceLine x={`Grade ${grade}`} stroke="#B85A38" strokeDasharray="4 4" />
            {subjects.map((subject, index) => (
              <Line
                key={subject}
                type="monotone"
                dataKey={subject}
                name={subject}
                stroke={subjectColors[subject] ?? fallbackColors[index % fallbackColors.length]}
                strokeWidth={3}
                dot={{ r: 4 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-sm text-stone">
        The chart shows the same transcript subjects through Grade 11. Art / Design includes the Grade 11 woodwork and design elective work.
      </p>
    </div>
  );
}

const fallbackColors = ["#1F3D2E", "#B85A38", "#8FA89A", "#B6843A", "#2D5A44", "#78716C", "#9A6A3A"];

function GradeTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-stone-light bg-paper-light p-3 text-sm shadow-paper">
      <p className="font-semibold text-forest">{label}</p>
      <div className="mt-2 space-y-2">
        {payload
          .filter((item: any) => item.value != null)
          .map((item: any) => (
            <div key={item.name}>
              <p className="font-medium" style={{ color: item.color }}>{item.name}: {item.value}/100</p>
              <p className="text-xs text-stone">Letter grade: {item.payload?.[`${item.name}Grade`]}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
