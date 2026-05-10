"use client";

import { BookOpen, Globe2, Newspaper, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EvidenceTrail } from "@/components/student/EvidenceTrail";
import { useDemo } from "@/components/layout/DemoProvider";

const icons = { Newspaper, Scale, Globe2, BookOpen };

export function PathwaysGrid({ preview = false }: { preview?: boolean }) {
  const { state } = useDemo();
  const pathways = preview ? state.pathways.slice(0, 4) : state.pathways;
  return (
    <section>
      <p className="mono-label">Exploration pathways</p>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {pathways.map((pathway) => {
          const Icon = icons[pathway.icon as keyof typeof icons] ?? BookOpen;
          return (
            <Card key={pathway.id} className="p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-terracotta/12 p-2 text-terracotta"><Icon className="h-5 w-5" /></div>
                <div>
                  <Badge>Exploration suggestion. Not a prediction.</Badge>
                  <h3 className="mt-3 font-display text-2xl text-forest">{pathway.area}</h3>
                </div>
              </div>
              <p className="mt-3 text-ink-soft">{pathway.rationale}</p>
              {!preview && (
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  {pathway.explorationSteps.map((step) => <li key={step}>• {step}</li>)}
                </ul>
              )}
              <div className="mt-4">
                <EvidenceTrail observationIds={pathway.evidenceObservationIds} />
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

