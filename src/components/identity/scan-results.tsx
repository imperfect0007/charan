"use client";

import * as React from "react";
import {
  CheckCircle2,
  Copy,
  CreditCard,
  Info,
  Phone,
  ScanFace,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function ScanResultsCard() {
  return (
    <Card data-testid="scan-results" className="bg-card">
      <CardHeader>
        <CardTitle>Scan Results</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div data-testid="phone-scan-result" className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Phone Number Scan
            </span>
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="h-3 w-3" /> Verified
            </Badge>
          </div>
          <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2">
            <Phone className="h-4 w-4 text-success" />
            <span className="text-sm font-medium">+1 (555) 123-4567</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Copy phone number"
              className="ml-auto h-7 w-7"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Phone scan info"
              className="h-7 w-7"
            >
              <Info className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div data-testid="document-scan-result" className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              ID Document Scan
            </span>
            <Badge variant="info">Analyzing</Badge>
          </div>
          <div className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-info/15 text-info">
              <CreditCard className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <div className="text-xs font-medium">Analyzing Document…</div>
              <div className="text-xs text-muted-foreground">
                Extracting Details…
              </div>
              <Progress
                value={65}
                className="mt-2 h-1.5"
                indicatorClassName="bg-info"
              />
            </div>
          </div>
        </div>

        <div data-testid="face-match-result" className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Face Match
            </span>
            <Badge variant="warning">Comparing…</Badge>
          </div>
          <div className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-warning/15 text-warning">
              <ScanFace className="h-4 w-4" />
            </span>
            <div className="text-xs">
              <div className="font-medium">User's photo from document</div>
              <div className="text-muted-foreground">
                Cross-checking with selfie…
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
