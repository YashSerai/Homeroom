"use client";

import { Card } from "@/components/ui/card";
import { useDemo } from "@/components/layout/DemoProvider";

export function ConversationPrompts() {
  const { state } = useDemo();
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {state.conversationPrompts.map((prompt) => (
        <Card key={prompt.id} className="p-5">
          <p className="font-display text-2xl text-forest">“{prompt.prompt}”</p>
        </Card>
      ))}
    </div>
  );
}

