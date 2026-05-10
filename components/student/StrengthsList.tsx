import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EvidenceTrail } from "@/components/student/EvidenceTrail";
import { handoffSummary } from "@/lib/demoData";

export function StrengthsList() {
  return (
    <section>
      <p className="mono-label">Approved strengths</p>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        {handoffSummary.strengths.map((strength) => (
          <Card key={strength.title}>
            <CardHeader>
              <CardTitle className="text-2xl">{strength.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-ink-soft">{strength.detail}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="mono-label">{strength.evidenceCount} observations</span>
                <EvidenceTrail observationIds={strength.evidenceObservationIds} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

