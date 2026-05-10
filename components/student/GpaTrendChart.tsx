"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDemo } from "@/components/layout/DemoProvider";

export function GpaTrendChart() {
  const { state } = useDemo();
  const data = [8, 9, 10, 11].map((grade) => {
    const rows = state.subjectPerformance.filter((item) => item.grade === grade && item.gpaPoints > 0);
    const gpa = rows.reduce((sum, item) => sum + item.gpaPoints, 0) / rows.length;
    const average = rows.reduce((sum, item) => sum + item.numericAverage, 0) / rows.length;
    return { grade: `G${grade}`, gpa: Number(gpa.toFixed(2)), average: Number(average.toFixed(1)) };
  });

  return (
    <div className="paper-panel rounded-lg p-5">
      <p className="mono-label">Grades/GPA</p>
      <h3 className="mt-2 font-display text-2xl text-forest">Performance context over time</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="grade" stroke="#78716C" />
            <YAxis yAxisId="left" domain={[75, 100]} stroke="#78716C" />
            <YAxis yAxisId="right" orientation="right" domain={[2.5, 4]} stroke="#78716C" />
            <Tooltip contentStyle={{ background: "#FAF6EC", border: "1px solid #D6CFC2" }} />
            <Line yAxisId="left" type="monotone" dataKey="average" name="Average" stroke="#B85A38" strokeWidth={3} />
            <Line yAxisId="right" type="monotone" dataKey="gpa" name="GPA" stroke="#1F3D2E" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
