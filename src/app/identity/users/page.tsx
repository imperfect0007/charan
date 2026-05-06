"use client";

import { IdentityTopBar } from "@/components/identity/top-bar";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function IdentityUsersPage() {
  return (
    <>
      <IdentityTopBar title="Users" />
      <main className="p-4 md:p-6">
        <ComingSoon
          title="Users module"
          description="Manage every verified, pending, and failed user in one place."
          bullets={[
            "Filter by verification status, country, and risk score.",
            "Bulk actions and CSV export.",
            "Drill-down into the verification timeline per user.",
          ]}
        />
      </main>
    </>
  );
}
