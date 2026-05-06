"use client";

import * as React from "react";

import { verificationHistory } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATUS_VARIANT = {
  Verified: "success",
  Pending: "warning",
  Failed: "destructive",
} as const;

export function VerificationHistoryTable() {
  return (
    <Card data-testid="verification-history-table" className="bg-card">
      <CardHeader>
        <CardTitle>Verification History</CardTitle>
        <CardDescription>
          Most recent identity verification attempts.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Date</TableHead>
              <TableHead>User ID / Phone</TableHead>
              <TableHead className="hidden sm:table-cell">
                Verification Type
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verificationHistory.map((row, idx) => (
              <TableRow
                key={`${row.userId}-${idx}`}
                data-testid="verification-history-row"
              >
                <TableCell className="pl-6 text-sm">{row.date}</TableCell>
                <TableCell className="font-mono text-xs">
                  {row.userId}
                </TableCell>
                <TableCell className="hidden text-sm sm:table-cell">
                  {row.type}
                </TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[row.status]}>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto px-0 text-primary"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
