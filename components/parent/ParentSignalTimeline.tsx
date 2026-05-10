import { CheckCircle2 } from "lucide-react";

const steps = [
  "Teacher logs an evidence-backed observation.",
  "Homeroom removes labels and keeps the source attached.",
  "Only parent-safe themes become home conversation material."
];

export function ParentSignalTimeline() {
  return (
    <div className="rounded-lg border border-stone-light bg-forest p-5 text-paper-light">
      <p className="mono-label text-sage-light">School-to-home signal</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step} className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-light text-forest">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-sage-light">Step {index + 1}</p>
              <p className="mt-1 text-sm leading-6">{step}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
