import type { Metadata } from "next";

import { IdentitySideNav } from "@/components/identity/side-nav";

export const metadata: Metadata = {
  title: "Identity Verification & User Dashboard",
};

export default function IdentityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <IdentitySideNav />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
