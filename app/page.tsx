"use client";

import { motion } from "framer-motion";
import { RoleSwitcher } from "@/components/layout/RoleSwitcher";

export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-160px)] max-w-7xl items-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-4xl"
      >
        <p className="mono-label mb-5">Demo build · Single student, Maya Chen</p>
        <h1 className="font-display text-7xl leading-[0.96] text-forest md:text-8xl">Homeroom</h1>
        <p className="mt-7 max-w-2xl font-display text-4xl leading-tight text-ink">Student growth, carried forward.</p>
        <p className="mt-4 max-w-2xl text-xl leading-8 text-ink-soft">Grades show performance. Homeroom shows growth.</p>
        <div className="mt-10">
          <RoleSwitcher />
        </div>
      </motion.div>
    </section>
  );
}

