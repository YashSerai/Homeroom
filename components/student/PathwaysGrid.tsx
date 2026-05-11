"use client";

import { BookOpen, Building2, Map, Mic2, PenTool } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EvidenceTrail } from "@/components/student/EvidenceTrail";
import { useDemo } from "@/components/layout/DemoProvider";

const icons = { BookOpen, Building2, Map, Mic2, PenTool };

export function PathwaysGrid({ preview = false }: { preview?: boolean }) {
  const { state } = useDemo();
  const pathways = preview ? state.pathways.slice(0, 4) : state.pathways;
  return (
    <section>
      <p className="mono-label">04 · Areas to explore</p>
      <h2 className="mt-2 font-display text-4xl text-forest">Pathways to explore</h2>
      <p className="mt-2 max-w-3xl text-ink-soft">
        Evidence-backed suggestions for Maya to investigate. These are exploration options, not predictions or decisions.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {pathways.map((pathway, index) => {
          const Icon = icons[pathway.icon as keyof typeof icons] ?? BookOpen;
          return (
            <Card key={pathway.id} className={index === 0 ? "border-terracotta p-5" : "p-5"}>
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-terracotta/12 p-2 text-terracotta"><Icon className="h-5 w-5" /></div>
                <div>
                  <Badge>{index === 0 ? "Primary exploration" : "Exploration suggestion. Not a prediction."}</Badge>
                  <h3 className="mt-3 font-display text-2xl text-forest">{pathway.area}</h3>
                </div>
              </div>
              <p className="mt-3 text-ink-soft">{pathway.rationale}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {pathway.evidenceObservationIds.map((id) => <Badge key={id}>evidence {id}</Badge>)}
              </div>
              {!preview && (
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  {pathway.explorationSteps.map((step) => <li key={step}>- {step}</li>)}
                </ul>
              )}
              <div className="mt-4">
                <EvidenceTrail observationIds={pathway.evidenceObservationIds} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-stone">Exploration suggestion. Not a prediction.</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
