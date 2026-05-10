"use client";

import Link from "next/link";
import { RoleSwitcher } from "@/components/layout/RoleSwitcher";

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-light/80 bg-paper/88 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-display text-2xl text-forest">
          Homeroom
        </Link>
        <RoleSwitcher compact />
      </div>
    </header>
  );
}

