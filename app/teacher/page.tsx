"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useDemo } from "@/components/layout/DemoProvider";

export default function TeacherRosterPage() {
  const { state } = useDemo();
  const student = state.students[0];
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <p className="mono-label">Teacher workspace</p>
      <h1 className="mt-3 font-display text-5xl text-forest">Classroom roster</h1>
      <p className="mt-3 max-w-3xl text-ink-soft">
        Start with a fresh-start briefing: teacher-approved observations, evidence trails, and support strategies that help Maya&apos;s next teacher see growth over time.
      </p>
      <Card className="mt-8 overflow-hidden">
        <div className="grid grid-cols-[1.5fr_0.7fr_1fr_0.8fr_40px] border-b border-stone-light px-5 py-3 mono-label">
          <span>Name</span><span>Grade</span><span>Last observation</span><span>Status</span><span />
        </div>
        <Link href="/teacher/students/maya" className="grid grid-cols-[1.5fr_0.7fr_1fr_0.8fr_40px] items-center px-5 py-5 hover:bg-sage-light/30">
          <span className="font-display text-2xl text-forest">{student.name}</span>
          <span>Grade 11 · entering Grade 12</span>
          <span className="text-sm text-ink-soft">Prepared visual explanation · current</span>
          <span><Badge>ready for handoff</Badge></span>
          <ArrowRight className="h-4 w-4 text-terracotta" />
        </Link>
      </Card>
    </section>
  );
}

