"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EvidenceTrail } from "@/components/student/EvidenceTrail";
import { useDemo } from "@/components/layout/DemoProvider";
import { dimensionLabels, getTeacherName } from "@/lib/demoData";
import { type Observation, type RawNote } from "@/lib/types";

type FilterState = {
  year: string;
  subject: string;
  teacher: string;
  confidence: string;
  signal: string;
  visibility: string;
  search: string;
};

const initialFilters: FilterState = {
  year: "all",
  subject: "all",
  teacher: "all",
  confidence: "all",
  signal: "all",
  visibility: "all",
  search: ""
};

export default function NotesPage() {
  const { state } = useDemo();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const rows = useMemo(() => {
    return state.rawNotes
      .map((note) => ({ note, observation: state.observations.find((item) => item.sourceNoteId === note.id) }))
      .filter(({ note, observation }) => matchesFilters(note, observation, filters))
      .sort((a, b) => b.note.createdAt - a.note.createdAt);
  }, [filters, state.observations, state.rawNotes]);

  const options = useMemo(() => ({
    years: ["all", ...unique(state.rawNotes.map((note) => String(note.grade)))],
    subjects: ["all", ...unique(state.rawNotes.map((note) => note.subject).filter(Boolean) as string[])],
    teachers: ["all", ...state.teachers.map((teacher) => teacher.id)],
    confidence: ["all", "low", "medium", "high"],
    signal: ["all", "current", "historical", "stale", "contradicted", "revalidated"],
    visibility: ["all", "teacher", "handoff", "parent", "student", "counselor", "doNotCarryForward"]
  }), [state.rawNotes, state.teachers]);

  const activeChips = activeFilters(filters, state.teachers);

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="mono-label">03 · Evidence</p>
            <h1 className="mt-2 font-display text-3xl text-forest">Observation record</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
              Raw teacher language stays visible as evidence. Homeroom only carries forward structured observations that describe what was seen, where it happened, and how confident the teacher should be.
            </p>
          </div>
          <Button variant="secondary" onClick={() => setFilters(initialFilters)} disabled={activeChips.length === 0}>
            <X className="h-4 w-4" />
            Clear filters
          </Button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <Filter label="Year / grade" value={filters.year} onChange={(year) => setFilters((current) => ({ ...current, year }))} options={options.years} />
          <Filter label="Subject" value={filters.subject} onChange={(subject) => setFilters((current) => ({ ...current, subject }))} options={options.subjects} />
          <Filter
            label="Teacher"
            value={filters.teacher}
            onChange={(teacher) => setFilters((current) => ({ ...current, teacher }))}
            options={options.teachers}
            renderOption={(value) => value === "all" ? "all" : getTeacherName(value)}
          />
          <Filter label="Confidence" value={filters.confidence} onChange={(confidence) => setFilters((current) => ({ ...current, confidence }))} options={options.confidence} />
          <Filter label="Signal state" value={filters.signal} onChange={(signal) => setFilters((current) => ({ ...current, signal }))} options={options.signal} />
          <Filter label="Visibility" value={filters.visibility} onChange={(visibility) => setFilters((current) => ({ ...current, visibility }))} options={options.visibility} />
        </div>

        <label className="mt-4 block text-sm font-semibold text-forest">
          Search text
          <span className="mt-2 flex items-center gap-2 rounded-md border border-stone-light bg-paper-light px-3 py-2">
            <Search className="h-4 w-4 text-stone" />
            <input
              value={filters.search}
              onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
              className="w-full bg-transparent text-ink outline-none"
              placeholder="Search raw notes, observations, setting, or evidence"
            />
          </span>
        </label>

        {activeChips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeChips.map((chip) => <Badge key={chip}>{chip}</Badge>)}
          </div>
        )}
      </Card>

      {rows.length === 0 ? (
        <Card className="p-8 text-center">
          <h2 className="font-display text-3xl text-forest">No observations match these filters.</h2>
          <p className="mt-2 text-ink-soft">Clear filters to see Maya&apos;s full record.</p>
          <Button className="mt-5" variant="secondary" onClick={() => setFilters(initialFilters)}>Clear filters</Button>
        </Card>
      ) : (
        <section className="grid gap-4">
          {rows.map(({ note, observation }) => (
            <ObservationNoteCard key={note.id} note={note} observation={observation} />
          ))}
        </section>
      )}
    </div>
  );
}

