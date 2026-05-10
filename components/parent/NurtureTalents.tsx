"use client";

import { ClipboardCheck, MessageSquareText, PenLine } from "lucide-react";
import { Card } from "@/components/ui/card";

const talents = [
  {
    title: "Prepared voice",
    icon: MessageSquareText,
    copy: "Maya is already building a strong prepared speaking voice. Her effort compounds when she can draft a claim or hold a clear role before discussion.",
    tryThis: "Ask: What point would you want ready before tomorrow?"
  },
  {
    title: "Project launch clarity",
    icon: ClipboardCheck,
    copy: "Open-ended projects land better when Maya can see the first step, a strong example, and a short checklist.",
    tryThis: "Try making the first three moves visible before she begins."
  },
  {
    title: "Evidence-to-argument bridge",
    icon: PenLine,
    copy: "Maya is good at noticing meaningful evidence. The next lift is turning that evidence into a concise claim sooner.",
    tryThis: "Ask: What does this example prove, and what might someone push back on?"
  }
];

export function NurtureTalents() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {talents.map((talent) => {
        const Icon = talent.icon;
        return (
          <Card key={talent.title} className="relative overflow-hidden p-5">
            <div className="absolute right-4 top-4 rounded-full bg-sage-light/50 p-3 text-forest">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mono-label">Where effort compounds</p>
            <h3 className="mt-8 font-display text-2xl text-forest">{talent.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{talent.copy}</p>
            <div className="mt-4 rounded-md border border-stone-light bg-paper px-3 py-2 text-sm text-forest">
              <span className="font-semibold">Try this tonight:</span> {talent.tryThis}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
