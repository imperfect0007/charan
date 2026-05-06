import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ad Fraud Detection Dashboard",
};

export default function AdFraudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
