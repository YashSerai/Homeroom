import { CheckCircle2, ChevronDown, Eye, ShieldAlert } from "lucide-react";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { currentHandoff, yearlyHandoffs } from "@/lib/handoffData";

export default function HandoffPage() {
  return (
    <section className="space-y-6">
      <div className="paper-panel rounded-lg p-5">
        <p className="mono-label">01 · Fresh-start handoff</p>
        <h1 className="mt-2 font-display text-4xl text-forest">Maya&apos;s handoff record</h1>
        <p className="mt-2 max-w-3xl text-ink-soft">
          A teacher-approved summary of what should travel with Maya, what should be revalidated, and what earlier adults learned as new evidence arrived.
        </p>
      </div>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <Badge>handoff if shared today</Badge>
          <h2 className="mt-3 font-display text-4xl text-forest">{currentHandoff.title}</h2>
          <p className="mt-2 text-sm text-stone">{currentHandoff.subtitle}</p>
          <div className="mt-5 rounded-lg border border-stone-light bg-paper p-4">
            <p className="mono-label">Learner portrait</p>
            <h3 className="mt-2 font-display text-2xl text-forest">{currentHandoff.portrait}</h3>
            <p className="mt-3 leading-7 text-ink-soft">{currentHandoff.summary}</p>
          </div>
        </Card>

        <div className="grid gap-4">
          <ActionList icon={<CheckCircle2 className="h-5 w-5" />} title="Carry forward" items={currentHandoff.doCarryForward} />
          <ActionList icon={<ShieldAlert className="h-5 w-5" />} title="Keep in mind" items={currentHandoff.dontCarryForward} />
        </div>
      </section>

      <Card className="p-5">
        <div className="flex items-start gap-3">
          <Eye className="mt-1 h-5 w-5 text-terracotta" />
          <div>
            <p className="mono-label">02 · Growth signals</p>
            <h2 className="mt-2 font-display text-3xl text-forest">What to revalidate next</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {currentHandoff.revalidate.map((item) => (
                <div key={item} className="rounded-md border border-stone-light bg-paper p-4 text-sm leading-6 text-ink-soft">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <section>
        <p className="mono-label">03 · Evidence</p>
        <h2 className="mt-2 font-display text-4xl text-forest">Handoff over the years</h2>
        <p className="mt-2 max-w-3xl text-ink-soft">
          Homeroom keeps the human story intact as new evidence arrives. Each yearly handoff shows what teachers saw, what Homeroom carried forward, and what adults tried next.
        </p>
        <div className="mt-5 space-y-5">
          {yearlyHandoffs.map((handoff, index) => (
            <details key={handoff.period} className="group paper-panel rounded-lg" open={index === 0}>
              <summary className="flex cursor-pointer list-none flex-col justify-between gap-4 p-5 marker:hidden md:flex-row md:items-center">
                <div>
                  <Badge>{handoff.period}</Badge>
                  <h3 className="mt-3 font-display text-3xl text-forest">{handoff.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-stone">{handoff.gradeContext}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-terracotta">
                  <span className="group-open:hidden">Expand</span>
                  <span className="hidden group-open:inline">Collapse</span>
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </div>
              </summary>

              <div className="border-t border-stone-light px-5 pb-5 pt-4">
                <div className="grid gap-4 lg:grid-cols-3">
                  <NarrativeBlock label="What teachers said" body={handoff.whatWasSaid} />
                  <NarrativeBlock label="Homeroom handoff" body={handoff.homeroomHandoff} highlight />
                  <NarrativeBlock label="Family / school action" body={handoff.familyAction} />
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
                  <div className="rounded-md border border-stone-light bg-paper p-4">
                    <p className="mono-label">Support moves</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
                      {handoff.supportMoves.map((item) => <li key={item}>- {item}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-md border border-stone-light bg-paper p-4">
                    <p className="mono-label">Evidence used</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
                      {handoff.evidence.map((item) => <li key={item}>- {item}</li>)}
                    </ul>
                    <p className="mt-4 rounded-md bg-sage-light/35 p-3 text-sm text-forest">{handoff.grades}</p>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </section>
  );
}

function ActionList({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-terracotta">
        {icon}
        <h3 className="font-display text-2xl text-forest">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-soft">
        {items.map((item) => <li key={item}>- {item}</li>)}
      </ul>
    </Card>
  );
}

function NarrativeBlock({ label, body, highlight = false }: { label: string; body: string; highlight?: boolean }) {
  return (
    <div className={highlight ? "rounded-md border border-sage bg-sage-light/35 p-4" : "rounded-md border border-stone-light bg-paper p-4"}>
      <p className="mono-label">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{body}</p>
    </div>
  );
}
