"use client";

import { IdentityTopBar } from "@/components/identity/top-bar";
import { VerificationProgressCard } from "@/components/identity/verification-progress";
import { ScanResultsCard } from "@/components/identity/scan-results";

export default function IdentityVerificationPage() {
  return (
    <>
      <IdentityTopBar title="Verification" />
      <main className="grid gap-4 p-4 md:p-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <VerificationProgressCard />
        <ScanResultsCard />
      </main>
    </>
  );
}
