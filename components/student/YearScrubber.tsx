"use client";

import { cn } from "@/lib/utils";

export function YearScrubber({ grade, onGrade }: { grade: number; onGrade: (grade: number) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {[8, 9, 10, 11].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onGrade(item)}
          className={cn(
            "rounded-md border px-3 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors",
            grade === item ? "border-forest bg-forest text-paper-light" : "border-stone-light bg-paper-light text-stone hover:border-terracotta"
          )}
        >
          Grade {item}
        </button>
      ))}
    </div>
  );
}
