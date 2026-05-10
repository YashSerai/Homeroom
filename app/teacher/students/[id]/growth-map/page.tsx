"use client";

import { useMemo, useState } from "react";
import { CompetencyChart } from "@/components/student/CompetencyChart";
import { GpaTrendChart } from "@/components/student/GpaTrendChart";
import { GrowthMapRadar } from "@/components/student/GrowthMapRadar";
import { PersonalityEvolutionChart } from "@/components/student/PersonalityEvolutionChart";
import { SubjectTrendChart } from "@/components/student/SubjectTrendChart";
import { YearScrubber } from "@/components/student/YearScrubber";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/components/layout/DemoProvider";

export default function GrowthMapPage() {
  const { state } = useDemo();
  const [grade, setGrade] = useState(11);
  const [subject, setSubject] = useState("All");
  const [layer, setLayer] = useState("competencies");
  const subjects = useMemo(
    () => ["All", ...Array.from(new Set(state.subjectPerformance.filter((item) => item.grade === grade && item.numericAverage > 0).map((item) => item.subject)))],
    [grade, state.subjectPerformance]
  );

  return (
    <section className="space-y-5">
      <div className="paper-panel rounded-lg p-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="mono-label">Layered Growth Map</p>
            <h1 className="mt-2 font-display text-4xl text-forest">Evidence, curriculum, grades, and learner reflection</h1>
            <p className="mt-2 max-w-3xl text-ink-soft">
              Grades show performance context. Homeroom adds evidence-backed growth signals, competency layers, and student-owned reflection.
            </p>
          </div>
          <YearScrubber grade={grade} onGrade={setGrade} />
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 border-b border-stone-light pb-3">
          {[
            ["competencies", "Core Competencies"],
            ["subjects", "Subjects"],
            ["grades", "Grades/GPA"],
            ["reflection", "Learner Reflection"]
          ].map(([value, label]) => (
            <Button key={value} size="sm" variant={layer === value ? "default" : "secondary"} onClick={() => setLayer(value)}>
              {label}
            </Button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {subjects.map((item) => (
            <Button key={item} size="sm" variant={subject === item ? "default" : "secondary"} onClick={() => setSubject(item)}>
              {item}
            </Button>
          ))}
        </div>
        {layer === "competencies" && (
          <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <GrowthMapRadar selectedGrade={grade} />
            <CompetencyChart grade={grade} subject={subject} />
          </div>
        )}
        {layer === "subjects" && (
          <SubjectTrendChart grade={grade} subject={subject} />
        )}
        {layer === "grades" && (
          <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <GpaTrendChart />
            <SubjectTrendChart grade={grade} subject="All" />
          </div>
        )}
        {layer === "reflection" && (
          <PersonalityEvolutionChart />
        )}
      </div>
    </section>
  );
}
