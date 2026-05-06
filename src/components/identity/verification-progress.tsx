"use client";

import * as React from "react";
import {
  CreditCard,
  FileUp,
  Phone,
  Upload,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProgressRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  status: "complete" | "active" | "processing";
  progress: number;
  hint?: string;
  testId?: string;
}

function ProgressRow({
  icon: Icon,
  label,
  status,
  progress,
  hint,
  testId,
}: ProgressRowProps) {
  return (
    <div data-testid={testId} className="flex items-center gap-4">
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          status === "complete" && "bg-success/15 text-success",
          status === "active" && "bg-primary/15 text-primary",
          status === "processing" && "bg-info/15 text-info",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium">{label}</span>
          {status === "active" ? (
            <Badge variant="success">Active</Badge>
          ) : status === "complete" ? (
            <Badge variant="success">Verified</Badge>
          ) : (
            <span className="text-xs text-muted-foreground">{hint}</span>
          )}
        </div>
        <Progress
          value={progress}
          className="mt-2 h-1.5"
          indicatorClassName={cn(
            status === "complete" && "bg-success",
            status === "active" && "bg-primary",
            status === "processing" && "bg-info",
          )}
        />
      </div>
    </div>
  );
}

export function VerificationProgressCard() {
  return (
    <Card data-testid="verification-progress" className="bg-card">
      <CardHeader>
        <CardTitle>Identity Scanning & Verification</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <ProgressRow
          icon={Phone}
          label="Phone Number Verification"
          status="active"
          progress={92}
          testId="phone-verification-row"
        />
        <ProgressRow
          icon={CreditCard}
          label="Document Scan (ID Card / Driver's License)"
          status="processing"
          progress={65}
          hint="Processing — 65% Complete"
          testId="document-scan-row"
        />

        <div className="flex flex-col items-stretch justify-between gap-3 rounded-lg border bg-muted/30 p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Upload className="h-4 w-4" />
            </span>
            <div>
              <div className="text-sm font-medium">Upload ID Document</div>
              <div className="text-xs text-muted-foreground">
                Document Scan (ID Card / Driver's License)
              </div>
            </div>
          </div>
          <Button data-testid="upload-id-button" className="sm:w-auto">
            <FileUp className="h-4 w-4" />
            Upload ID Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
