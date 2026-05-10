import { Check, MinusCircle } from "lucide-react";
import { handoffSummary } from "@/lib/demoData";

export function LearningStyleCard() {
  const style = handoffSummary.learningStyle;
  return (
    <section className="rounded-lg bg-forest p-6 text-paper-light shadow-paper">
      <p className="font-mono text-xs uppercase tracking-[0.1em] text-sage-light">Learning style</p>
      <h2 className="mt-3 font-display text-4xl">{style.type}</h2>
      <p className="mt-3 max-w-3xl text-sage-light">{style.detail}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">Works well</h3>
          <ul className="mt-3 space-y-2">
            {style.worksWell.map((item) => (
              <li key={item} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 text-sage-light" />{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Avoid carrying forward</h3>
          <ul className="mt-3 space-y-2">
            {style.avoid.map((item) => (
              <li key={item} className="flex gap-2 text-sm"><MinusCircle className="mt-0.5 h-4 w-4 text-sage-light" />{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

