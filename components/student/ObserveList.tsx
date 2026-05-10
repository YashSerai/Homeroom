import { Card } from "@/components/ui/card";
import { handoffSummary } from "@/lib/demoData";

export function ObserveList() {
  return (
    <section>
      <p className="mono-label">Things to observe</p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {handoffSummary.thingsToObserve.map((item) => (
          <Card key={item} className="p-4">
            <p className="font-display text-xl text-forest">{item}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

