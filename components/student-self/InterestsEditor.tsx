"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDemo } from "@/components/layout/DemoProvider";

export function InterestsEditor() {
  const { state, updateInterests } = useDemo();
  const [text, setText] = useState(state.students[0].interests.join(", "));
  return (
    <Card className="p-6">
      <h2 className="font-display text-3xl text-forest">Interests</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {state.students[0].interests.map((interest) => <Badge key={interest}>{interest}</Badge>)}
      </div>
      <label className="mt-5 block text-sm font-semibold text-forest">
        Edit what feels current
        <input value={text} onChange={(event) => setText(event.target.value)} className="mt-2 w-full rounded-md border border-stone-light bg-paper px-3 py-2 text-ink" />
      </label>
      <Button className="mt-4" onClick={() => updateInterests(text.split(",").map((item) => item.trim()).filter(Boolean))}>
        <Save className="h-4 w-4" />
        Save interests
      </Button>
    </Card>
  );
}

