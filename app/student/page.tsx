"use client";

import { useState } from "react";
import { type ReactNode } from "react";
import { BookOpen, Camera, Save, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PersonalityCard } from "@/components/student-self/PersonalityCard";
import { InterestsEditor } from "@/components/student-self/InterestsEditor";
import { useDemo } from "@/components/layout/DemoProvider";

export default function StudentPage() {
  const { state } = useDemo();
  const student = state.students[0];
  const [books, setBooks] = useState(student.recentBooks);
  const [activities, setActivities] = useState(student.extracurriculars);
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <p className="mono-label">Student view</p>
      <h1 className="mt-3 font-display text-6xl text-forest">Hi Maya</h1>
      <p className="mt-3 max-w-3xl text-ink-soft">
        This is your space. You can update what you care about, what you&apos;re reading, and what kinds of projects help you show your best work.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <PersonalityCard />
          <Card className="p-6">
            <div className="flex items-center gap-2 text-forest"><Camera className="h-5 w-5" /><h2 className="font-display text-3xl">Current sparks</h2></div>
            <p className="mt-3 text-ink-soft">Graphic novels, city photography, design sketches, and buildings with stories behind them.</p>
          </Card>
        </div>
        <div className="space-y-6">
          <InterestsEditor />
          <EditableListCard
            icon={<BookOpen className="h-5 w-5" />}
            title="Recent books"
            helper="Add books, articles, or stories that are staying with you."
            items={books}
            onSave={setBooks}
          />
          <EditableListCard
            icon={<Users className="h-5 w-5" />}
            title="Activities"
            helper="Update clubs, teams, workshops, or projects you want teachers to know about."
            items={activities}
            onSave={setActivities}
          />
        </div>
      </div>
    </section>
  );
}

function EditableListCard({
  icon,
  title,
  helper,
  items,
  onSave
}: {
  icon: ReactNode;
  title: string;
  helper: string;
  items: string[];
  onSave: (items: string[]) => void;
}) {
  const [text, setText] = useState(items.join(", "));

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 text-forest">
        {icon}
        <h2 className="font-display text-3xl">{title}</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{helper}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => <Badge key={item}>{item}</Badge>)}
      </div>
      <label className="mt-5 block text-sm font-semibold text-forest">
        Edit list
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="mt-2 min-h-24 w-full rounded-md border border-stone-light bg-paper px-3 py-2 text-ink outline-none focus:border-terracotta"
        />
      </label>
      <Button className="mt-4" onClick={() => onSave(text.split(",").map((item) => item.trim()).filter(Boolean))}>
        <Save className="h-4 w-4" />
        Save {title.toLowerCase()}
      </Button>
    </Card>
  );
}

