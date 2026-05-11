"use client";

import { FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/components/layout/DemoProvider";
import { getTeacherName } from "@/lib/demoData";

export function EvidenceTrail({ observationIds }: { observationIds: string[] }) {
  const { state } = useDemo();
  const observations = resolveObservations(state.observations, observationIds);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <FileText className="h-4 w-4" />
          Evidence
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="font-display text-3xl text-forest">Evidence trail</DialogTitle>
        <DialogDescription className="mt-2 text-ink-soft">
          These are approved observations with source context, confidence, and setting.
        </DialogDescription>
        <div className="mt-5 space-y-4">
          {observations.map((observation) => (
            <div key={observation.id} className="rounded-lg border border-stone-light bg-paper p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge>{observation.confidence} confidence</Badge>
                <Badge>{observation.signal}</Badge>
                <span className="mono-label">Grade {observation.grade} · {observation.subject} · {getTeacherName(observation.teacherId)}</span>
              </div>
              <p className="font-medium text-ink">{observation.observedBehavior}</p>
              <p className="mt-2 text-sm text-stone">Evidence: &quot;{observation.evidenceQuote}&quot;</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function resolveObservations<T extends { id: string }>(observations: T[], ids: string[]) {
  const direct = observations.filter((observation) => ids.includes(observation.id));
  if (direct.length > 0) return direct;
  return ids
    .map((id) => {
      const match = /^o(\d+)$/.exec(id);
      return match ? observations[Number(match[1]) - 1] : undefined;
    })
    .filter(Boolean) as T[];
}
