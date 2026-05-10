import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type ExtractionOutput } from "@/lib/demoAiFallback";
import { dimensionLabels } from "@/lib/demoData";

export function ObservationPreview({ preview }: { preview: ExtractionOutput }) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap gap-2">
        <Badge>{preview.setting}</Badge>
        <Badge>{dimensionLabels[preview.dimension]}</Badge>
        <Badge>{preview.confidence} confidence</Badge>
        {preview.confidence === "low" && (
          <Badge className="border-terracotta text-terracotta">
            <AlertTriangle className="mr-1 h-3 w-3" />
            needs revalidation
          </Badge>
        )}
      </div>
      <h3 className="mt-4 font-display text-2xl text-forest">Structured observation draft</h3>
      <p className="mt-2 font-medium">{preview.observedBehavior}</p>
      <p className="mt-3 text-sm text-ink-soft">{preview.context}</p>
      <div className="mt-4 rounded-md bg-sage-light/45 p-3">
        <p className="mono-label">Evidence quote</p>
        <p className="mt-1 text-sm">“{preview.evidenceQuote}”</p>
      </div>
      <label className="mt-4 block text-sm font-semibold text-forest">
        Visibility
        <select className="mt-2 w-full rounded-md border border-stone-light bg-paper px-3 py-2 text-ink">
          <option>handoff</option>
          <option>teacher</option>
          <option>doNotCarryForward</option>
        </select>
      </label>
    </Card>
  );
}

