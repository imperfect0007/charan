"use client";

import { FraudTopNav } from "@/components/ad-fraud/top-nav";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function AdFraudSettingsPage() {
  return (
    <>
      <FraudTopNav />
      <main className="container py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Workspace, billing, and integration settings.
          </p>
        </header>
        <ComingSoon
          title="Settings module"
          description="Workspace, members, and integration preferences."
          bullets={[
            "Team members and role-based access control.",
            "API keys and integration credentials.",
            "Branding, locale, and notification defaults.",
          ]}
        />
      </main>
    </>
  );
}
