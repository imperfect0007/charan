"use client";

import * as React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { userStatusDistribution } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COLORS: Record<string, string> = {
  Verified: "hsl(var(--success))",
  Pending: "hsl(var(--warning))",
  Failed: "hsl(var(--destructive))",
};

export function UserStatusChart() {
  const total = userStatusDistribution.reduce((acc, c) => acc + c.value, 0);
  return (
    <Card data-testid="user-status-chart" className="h-full bg-card">
      <CardHeader>
        <CardTitle>User Status Distribution</CardTitle>
        <CardDescription>{total.toLocaleString()} users tracked</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid h-44 grid-cols-[1fr_120px] items-center">
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userStatusDistribution}
                  innerRadius={32}
                  outerRadius={62}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive={false}
                  stroke="hsl(var(--card))"
                  strokeWidth={2}
                >
                  {userStatusDistribution.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="flex flex-col gap-2 text-xs">
            {userStatusDistribution.map((entry) => (
              <li key={entry.name} className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[entry.name] }}
                />
                <span className="font-medium">{entry.name}</span>
                <span className="ml-auto text-muted-foreground">
                  {entry.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
