import { GpaTrendChart } from "@/components/student/GpaTrendChart";
import { GrowthMapRadar } from "@/components/student/GrowthMapRadar";
import { LearnerPortraitCard } from "@/components/student/LearnerPortraitCard";
import { PersonalityEvolutionChart } from "@/components/student/PersonalityEvolutionChart";

export default function GrowthMapPage() {
  return (
    <section className="space-y-6">
      <div className="paper-panel rounded-lg p-5">
        <div>
          <p className="mono-label">Growth Map</p>
          <h1 className="mt-2 font-display text-4xl text-forest">Maya&apos;s evidence-backed growth over time</h1>
          <p className="mt-2 max-w-3xl text-ink-soft">
            A growth map is not a label. It connects grades, teacher-approved observations, and student interests so next year&apos;s adults can see what grades alone would miss.
          </p>
        </div>
      </div>

      <GpaTrendChart />
      <GrowthMapRadar />
      <PersonalityEvolutionChart />
      <LearnerPortraitCard />
    </section>
  );
}
