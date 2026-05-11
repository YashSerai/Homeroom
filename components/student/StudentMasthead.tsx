"use client";

import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChatbotSheet } from "@/components/chatbot/ChatbotSheet";
import { useDemo } from "@/components/layout/DemoProvider";

export function StudentMasthead() {
  const { state } = useDemo();
  const student = state.students[0];
  return (
    <section className="rounded-lg border border-stone-light bg-forest px-6 py-7 text-paper-light shadow-paper">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-sage-light">Learner record · Grade 11 complete · entering Grade 12</p>
          <h1 className="mt-3 font-display text-6xl leading-none">{student.name}.</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="border-sage bg-sage-light text-forest">learner portrait: {student.personalityType}</Badge>
            <Badge className="border-sage bg-transparent text-sage-light">5 years on record</Badge>
            {student.classes.map((className) => (
              <Badge key={className} className="border-sage bg-transparent text-sage-light">
                {className}
              </Badge>
            ))}
          </div>
        </div>
        <ChatbotSheet>
          <Button variant="terracotta" size="lg">
            <Plus className="h-4 w-4" />
            Add observation
          </Button>
        </ChatbotSheet>
      </div>
    </section>
  );
}

