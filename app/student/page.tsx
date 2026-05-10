"use client";

import { BookOpen, Camera, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PersonalityCard } from "@/components/student-self/PersonalityCard";
import { InterestsEditor } from "@/components/student-self/InterestsEditor";
import { useDemo } from "@/components/layout/DemoProvider";

export default function StudentPage() {
  const { state } = useDemo();
  const student = state.students[0];
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <p className="mono-label">Student view</p>
      <h1 className="mt-3 font-display text-6xl text-forest">Hi Maya</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">This is your safe profile space: interests, books, activities, and the learner portrait you can keep shaping.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <PersonalityCard />
          <InterestsEditor />
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 text-forest"><BookOpen className="h-5 w-5" /><h2 className="font-display text-3xl">Recent books</h2></div>
            <div className="mt-4 flex flex-wrap gap-2">{student.recentBooks.map((book) => <Badge key={book}>{book}</Badge>)}</div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 text-forest"><Users className="h-5 w-5" /><h2 className="font-display text-3xl">Activities</h2></div>
            <div className="mt-4 flex flex-wrap gap-2">{student.extracurriculars.map((activity) => <Badge key={activity}>{activity}</Badge>)}</div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 text-forest"><Camera className="h-5 w-5" /><h2 className="font-display text-3xl">Current sparks</h2></div>
            <p className="mt-3 text-ink-soft">Graphic novels, city photography, debate prep, and buildings with stories behind them.</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

