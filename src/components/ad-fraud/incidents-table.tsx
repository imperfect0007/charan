"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { fraudIncidents, type FraudIncident } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_VARIANT: Record<
  FraudIncident["status"],
  "destructive" | "warning" | "info"
> = {
  Blocked: "destructive",
  Flagged: "warning",
  Investigating: "info",
};

export function IncidentsTable() {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!query.trim()) return fraudIncidents;
    const q = query.trim().toLowerCase();
    return fraudIncidents.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <Card data-testid="incidents-table" className="bg-card/60">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <CardTitle>Recent Fraud Incidents</CardTitle>
          <CardDescription>
            Live stream of blocked, flagged, and ongoing investigations
          </CardDescription>
        </div>
        <div className="relative w-full sm:w-72">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search incidents…"
            aria-label="Search incidents"
            data-testid="incidents-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Timestamp</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead className="hidden lg:table-cell">Event</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden xl:table-cell">IP</TableHead>
              <TableHead className="pr-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  No incidents match your search.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => (
                <TableRow key={row.eventId} data-testid="incident-row">
                  <TableCell className="pl-6 font-mono text-xs">
                    {row.timestamp}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {row.campaignId}
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs lg:table-cell">
                    {row.eventId}
                  </TableCell>
                  <TableCell className="text-xs">{row.sourceId}</TableCell>
                  <TableCell className="hidden text-xs md:table-cell">
                    {row.trafficType}
                  </TableCell>
                  <TableCell className="text-xs">{row.reason}</TableCell>
                  <TableCell className="hidden text-xs md:table-cell">
                    {row.location}
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs xl:table-cell">
                    {row.ipAddress}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Badge variant={STATUS_VARIANT[row.status]}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <div className="flex items-center justify-between border-t px-6 py-3 text-xs text-muted-foreground">
        <span>
          Showing {filtered.length} of {fraudIncidents.length} incidents
        </span>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
