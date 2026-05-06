"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FIELDS = [
  { label: "Full Name", id: "full-name" },
  { label: "Date of Birth", id: "dob" },
  { label: "Address", id: "address" },
  { label: "National ID", id: "national-id" },
];

export function UserProfileCard() {
  return (
    <Card data-testid="user-profile-card" className="h-full bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>User Profile Information</CardTitle>
        <Badge variant="warning" className="gap-1">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-warning" />
          Verifying Profile
        </Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div
            key={f.id}
            data-testid={`profile-field-${f.id}`}
            className="flex flex-col gap-1.5"
          >
            <span className="text-xs font-medium text-muted-foreground">
              {f.label}
            </span>
            <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2">
              <span className="text-xs italic text-muted-foreground">
                [Scanning…]
              </span>
              <Skeleton className="ml-auto h-3 w-20" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
