import { BookMarked, MessagesSquare, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { handoffSummary } from "@/lib/demoData";

export function ParentStrengths() {
  const icons = [BookMarked, MessagesSquare, UsersRound];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {handoffSummary.strengths.map((strength, index) => {
        const Icon = icons[index] ?? BookMarked;
        return (
        <Card key={strength.title} className="p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage-light/60 text-forest">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-display text-2xl text-forest">{strength.title}</h3>
          <p className="mt-2 text-ink-soft">{strength.detail}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-stone">{strength.evidenceCount} school signals, parent-safe summary</p>
        </Card>
      );})}
    </div>
  );
}
