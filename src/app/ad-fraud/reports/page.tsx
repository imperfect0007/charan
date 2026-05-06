"use client";

import { FraudTopNav } from "@/components/ad-fraud/top-nav";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function AdFraudReportsPage() {
  return (
    <>
      <FraudTopNav />
      <main className="container py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Reports
          </h1>
          <p className="text-sm text-muted-foreground">
            Schedule and export deep-dive fraud reports.
          </p>
        </header>
        <ComingSoon
          title="Reports module"
          description="Generate, schedule and export fraud analytics."
          bullets={[
            "Daily, weekly, and quarterly executive reports.",
            "CSV / PDF / scheduled email delivery.",
            "Custom report templates with saved filters.",
          ]}
        />
      </main>
    </>
  );
}
