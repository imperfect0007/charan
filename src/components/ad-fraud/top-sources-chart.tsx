"use client";

import * as React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { topFraudSources } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PALETTE = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

export function TopSourcesChart() {
  return (
    <Card data-testid="top-sources-chart" className="h-full bg-card/60">
      <CardHeader>
        <CardTitle>Top 5 Fraudulent Sources</CardTitle>
        <CardDescription>Share of detections by source</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid h-64 grid-cols-1 sm:grid-cols-[1fr_140px]">
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topFraudSources}
                  innerRadius={42}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive={false}
                  label={({ value }) => `${value}%`}
                  labelLine={false}
                  fontSize={11}
                >
                  {topFraudSources.map((_entry, index) => (
                    <Cell
                      key={`pie-${index}`}
                      fill={PALETTE[index % PALETTE.length]}
                      stroke="hsl(var(--card))"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul
            aria-label="Top 5 fraudulent sources legend"
            className="flex flex-col justify-center gap-2 text-xs"
          >
            {topFraudSources.map((entry, idx) => (
              <li key={entry.name} className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: PALETTE[idx % PALETTE.length] }}
                  aria-hidden
                />
                <span className="font-medium">{entry.name}</span>
                <span className="ml-auto text-muted-foreground">
                  {entry.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
