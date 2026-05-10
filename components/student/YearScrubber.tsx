"use client";

import { cn } from "@/lib/utils";

export function YearScrubber({ grade, onGrade }: { grade: number; onGrade: (grade: number) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {[8, 9, 10, 11, 12].map((item) => {
        const pending = item === 12;
        return (
          <button
            key={item}
            type="button"
            disabled={pending}
            onClick={() => onGrade(item)}
            className={cn(
              "rounded-md border px-3 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors",
              grade === item ? "border-forest bg-forest text-paper-light" : "border-stone-light bg-paper-light text-stone hover:border-terracotta",
              pending && "cursor-not-allowed opacity-45"
            )}
          >
            Grade {item}
            {pending ? " · pending" : ""}
          </button>
        );
      })}
    </div>
  );
}

