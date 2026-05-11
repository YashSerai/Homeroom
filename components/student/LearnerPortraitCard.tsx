"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EvidenceTrail } from "@/components/student/EvidenceTrail";

const signals = [
  { label: "Visual explanation", score: 92 },
  { label: "Prepared speaking", score: 86 },
  { label: "Small-group leadership", score: 88 },
  { label: "Independent reflection", score: 91 },
  { label: "Design curiosity", score: 95 }
];

export function LearnerPortraitCard() {
  return (
    <Card className="p-5">
      <p className="mono-label">Learning style</p>
      <div className="mt-2 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Badge>medium/high confidence</Badge>
          <h2 className="mt-3 font-display text-3xl text-forest">Reflective visual communicator</h2>
          <p className="mt-3 text-ink-soft">
            Maya tends to process before speaking and communicates best when she can prepare, draw, diagram, or structure her ideas visually.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["diagram explanation", "prepared presentation", "small-group leadership", "architecture/design interest"].map((chip) => (
              <Badge key={chip} className="border-sage bg-sage-light/40 text-forest">{chip}</Badge>
            ))}
          </div>
          <p className="mt-4 text-sm text-stone">Last validated: Grade 11 spring, before Grade 12 planning</p>
          <p className="mt-4 rounded-md border border-stone-light bg-paper p-3 text-sm leading-6 text-ink-soft">
            This portrait is a summary of observed patterns. It is editable, evidence-backed, and not a fixed personality label.
          </p>
          <div className="mt-4">
            <EvidenceTrail observationIds={["o8", "o10", "o13", "o14"]} />
          </div>
        </div>
        <div className="space-y-4">
          {signals.map((signal) => (
            <div key={signal.label}>
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-forest">{signal.label}</span>
                <span className="font-mono text-xs text-stone">{signal.score}/100</span>
              </div>
              <div className="h-3 rounded-full bg-sage-light/45">
                <div className="h-3 rounded-full bg-terracotta" style={{ width: `${signal.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
