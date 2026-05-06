import type { Metadata, Viewport } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "FraudShield × Identity Suite",
    template: "%s · FraudShield Suite",
  },
  description:
    "Unified GUI suite combining FraudShield Ad Fraud Detection and Identity Verification dashboards. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.",
  authors: [{ name: "FraudShield Suite" }],
  keywords: [
    "ad fraud",
    "identity verification",
    "kyc",
    "dashboard",
    "next.js",
    "shadcn/ui",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
