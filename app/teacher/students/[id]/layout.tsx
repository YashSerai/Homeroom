import { RouteTabs } from "@/components/ui/tabs";
import { StudentMasthead } from "@/components/student/StudentMasthead";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const base = "/teacher/students/maya";
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <StudentMasthead />
      <div className="mt-6">
        <RouteTabs
          tabs={[
            { href: base, label: "Overview" },
            { href: `${base}/handoff`, label: "Handoff" },
            { href: `${base}/growth-map`, label: "Growth Map" },
            { href: `${base}/notes`, label: "Notes" },
            { href: `${base}/pathways`, label: "Pathways" }
          ]}
        />
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

