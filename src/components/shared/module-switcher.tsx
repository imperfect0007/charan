"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsUpDown, ShieldAlert, BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MODULES = [
  {
    id: "fraud",
    name: "FraudShield",
    description: "Ad Fraud Detection",
    href: "/ad-fraud",
    icon: ShieldAlert,
    accent: "text-blue-500",
  },
  {
    id: "identity",
    name: "Identity Suite",
    description: "User & KYC verification",
    href: "/identity",
    icon: BadgeCheck,
    accent: "text-emerald-500",
  },
] as const;

export function ModuleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const active =
    MODULES.find((m) => pathname?.startsWith(m.href)) ?? MODULES[0];
  const Icon = active.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Switch module"
          data-testid="module-switcher"
          className={cn(
            "h-10 gap-2 rounded-lg border border-border/50 bg-background/40 px-3 text-left",
            className,
          )}
        >
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md bg-primary/10",
              active.accent,
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold">{active.name}</span>
            <span className="text-[11px] text-muted-foreground">
              {active.description}
            </span>
          </span>
          <ChevronsUpDown className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Switch module</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {MODULES.map((m) => {
          const ItemIcon = m.icon;
          const isActive = pathname?.startsWith(m.href);
          return (
            <DropdownMenuItem key={m.id} asChild>
              <Link
                href={m.href}
                className="flex w-full cursor-pointer items-center gap-3"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md bg-muted",
                    m.accent,
                  )}
                >
                  <ItemIcon className="h-4 w-4" />
                </span>
                <span className="flex flex-1 flex-col leading-tight">
                  <span className="text-sm font-medium">{m.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {m.description}
                  </span>
                </span>
                {isActive ? (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Active
                  </span>
                ) : null}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { MODULES };
