import Link from "next/link";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SideNavLinkProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
}

export default function SideNavLink({
  href,
  label,
  active,
  icon: Icon,
}: SideNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-md flex items-center gap-3 rounded-xl px-3 py-2 text-foreground transition-all",
        {
          "hover:text-primary": !active,
          "bg-primary text-primary-foreground": active,
        }
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {label}
    </Link>
  );
}
