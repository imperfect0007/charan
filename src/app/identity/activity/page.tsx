"use client";

import { IdentityTopBar } from "@/components/identity/top-bar";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function IdentityActivityPage() {
  return (
    <>
      <IdentityTopBar title="Activity Logs" />
      <main className="p-4 md:p-6">
        <ComingSoon
          title="Activity Logs"
          description="Audit trail for every identity event."
          bullets={[
            "Tamper-evident log of every verification step.",
            "Export to SIEM or warehouse via webhook.",
            "Per-user, per-admin filterable timeline.",
          ]}
        />
      </main>
    </>
  );
}
