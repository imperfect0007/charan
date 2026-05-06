"use client";

import { FraudTopNav } from "@/components/ad-fraud/top-nav";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function AdFraudAlertsPage() {
  return (
    <>
      <FraudTopNav />
      <main className="container py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Alerts
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure and triage fraud alerts.
          </p>
        </header>
        <ComingSoon
          title="Alerts module"
          description="Real-time notifications for anomalies."
          bullets={[
            "Slack, email, and webhook delivery channels.",
            "Severity-based on-call routing.",
            "Acknowledgement and resolution tracking.",
          ]}
        />
      </main>
    </>
  );
}
