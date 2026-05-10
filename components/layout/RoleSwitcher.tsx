"use client";

import { useRouter } from "next/navigation";
import { GraduationCap, HeartHandshake, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  { role: "teacher", label: "Teacher", href: "/teacher", icon: GraduationCap },
  { role: "parent", label: "Parent", href: "/parent", icon: HeartHandshake },
  { role: "student", label: "Student", href: "/student", icon: UserRound }
];

export function RoleSwitcher({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      {roles.map(({ role, label, href, icon: Icon }) => (
        <Button
          key={role}
          type="button"
          variant={compact ? "ghost" : "secondary"}
          size={compact ? "sm" : "lg"}
          onClick={() => {
            window.localStorage.setItem("homeroom-role", role);
            router.push(href);
          }}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}

