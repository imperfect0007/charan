"use client";

import * as React from "react";
import { Calendar, MoreHorizontal, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export type FraudFilters = {
  dateRange: string;
  campaign: string;
  source: string;
  fraudType: string;
  region: string;
};

export const DEFAULT_FILTERS: FraudFilters = {
  dateRange: "this-month",
  campaign: "all",
  source: "all",
  fraudType: "all",
  region: "global",
};

const DATE_RANGES = [
  { value: "this-month", label: "This Month — Oct 1 to Oct 25, 2024" },
  { value: "last-7", label: "Last 7 days" },
  { value: "last-30", label: "Last 30 days" },
  { value: "qtd", label: "Quarter to date" },
  { value: "ytd", label: "Year to date" },
];

const CAMPAIGNS = [
  { value: "all", label: "All Campaigns" },
  { value: "holiday-boost", label: "Holiday Boost" },
  { value: "app-installs", label: "App Installs" },
  { value: "web-traffic", label: "Web Traffic" },
];

const SOURCES = [
  { value: "all", label: "All sources" },
  { value: "dsps", label: "DSPs" },
  { value: "ad-networks", label: "Ad Networks" },
  { value: "direct", label: "Direct" },
];

const FRAUD_TYPES = [
  { value: "all", label: "All types" },
  { value: "ivt", label: "IVT" },
  { value: "bots", label: "Bots" },
  { value: "click-farming", label: "Click Farming" },
  { value: "geo-fraud", label: "Geo Fraud" },
];

const REGIONS = [
  { value: "global", label: "Global" },
  { value: "north-america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "asia-pacific", label: "Asia Pacific" },
  { value: "latam", label: "Latin America" },
];

interface FiltersSidebarProps {
  className?: string;
  value: FraudFilters;
  onChange: (next: FraudFilters) => void;
}

export function FiltersSidebar({
  className,
  value,
  onChange,
}: FiltersSidebarProps) {
  const update = <K extends keyof FraudFilters>(key: K, v: FraudFilters[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <aside
      data-testid="filters-sidebar"
      className={cn(
        "flex h-full flex-col gap-5 rounded-xl border bg-card/60 p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Filters
        </h2>
        <Button
          variant="ghost"
          size="icon"
          aria-label="More filter options"
          className="h-7 w-7 text-muted-foreground"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <FilterField
        id="filter-date"
        label="Date Range"
        icon={<Calendar className="h-3.5 w-3.5 text-muted-foreground" />}
      >
        <Select
          value={value.dateRange}
          onValueChange={(v) => update("dateRange", v)}
        >
          <SelectTrigger id="filter-date" data-testid="filter-date-range">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DATE_RANGES.map((d) => (
              <SelectItem key={d.value} value={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <Separator />

      <FilterField id="filter-campaign" label="Campaigns">
        <Select
          value={value.campaign}
          onValueChange={(v) => update("campaign", v)}
        >
          <SelectTrigger id="filter-campaign" data-testid="filter-campaign">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CAMPAIGNS.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField id="filter-source" label="Traffic Sources">
        <Select value={value.source} onValueChange={(v) => update("source", v)}>
          <SelectTrigger id="filter-source" data-testid="filter-source">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SOURCES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField id="filter-type" label="Fraud Types">
        <Select
          value={value.fraudType}
          onValueChange={(v) => update("fraudType", v)}
        >
          <SelectTrigger id="filter-type" data-testid="filter-fraud-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FRAUD_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField id="filter-region" label="Region">
        <Select value={value.region} onValueChange={(v) => update("region", v)}>
          <SelectTrigger id="filter-region" data-testid="filter-region">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <Button
        variant="ghost"
        size="sm"
        className="mt-auto justify-start text-muted-foreground"
        data-testid="reset-filters"
        onClick={() => onChange(DEFAULT_FILTERS)}
      >
        <RotateCcw className="mr-2 h-3.5 w-3.5" />
        Reset filters
      </Button>
    </aside>
  );
}

function FilterField({
  id,
  label,
  icon,
  children,
}: {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={id}
        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
      >
        {icon} {label}
      </Label>
      {children}
    </div>
  );
}
