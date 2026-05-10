import { Card } from "@/components/ui/card";

const rows = [
  { title: "How this may help me learn", body: "I learn well when I can connect a topic to meaning, images, people, or fairness questions." },
  { title: "Try this", body: "Before a discussion, write one claim, one piece of evidence, and one question I would be willing to share." },
  { title: "When pressure rises", body: "A short plan, a clear example, and a little time to organize my first move help me restart." }
];

export function LearnerReflectionSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {rows.map((row) => (
        <Card key={row.title} className="p-4">
          <p className="mono-label">{row.title}</p>
          <p className="mt-3 text-sm leading-6 text-ink-soft">{row.body}</p>
        </Card>
      ))}
    </div>
  );
}
