"use client";

import { LockKeyhole, UnlockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDemo } from "@/components/layout/DemoProvider";

export function HandoffGate() {
  const { state, revealHandoff } = useDemo();
  return (
    <Card className="p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Badge>{state.handoffRevealed ? "handoff unlocked" : "fresh-start gate"}</Badge>
          <h2 className="mt-3 font-display text-3xl text-forest">Fresh-start briefing</h2>
          <p className="mt-2 max-w-3xl text-ink-soft">
            New teachers begin with grades, strengths, learning style, and things to observe. Growth concerns unlock only after they add their own first observation.
          </p>
        </div>
        <Button variant={state.handoffRevealed ? "secondary" : "default"} onClick={revealHandoff}>
          {state.handoffRevealed ? <UnlockKeyhole className="h-4 w-4" /> : <LockKeyhole className="h-4 w-4" />}
          Demo reveal
        </Button>
      </div>
    </Card>
  );
}

