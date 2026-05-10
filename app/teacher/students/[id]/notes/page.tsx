"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ObservationCard } from "@/components/student/ObservationCard";
import { useDemo } from "@/components/layout/DemoProvider";
import { getTeacherName } from "@/lib/demoData";

export default function NotesPage() {
  const { state } = useDemo();
  const [year, setYear] = useState("all");
  const [subject, setSubject] = useState("all");
  const [confidence, setConfidence] = useState("all");
  const observations = useMemo(
    () =>
      state.observations.filter(
        (observation) =>
          (year === "all" || String(observation.grade) === year) &&
          (subject === "all" || observation.subject === subject) &&
          (confidence === "all" || observation.confidence === confidence)
      ),
    [state.observations, year, subject, confidence]
  );
  const notes = state.rawNotes.filter((note) => year === "all" || String(note.grade) === year);

  return (
    <div className="space-y-6">
      <Card className="grid gap-3 p-4 md:grid-cols-4">
        <Filter label="Year" value={year} onChange={setYear} options={["all", "8", "9", "10", "11"]} />
        <Filter label="Subject" value={subject} onChange={setSubject} options={["all", "Math", "English", "History", "Biology", "Design", "AP English", "Civics"]} />
        <Filter label="Teacher" value="all" onChange={() => undefined} options={["all", "Demo teachers"]} />
        <Filter label="Confidence" value={confidence} onChange={setConfidence} options={["all", "low", "medium", "high"]} />
      </Card>
      <section>
        <p className="mono-label">Raw notes</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {notes.map((note) => (
            <Card key={note.id} className="p-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Grade {note.grade}</Badge>
                <Badge>{note.subject}</Badge>
                {note.containsBannedLabel && <Badge className="border-terracotta text-terracotta">{note.labelWarning}</Badge>}
              </div>
              <p className="mt-3 text-ink-soft">“{note.rawText}”</p>
              <p className="mt-3 text-sm text-stone">{getTeacherName(note.teacherId)}</p>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <p className="mono-label">Structured observations</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {observations.map((observation) => <ObservationCard key={observation.id} observation={observation} />)}
        </div>
      </section>
    </div>
  );
}

function Filter({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="text-sm font-semibold text-forest">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border border-stone-light bg-paper-light px-3 py-2 text-ink">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

