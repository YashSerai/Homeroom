"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function RouteTabs({ tabs }: { tabs: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap gap-2 border-b border-stone-light pb-3">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
              active ? "bg-forest text-paper-light" : "text-ink-soft hover:bg-sage-light/45"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

