"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const traits = [
  ["Openness", "Curiosity, imagination, and interest in ideas or experiences. For learning, this can show up as connecting books, images, cities, and fairness questions."],
  ["Conscientiousness", "Planning, follow-through, and care with details. For learning, this can show up as checklists, source logs, and strong revision habits."],
  ["Expressive energy", "How easily someone shares energy outward. This reflection separates prepared voice from on-the-spot visibility."],
  ["Collaboration", "How someone works with others, listens, and supports shared goals."],
  ["Stress signals", "How strongly pressure is felt and what recovery supports help. This is not a diagnosis."]
];

export function TraitLearnMoreDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">Learn about the reflection</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="font-display text-3xl text-forest">Student-owned learner reflection</h2>
        <p className="mt-2 text-sm text-ink-soft">This is a student-owned reflection, not a permanent identity label.</p>
        <div className="mt-5 space-y-4">
          {traits.map(([title, body]) => (
            <div key={title} className="rounded-md border border-stone-light bg-paper p-3">
              <h3 className="font-semibold text-forest">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
