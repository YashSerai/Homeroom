"use client";

import { GitCompareArrows } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EvidenceTrail } from "@/components/student/EvidenceTrail";
import { useDemo } from "@/components/layout/DemoProvider";

export function ConflictPatternCard() {
  const { state } = useDemo();
  const pattern = state.patterns[0];
  const left = state.observations.find((observation) => observation.id === "o4") ?? state.observations[3];
  const right = state.observations.find((observation) => observation.id === "o5") ?? state.observations[4];
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <GitCompareArrows className="mt-1 h-5 w-5 text-terracotta" />
        <div>
          <Badge>conflict as signal</Badge>
          <h2 className="mt-3 font-display text-3xl text-forest">{pattern.pattern}</h2>
          <p className="mt-2 text-ink-soft">{pattern.description}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {[left, right].map((observation) =>
          observation ? (
            <div key={observation.id} className="rounded-lg border border-stone-light bg-paper p-4">
              <Badge>{observation.subject} · Grade {observation.grade}</Badge>
              <p className="mt-3 text-sm font-medium">{observation.observedBehavior}</p>
              <p className="mt-2 text-sm text-stone">“{observation.evidenceQuote}”</p>
            </div>
          ) : null
        )}
      </div>
      <div className="mt-4 rounded-lg bg-sage-light/50 p-4">
        <p className="font-semibold text-forest">Suggested support</p>
        <p className="mt-1 text-sm text-ink-soft">{pattern.suggestedSupport}</p>
      </div>
      <div className="mt-4">
        <EvidenceTrail observationIds={pattern.evidenceObservationIds} />
      </div>
    </Card>
  );
}
