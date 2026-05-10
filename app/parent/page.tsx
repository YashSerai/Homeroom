import { ConversationPrompts } from "@/components/parent/ConversationPrompts";
import { HomeSupportCards } from "@/components/parent/HomeSupportCards";
import { NurtureTalents } from "@/components/parent/NurtureTalents";
import { ParentSignalTimeline } from "@/components/parent/ParentSignalTimeline";
import { ParentStrengths } from "@/components/parent/ParentStrengths";

export default function ParentPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <p className="mono-label">Parent view</p>
      <h1 className="mt-3 font-display text-5xl text-forest">Maya&apos;s growth summary</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        You know Maya best. This view turns school signals into safe, useful conversation material without exposing raw teacher notes.
      </p>
      <div className="mt-8 space-y-8">
        <ParentSignalTimeline />
        <section>
          <p className="mono-label mb-3">Strengths</p>
          <ParentStrengths />
        </section>
        <section>
          <p className="mono-label mb-3">Nurture Talents</p>
          <NurtureTalents />
        </section>
        <section>
          <p className="mono-label mb-3">Conversation prompts</p>
          <ConversationPrompts />
        </section>
        <section>
          <p className="mono-label mb-3">Support at home</p>
          <HomeSupportCards />
        </section>
      </div>
    </section>
  );
}
