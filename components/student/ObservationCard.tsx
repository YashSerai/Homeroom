import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getTeacherName } from "@/lib/demoData";
import { type Observation } from "@/lib/types";

export function ObservationCard({ observation }: { observation: Observation }) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap gap-2">
        <Badge>{observation.signal}</Badge>
        <Badge>{observation.confidence}</Badge>
        {observation.needsRevalidation && <Badge className="border-terracotta text-terracotta">needs revalidation</Badge>}
      </div>
      <p className="mt-3 font-medium text-ink">{observation.observedBehavior}</p>
      <p className="mt-2 text-sm text-ink-soft">{observation.context}</p>
      <p className="mt-3 text-sm text-stone">Evidence: &quot;{observation.evidenceQuote}&quot; · {getTeacherName(observation.teacherId)}</p>
    </Card>
  );
}

