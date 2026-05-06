"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BadgeCheck,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ModuleSwitcher } from "@/components/shared/module-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/identity", label: "Dashboard", icon: LayoutDashboard },
  { href: "/identity/users", label: "Users", icon: Users },
  { href: "/identity/verification", label: "Verification", icon: BadgeCheck },
  { href: "/identity/activity", label: "Activity Logs", icon: Activity },
  { href: "/identity/settings", label: "Settings", icon: Settings },
];

export function IdentitySideNav() {
  const pathname = usePathname();

  return (
    <aside
      role="navigation"
      aria-label="Identity navigation"
      data-testid="identity-side-nav"
      className="hidden h-[calc(100vh-4rem)] w-60 shrink-0 flex-col gap-1 border-r bg-card/40 p-4 md:flex"
    >
      <Link
        href="/identity"
        className="mb-2 flex items-center gap-2 rounded-md px-2 py-2"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-success/15 text-success">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <span className="font-semibold tracking-tight">Identity Suite</span>
      </Link>

      <ModuleSwitcher className="mb-2" />

      <nav className="mt-2 flex flex-col gap-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/identity"
              ? pathname === "/identity"
              : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active ? "true" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                active && "bg-accent text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center justify-between rounded-lg border bg-background/50 p-3">
        <span className="text-xs text-muted-foreground">Theme</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}

export { NAV as IDENTITY_NAV };
