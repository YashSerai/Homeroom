import { CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const strengths = [
  {
    title: "Visual explanation",
    summary: "Maya often makes her thinking clearer through diagrams, sketches, sequencing, and visual examples.",
    evidence: "4 teacher-approved observations",
    question: "What did you draw, build, or notice visually this week?"
  },
  {
    title: "Prepared communication",
    summary: "Teachers see stronger communication when Maya can write first, rehearse a role, or prepare a visual explanation.",
    evidence: "5 teacher-approved observations",
    question: "Is there a presentation or discussion you want time to plan for?"
  },
  {
    title: "Project/design thinking",
    summary: "Maya sustains complex projects by organizing sources, clarifying audience goals, and thinking carefully about layout or structure.",
    evidence: "4 teacher-approved observations",
    question: "What kind of project would let you show your ideas best?"
  }
];

const supportAreas = [
  {
    title: "Spontaneous full-class participation",
    observed: "Maya may contribute less when asked to answer without preparation in front of the full class.",
    helps: "Teachers have seen stronger communication when she can write first, use visuals, or prepare a role ahead of time.",
    avoid: "Avoid treating low full-class visibility as low understanding.",
    meta: "medium confidence · current"
  },
  {
    title: "Confidence when called on without preparation",
    observed: "Cold-call moments can make Maya's thinking less visible, even when later written responses are precise.",
    helps: "A short think-write-share step or recurring prepared opener helps her enter the conversation.",
    avoid: "Avoid making participation feel punitive or like a public test of confidence.",
    meta: "medium confidence · revalidated"
  },
  {
    title: "Rote memorization-heavy units",
    observed: "When work feels disconnected from examples or models, Maya benefits from a checklist and one strong sample.",
    helps: "Concrete models, visual organizers, and clear first steps help her get started.",
    avoid: "Avoid vague project launches without criteria or examples.",
    meta: "medium confidence · parent context"
  }
];

const talents = [
  {
    title: "Architecture / spatial design",
    summary: "Maya's design camp, woodwork, visual reasoning, and interest in built environments make this a promising area to keep exploring.",
    action: "Look for one youth design challenge, architecture workshop, or community-space project."
  },
  {
    title: "Visual storytelling",
    summary: "Urban photography, yearbook design, and diagram-based explanation all give Maya ways to communicate ideas visually.",
    action: "Encourage a small portfolio with sketches, photos, models, and short reflections."
  },
  {
    title: "Prepared leadership",
    summary: "Maya has shown stronger confidence when she can prepare a role and explain something she helped create.",
    action: "Ask teachers about presentation roles connected to design, models, or project process."
  }
];

export default function ParentPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <p className="mono-label">Parent view</p>
      <h1 className="mt-3 font-display text-5xl text-forest">Maya&apos;s growth snapshot</h1>
      <p className="mt-3 max-w-3xl text-ink-soft">
        A parent-safe summary of what teachers are seeing this year. Private teacher drafts stay out of this view, and the summary stays focused on support.
      </p>

      <div className="mt-8 space-y-8">
        <section>
          <p className="mono-label mb-3">Strengths</p>
          <div className="grid gap-4 md:grid-cols-3">
            {strengths.map((strength) => (
              <Card key={strength.title} className="p-5">
                <Badge>{strength.evidence}</Badge>
                <h2 className="mt-3 font-display text-2xl text-forest">{strength.title}</h2>
                <p className="mt-3 text-ink-soft">{strength.summary}</p>
                <p className="mt-4 rounded-md bg-sage-light/35 p-3 text-sm text-forest">{strength.question}</p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <p className="mono-label mb-3">Weaknesses</p>
          <h2 className="font-display text-4xl text-forest">Areas to support</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {supportAreas.map((area) => (
              <Card key={area.title} className="p-5">
                <Badge>{area.meta}</Badge>
                <h3 className="mt-3 font-display text-2xl text-forest">{area.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft"><strong className="text-forest">What teachers observed:</strong> {area.observed}</p>
                <p className="mt-3 text-sm leading-6 text-ink-soft"><strong className="text-forest">What seems to help:</strong> {area.helps}</p>
                <p className="mt-3 text-sm leading-6 text-ink-soft"><strong className="text-forest">What to avoid:</strong> {area.avoid}</p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <p className="mono-label mb-3">Talents to nurture</p>
          <div className="grid gap-4 lg:grid-cols-3">
            {talents.map((talent) => (
              <Card key={talent.title} className="p-5">
                <h2 className="font-display text-2xl text-forest">{talent.title}</h2>
                <p className="mt-3 text-ink-soft">{talent.summary}</p>
                <p className="mt-4 rounded-md bg-sage-light/35 p-3 text-sm text-forest">{talent.action}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-forest p-6 text-paper-light shadow-paper">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-sage-light">Next meeting</p>
          <h2 className="mt-3 font-display text-4xl">Next parent-teacher meeting</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <MeetingList
              icon={<MessageCircle className="h-5 w-5" />}
              title="Discussion points"
              items={[
                "How can we keep giving Maya prepared speaking opportunities without forcing cold-call participation?",
                "Are there design, architecture, or visual communication opportunities available this term?",
                "What classroom settings are helping Maya communicate most clearly?"
              ]}
            />
            <MeetingList
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Questions to ask"
              items={[
                "Where are you seeing Maya explain ideas most confidently?",
                "Are there upcoming projects where she can use diagrams, models, or visual presentations?",
                "What would help her build confidence in spontaneous speaking without making it feel punitive?"
              ]}
            />
            <MeetingList
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Actions to align on"
              items={[
                "Teacher: offer one prepared visual explanation role this month.",
                "Parent: help Maya find one architecture/design competition or workshop to explore."
              ]}
            />
          </div>
        </section>

        <Card className="p-5">
          <p className="font-semibold text-forest">Parent safety note</p>
          <p className="mt-2 text-ink-soft">Homeroom summarizes teacher-approved patterns. It does not show raw notes or make decisions for Maya.</p>
        </Card>
      </div>
    </section>
  );
}

function MeetingList({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sage-light">
        {icon}
        <h3 className="font-semibold text-paper-light">{title}</h3>
      </div>
      <ul className="mt-3 space-y-3 text-sm leading-6 text-sage-light">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
