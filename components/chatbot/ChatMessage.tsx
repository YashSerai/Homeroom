import { cn } from "@/lib/utils";

export function ChatMessage({ role, children }: { role: "teacher" | "homeroom"; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-lg p-3 text-sm", role === "teacher" ? "ml-10 bg-forest text-paper-light" : "mr-10 bg-paper text-ink")}>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] opacity-70">{role === "teacher" ? "Teacher" : "Homeroom"}</p>
      {children}
    </div>
  );
}

