import { ConflictPatternCard } from "@/components/student/ConflictPatternCard";
import { GrowthMapRadar } from "@/components/student/GrowthMapRadar";
import { HandoffGate } from "@/components/student/HandoffGate";
import { LearningStyleCard } from "@/components/student/LearningStyleCard";
import { ObserveList } from "@/components/student/ObserveList";
import { PathwaysGrid } from "@/components/student/PathwaysGrid";
import { StrengthsList } from "@/components/student/StrengthsList";

export default function StudentOverviewPage() {
  return (
    <div className="space-y-8">
      <HandoffGate />
      <StrengthsList />
      <LearningStyleCard />
      <ObserveList />
      <GrowthMapRadar compact />
      <ConflictPatternCard />
      <PathwaysGrid preview />
    </div>
  );
}

