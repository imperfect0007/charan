"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Mail, Menu, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { ModuleSwitcher } from "@/components/shared/module-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { IDENTITY_NAV } from "./side-nav";

export function IdentityTopBar({ title }: { title: string }) {
  const pathname = usePathname();
  return (
    <header
      role="banner"
      data-testid="identity-top-bar"
      className="flex h-16 items-center justify-between gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-6"
    >
      <div className="flex items-center gap-2 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-success/15 text-success">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                Identity Suite
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <ModuleSwitcher />
            </div>
            <nav className="mt-6 flex flex-col gap-1">
              {IDENTITY_NAV.map((item) => {
                const Icon = item.icon;
                const active =
                  item.href === "/identity"
                    ? pathname === "/identity"
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
      </div>

      <h1 className="truncate text-lg font-semibold tracking-tight md:text-xl">
        {title}
      </h1>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Messages"
          className="hidden sm:inline-flex"
        >
          <Mail className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
        <div className="ml-1 flex items-center gap-2 rounded-full border bg-card px-1 py-1 pr-3">
          <Avatar className="h-7 w-7">
            <AvatarImage
              src="https://api.dicebear.com/7.x/initials/svg?seed=Jane%20Doe&backgroundColor=ddd6fe"
              alt="Jane Doe"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="hidden text-left leading-tight sm:block">
            <div className="text-xs font-semibold">Admin</div>
            <div className="text-[11px] text-muted-foreground">Jane Doe</div>
          </div>
        </div>
      </div>
    </header>
  );
}
