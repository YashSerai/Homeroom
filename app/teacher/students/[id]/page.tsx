import { CheckCircle2, Lightbulb, PenTool, ShieldCheck } from "lucide-react";
import { type ReactNode } from "react";
import { HandoffGate } from "@/components/student/HandoffGate";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const snapshot = [
  { label: "Status", value: "Grade 11 complete · entering Grade 12" },
  { label: "Most recent courses", value: "Math, English, Science, Social Studies, Art, Woodwork" },
  { label: "Current interests", value: "Architecture, woodwork, urban photography, community spaces" },
  { label: "Recent activities", value: "Design boot camp, woodwork workshop, club volleyball, yearbook design" }
];

const strengths = [
  "Explains ideas clearly through diagrams, models, written process notes, and built objects.",
  "Shows persistence when a skill can be practiced in visible steps.",
  "Communicates more confidently when she has prepared a role or artifact to present."
];

const supports = [
  "Give a concrete planning surface: sketch, checklist, example, model, or design constraint.",
  "Ask for process explanation, not just the final answer.",
  "Use structured group roles before expecting open-ended group participation."
];

const learningMoves = [
  { title: "Start concrete", body: "Begin with a visual prompt, example, sketch, or model she can react to." },
  { title: "Prepare the role", body: "Let her know what she is responsible for before group sharing begins." },
  { title: "Ask for process", body: "Invite her to explain what she made, why she made it, and what changed." }
];

export default function StudentOverviewPage() {
  return (
    <div className="space-y-6">
      <HandoffGate />

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <p className="mono-label">Current overview</p>
          <h2 className="mt-3 font-display text-4xl text-forest">Maya Chen, at handoff</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-soft">
            Maya is finishing Grade 11 with a learner record that points to reflective visual communication. Her strongest evidence appears in design work, written reasoning, prepared explanation, and projects where she can build or organize something before presenting it.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {snapshot.map((item) => (
              <div key={item.label} className="rounded-md border border-stone-light bg-paper p-4">
                <p className="mono-label">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden border-forest text-paper-light shadow-paper" style={{ background: "var(--forest)" }}>
          <div className="border-b border-paper-light/20 p-6">
            <div className="flex items-center gap-2 text-sage-light">
              <Lightbulb className="h-5 w-5" />
              <p className="font-mono text-xs uppercase tracking-[0.1em]">Learning style</p>
            </div>
            <h2 className="mt-3 font-display text-4xl text-paper-light">Think, make, then explain</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-paper-light/90">
              Maya usually communicates most clearly after she has had something concrete to organize: a sketch, checklist, model, written plan, or object she helped build.
            </p>
          </div>
          <div className="grid gap-3 p-5">
            {learningMoves.map((move) => (
              <div key={move.title} className="rounded-md border border-paper-light/20 bg-paper-light/10 p-4">
                <h3 className="font-semibold text-paper-light">{move.title}</h3>
                <p className="mt-1 text-sm leading-6 text-paper-light/85">{move.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InfoCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          kicker="Strengths"
          title="What is working now"
          items={strengths}
        />
        <InfoCard
          icon={<ShieldCheck className="h-5 w-5" />}
          kicker="Support"
          title="What helps Maya show her thinking"
          items={supports}
        />
        <Card className="p-5">
          <div className="text-terracotta"><PenTool className="h-5 w-5" /></div>
          <p className="mono-label mt-3">Recent updates</p>
          <h2 className="mt-3 font-display text-2xl text-forest">What changed this year</h2>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Maya finished Grade 11 with strong work in English, Art, Woodwork, and Social Studies. Teachers saw her communicate more clearly when she could present a model, sketch, design choice, or written plan.
          </p>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            The newest pattern is not simply better grades. It is a clearer link between visual reasoning, prepared explanation, and interest in architecture or spatial design.
          </p>
        </Card>
      </section>
    </div>
  );
}

function InfoCard({ icon, kicker, title, items }: { icon: ReactNode; kicker: string; title: string; items: string[] }) {
  return (
    <Card className="p-5">
      <div className="text-terracotta">{icon}</div>
      <p className="mono-label mt-3">{kicker}</p>
      <h2 className="mt-3 font-display text-2xl text-forest">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-soft">
        {items.map((item) => <li key={item}>- {item}</li>)}
      </ul>
    </Card>
  );
}