function ObservationNoteCard({ note, observation }: { note: RawNote; observation?: Observation }) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap gap-2">
        <Badge>Grade {note.grade}</Badge>
        {note.subject && <Badge>{note.subject}</Badge>}
        {note.setting && <Badge>{note.setting}</Badge>}
        {observation && <Badge>{observation.confidence} confidence</Badge>}
        {observation && <Badge>{observation.signal}</Badge>}
        {observation && <Badge>{observation.visibility}</Badge>}
        {note.containsBannedLabel && <Badge className="border-terracotta text-terracotta">raw label · not saved as trait</Badge>}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-md border border-stone-light bg-paper p-4">
          <p className="mono-label">Raw teacher note</p>
          <p className="mt-2 text-ink-soft">&quot;{note.rawText}&quot;</p>
          <p className="mt-3 text-sm text-stone">{getTeacherName(note.teacherId)} · {note.subject ?? "Home"} · {note.setting ?? "Context note"}</p>
        </div>
        <div className="rounded-md border border-sage-light bg-sage-light/25 p-4">
          <p className="mono-label">Structured observation</p>
          {observation ? (
            <>
              <p className="mt-2 font-medium text-ink">{observation.observedBehavior}</p>
              <p className="mt-2 text-sm text-ink-soft">{observation.context}</p>
              <p className="mt-3 text-sm text-stone">
                {dimensionLabels[observation.dimension]} · Evidence: &quot;{observation.evidenceQuote}&quot;
              </p>
              <div className="mt-3">
                <EvidenceTrail observationIds={[observation.id]} />
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm text-ink-soft">No teacher-approved learner observation has been saved from this note.</p>
          )}
        </div>
      </div>
    </Card>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
  renderOption = (option) => option
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  renderOption?: (value: string) => string;
}) {
  return (
    <label className="text-sm font-semibold text-forest">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border border-stone-light bg-paper-light px-3 py-2 text-ink">
        {options.map((option) => <option key={option} value={option}>{renderOption(option)}</option>)}
      </select>
    </label>
  );
}

function matchesFilters(note: RawNote, observation: Observation | undefined, filters: FilterState) {
  const text = [note.rawText, note.subject, note.setting, observation?.observedBehavior, observation?.context, observation?.evidenceQuote].join(" ").toLowerCase();
  return (
    (filters.year === "all" || String(note.grade) === filters.year) &&
    (filters.subject === "all" || note.subject === filters.subject) &&
    (filters.teacher === "all" || note.teacherId === filters.teacher || observation?.teacherId === filters.teacher) &&
    (filters.confidence === "all" || observation?.confidence === filters.confidence) &&
    (filters.signal === "all" || observation?.signal === filters.signal) &&
    (filters.visibility === "all" || observation?.visibility === filters.visibility) &&
    (!filters.search.trim() || text.includes(filters.search.trim().toLowerCase()))
  );
}

function activeFilters(filters: FilterState, teachers: { id: string; name: string }[]) {
  return Object.entries(filters)
    .filter(([, value]) => value && value !== "all")
    .map(([key, value]) => {
      if (key === "teacher") return `Teacher: ${teachers.find((teacher) => teacher.id === value)?.name ?? value}`;
      if (key === "search") return `Search: ${value}`;
      return `${labelFor(key)}: ${value}`;
    });
}

function labelFor(key: string) {
  return key === "year" ? "Grade" : key === "signal" ? "Signal state" : key[0].toUpperCase() + key.slice(1);
}

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}
