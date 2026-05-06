"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Bell,
  LayoutDashboard,
  Megaphone,
  Menu,
  Search,
  Settings,
  ShieldAlert,
  UserCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { ModuleSwitcher } from "@/components/shared/module-switcher";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV = [
  { href: "/ad-fraud", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ad-fraud/reports", label: "Reports", icon: ShieldAlert },
  { href: "/ad-fraud/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/ad-fraud/alerts", label: "Alerts", icon: AlertTriangle },
  { href: "/ad-fraud/settings", label: "Settings", icon: Settings },
];

export function FraudTopNav({
  onOpenFilters,
}: {
  onOpenFilters?: () => void;
}) {
  const pathname = usePathname();

  return (
    <header
      role="banner"
      data-testid="fraud-top-nav"
      className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b border-border/60 bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6"
    >
      {/* Mobile filter trigger */}
      {onOpenFilters ? (
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open filters"
          onClick={onOpenFilters}
        >
          <Menu className="h-5 w-5" />
        </Button>
      ) : null}

      {/* Brand */}
      <Link
        href="/ad-fraud"
        className="flex items-center gap-2 font-semibold tracking-tight"
        aria-label="FraudShield home"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary">
          <ShieldAlert className="h-4 w-4" />
        </span>
        <span className="hidden text-sm font-bold uppercase tracking-[0.18em] sm:inline">
          FraudShield
        </span>
      </Link>

      <ModuleSwitcher className="ml-1" />

      {/* Desktop nav */}
      <nav
        aria-label="Primary"
        className="ml-2 hidden items-center gap-1 md:flex"
      >
        {NAV.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/ad-fraud"
              ? pathname === "/ad-fraud"
              : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active ? "true" : undefined}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                active && "bg-accent text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Search */}
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search campaigns, sources, IPs…"
            aria-label="Search FraudShield"
            className="h-9 w-[260px] pl-9 lg:w-[320px]"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <ThemeToggle />

        <Avatar className="h-9 w-9 border border-border/60">
          <AvatarImage
            src="https://api.dicebear.com/7.x/initials/svg?seed=Jane%20Doe"
            alt="Jane Doe"
          />
          <AvatarFallback>
            <UserCircle className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Mobile drawer for nav */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/ad-fraud"
                  ? pathname === "/ad-fraud"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                    active && "bg-accent",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
