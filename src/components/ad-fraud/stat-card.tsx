import * as React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  delta?: number;
  deltaLabel?: string;
  tone?: "default" | "danger" | "success" | "warning";
  className?: string;
  testId?: string;
}

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "text-foreground",
  danger: "text-destructive",
  success: "text-success",
  warning: "text-warning",
};

export function StatCard({
  label,
  value,
  unit,
  delta,
  deltaLabel,
  tone = "default",
  className,
  testId,
}: StatCardProps) {
  const isPositive = (delta ?? 0) >= 0;
  return (
    <Card
      data-testid={testId}
      className={cn("h-full bg-card/60 backdrop-blur", className)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-1">
          <span
            data-testid={testId ? `${testId}-value` : undefined}
            className={cn("text-2xl font-bold sm:text-3xl", toneClasses[tone])}
          >
            {value}
          </span>
          {unit ? (
            <span className="text-xs font-medium text-muted-foreground">
              {unit}
            </span>
          ) : null}
        </div>
        {typeof delta === "number" ? (
          <p
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium",
              isPositive ? "text-success" : "text-destructive",
            )}
            aria-label={`Change ${isPositive ? "up" : "down"} ${Math.abs(delta).toFixed(1)} percent`}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {isPositive ? "+" : ""}
            {delta.toFixed(1)}%
            {deltaLabel ? (
              <span className="ml-1 text-muted-foreground">{deltaLabel}</span>
            ) : null}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
