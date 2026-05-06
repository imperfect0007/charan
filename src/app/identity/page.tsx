"use client";

import * as React from "react";

import { IdentityTopBar } from "@/components/identity/top-bar";
import { VerificationProgressCard } from "@/components/identity/verification-progress";
import { ScanResultsCard } from "@/components/identity/scan-results";
import { UserProfileCard } from "@/components/identity/user-profile-card";
import { VerificationSuccessChart } from "@/components/identity/verification-success-chart";
import { VerificationHistoryTable } from "@/components/identity/verification-history-table";
import { UserStatusChart } from "@/components/identity/user-status-chart";

export default function IdentityDashboardPage() {
  return (
    <>
      <IdentityTopBar title="Identity Verification & User Dashboard" />

      <main
        role="main"
        aria-label="Identity Verification Dashboard"
        className="flex-1 p-4 md:p-6"
      >
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-6">
          <div className="flex flex-col gap-4 xl:gap-6">
            <VerificationProgressCard />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:gap-6">
              <UserProfileCard />
              <VerificationSuccessChart />
            </div>

            <VerificationHistoryTable />
          </div>

          <div className="flex flex-col gap-4 xl:gap-6">
            <ScanResultsCard />
            <UserStatusChart />
          </div>
        </div>
      </main>
    </>
  );
}
