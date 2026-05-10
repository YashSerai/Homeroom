"use client";

import { Line, LineChart, Radar, RadarChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDemo } from "@/components/layout/DemoProvider";

const labels = {
  openness: "Openness",
  conscientiousness: "Conscientiousness",
  extraversion: "Expressive energy",
  agreeableness: "Collaboration",
  emotionalRange: "Stress signals"
};

export function PersonalityEvolutionChart({ compact = false }: { compact?: boolean }) {
  const { state } = useDemo();
  const latest = state.personalitySnapshots[state.personalitySnapshots.length - 1];
  const radarData = latest
    ? Object.entries(labels).map(([key, label]) => ({ label, score: latest[key as keyof typeof labels] as number }))
    : [];
  const lineData = state.personalitySnapshots.map((snapshot) => ({ ...snapshot, label: `G${snapshot.grade}` }));

  return (
    <div className="paper-panel rounded-lg p-5">
      <p className="mono-label">Learner reflection</p>
      <h3 className="mt-2 font-display text-2xl text-forest">Big Five/IPIP-style snapshot</h3>
      <p className="mt-1 text-sm text-stone">Completed by Maya. This is a self-reflection, not a label.</p>
      <div className={compact ? "mt-4 h-64" : "mt-4 grid gap-4 lg:grid-cols-2"}>
        <div className={compact ? "h-full" : "h-80"}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#D6CFC2" />
              <PolarAngleAxis dataKey="label" tick={{ fill: "#3A3733", fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="score" stroke="#1F3D2E" fill="#1F3D2E" fillOpacity={0.22} strokeWidth={2} />
              <Tooltip contentStyle={{ background: "#FAF6EC", border: "1px solid #D6CFC2" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        {!compact && (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="label" stroke="#78716C" />
                <YAxis domain={[35, 100]} stroke="#78716C" />
                <Tooltip contentStyle={{ background: "#FAF6EC", border: "1px solid #D6CFC2" }} />
                <Line type="monotone" dataKey="openness" name="Openness" stroke="#B85A38" strokeWidth={2} />
                <Line type="monotone" dataKey="conscientiousness" name="Conscientiousness" stroke="#1F3D2E" strokeWidth={2} />
                <Line type="monotone" dataKey="extraversion" name="Expressive energy" stroke="#B6843A" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
