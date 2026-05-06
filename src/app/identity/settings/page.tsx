"use client";

import { IdentityTopBar } from "@/components/identity/top-bar";
import { ComingSoon } from "@/components/shared/coming-soon";

export default function IdentitySettingsPage() {
  return (
    <>
      <IdentityTopBar title="Settings" />
      <main className="p-4 md:p-6">
        <ComingSoon
          title="Identity Suite Settings"
          description="Workspace, integrations, and verification policy."
          bullets={[
            "Configure required documents per geography.",
            "Webhook destinations for verification events.",
            "Per-tenant branding and email templates.",
          ]}
        />
      </main>
    </>
  );
}
