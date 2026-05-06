"use client";

import * as React from "react";

import { FraudTopNav } from "@/components/ad-fraud/top-nav";
import {
  DEFAULT_FILTERS,
  FiltersSidebar,
  type FraudFilters,
} from "@/components/ad-fraud/filters-sidebar";
import { StatCard } from "@/components/ad-fraud/stat-card";
import { FraudTrendChart } from "@/components/ad-fraud/fraud-trend-chart";
import { FraudDistributionChart } from "@/components/ad-fraud/fraud-distribution-chart";
import { FraudHotspotsMap } from "@/components/ad-fraud/fraud-hotspots-map";
import { TopSourcesChart } from "@/components/ad-fraud/top-sources-chart";
import { IncidentsTable } from "@/components/ad-fraud/incidents-table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function AdFraudDashboardPage() {
  const [filters, setFilters] = React.useState<FraudFilters>(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  return (
    <>
      <FraudTopNav onOpenFilters={() => setFiltersOpen(true)} />

      <main
        role="main"
        aria-label="Ad Fraud Detection Dashboard"
        className="container py-6"
      >
        <header className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Ad Fraud Detection Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            FraudShield is monitoring{" "}
            <span className="font-medium text-foreground">1,245,678</span>{" "}
            traffic events across your campaigns.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <FiltersSidebar value={filters} onChange={setFilters} />
          </div>

          <div className="flex flex-col gap-6">
            {/* Stat cards */}
            <section
              aria-label="Key metrics"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
            >
              <StatCard
                testId="stat-fraud-rate"
                label="Overall Fraud Rate"
                value="8.4%"
                tone="danger"
                delta={-0.5}
                deltaLabel="vs last period"
              />
              <StatCard
                testId="stat-total-traffic"
                label="Total Traffic"
                value="1,245,678"
                unit="clicks"
                delta={4.2}
                deltaLabel="vs last period"
              />
              <StatCard
                testId="stat-valid-traffic"
                label="Valid Traffic"
                value="1,141,010"
                unit="clicks"
                tone="success"
                delta={2.6}
              />
              <StatCard
                testId="stat-ivt"
                label="Invalid Traffic (IVT)"
                value="104,668"
                unit="clicks"
                tone="warning"
                delta={-1.8}
              />
              <StatCard
                testId="stat-revenue-saved"
                label="Revenue Saved"
                value="$3,240"
                tone="success"
                delta={6.1}
              />
            </section>

            {/* Charts row 1 */}
            <section
              aria-label="Trend and distribution charts"
              className="grid grid-cols-1 gap-6 xl:grid-cols-3"
            >
              <div className="xl:col-span-1">
                <FraudTrendChart />
              </div>
              <div className="xl:col-span-1">
                <FraudDistributionChart />
              </div>
              <div className="xl:col-span-1">
                <FraudHotspotsMap />
              </div>
            </section>

            {/* Charts row 2 */}
            <section
              aria-label="Source breakdown and incidents"
              className="grid grid-cols-1 gap-6 xl:grid-cols-3"
            >
              <div className="xl:col-span-1">
                <TopSourcesChart />
              </div>
              <div className="xl:col-span-2">
                <IncidentsTable />
              </div>
            </section>
          </div>
        </div>

        {/* Mobile filter drawer */}
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="px-6 pt-6">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="p-6">
              <FiltersSidebar
                value={filters}
                onChange={(v) => {
                  setFilters(v);
                }}
                className="border-0 p-0 shadow-none"
              />
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </>
  );
}
