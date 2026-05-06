import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldAlert, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FEATURES = [
  {
    title: "Real-time fraud telemetry",
    description:
      "Track invalid traffic, hotspots, and revenue saved across every ad campaign.",
  },
  {
    title: "Identity & KYC orchestration",
    description:
      "Score phone, document, and face matches in a single verification pipeline.",
  },
  {
    title: "Theme-aware UI",
    description:
      "Light, dark, and system themes with brand-tuned colors that work everywhere.",
  },
  {
    title: "Ships with tests",
    description:
      "Vitest + React Testing Library suite covers utils, charts, tables, and routing.",
  },
];

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.18),transparent_60%)]"
      />

      <header className="container flex items-center justify-between py-6">
        <div className="flex items-center gap-2 text-base font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>FraudShield Suite</span>
        </div>
        <ThemeToggle />
      </header>

      <section className="container flex flex-col items-center gap-6 py-16 text-center md:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          Next.js · TypeScript · Tailwind · shadcn/ui
        </span>
        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Two operations dashboards.{" "}
          <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
            One unified workspace.
          </span>
        </h1>
        <p className="max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          A polished, fully-responsive GUI that combines an Ad Fraud Detection
          control plane and an Identity Verification & User dashboard, with
          full light/dark theming and a comprehensive test suite.
        </p>

        <div className="mt-2 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link
              href="/ad-fraud"
              data-testid="cta-ad-fraud"
              className="flex items-center"
            >
              <ShieldAlert className="h-4 w-4" />
              Open FraudShield
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link
              href="/identity"
              data-testid="cta-identity"
              className="flex items-center"
            >
              <BadgeCheck className="h-4 w-4" />
              Open Identity Suite
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <Card key={feature.title} className="bg-card/60 backdrop-blur">
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Production-ready and screenshot-faithful.
            </CardContent>
          </Card>
        ))}
      </section>

      <footer className="container flex flex-col items-center justify-between gap-2 border-t py-6 text-xs text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} FraudShield Suite — Demo build</span>
        <span>Built for the GUI Development assignment</span>
      </footer>
    </main>
  );
}
