"use client";

import { BookOpenCheck, ListChecks, Moon } from "lucide-react";
import { Card } from "@/components/ui/card";

const supports = [
  { icon: ListChecks, title: "Make the start visible", body: "For broad assignments, sketch a three-step launch list before diving in." },
  { icon: BookOpenCheck, title: "Let writing warm up speaking", body: "Invite Maya to jot one claim, one example, and one question before talking it through." },
  { icon: Moon, title: "Protect a reset window", body: "A quiet planning window can help her return to complex work with more precision." }
];

export function HomeSupportCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {supports.map((support) => {
        const Icon = support.icon;
        return (
          <Card key={support.title} className="flex gap-4 p-5">
            <div className="h-fit rounded-full bg-terracotta/10 p-3 text-terracotta">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-xl text-forest">{support.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{support.body}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
