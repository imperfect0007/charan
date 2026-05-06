"use client";

import { FraudTopNav } from "@/components/ad-fraud/top-nav";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function AdFraudCampaignsPage() {
  return (
    <>
      <FraudTopNav />
      <main className="container py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Campaigns
          </h1>
          <p className="text-sm text-muted-foreground">
            Per-campaign fraud heuristics and rules.
          </p>
        </header>
        <ComingSoon
          title="Campaigns module"
          description="Configure detection rules per campaign."
          bullets={[
            "Per-campaign IVT thresholds and bot signatures.",
            "Allow / deny lists for sources and IP ranges.",
            "Real-time alerts when fraud rate exceeds bounds.",
          ]}
        />
      </main>
    </>
  );
}
