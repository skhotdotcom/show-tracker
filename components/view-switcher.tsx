"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VIEWS = [
  { label: "Classic", href: "/" },
  { label: "Timeline", href: "/views/temporal" },
  { label: "Session", href: "/views/session" },
];

export function ViewSwitcher() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-0.5 bg-muted p-0.5 rounded-lg text-sm">
      {VIEWS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`px-3 py-1 rounded-md font-medium transition-all ${
            pathname === href
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
