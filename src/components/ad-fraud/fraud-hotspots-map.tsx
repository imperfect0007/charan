"use client";

import * as React from "react";

import { fraudHotspots } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Simplified world silhouette as SVG path data (Robinson-ish projection,
// hand-tuned for a clean dashboard look). Coordinates are in a 1000x500
// viewBox so country pins below can use percentage-style positioning.
const WORLD_PATH =
  "M158 168 L208 152 L243 165 L283 158 L318 173 L341 168 L368 178 L382 192 L375 220 L356 232 L334 244 L312 260 L289 270 L258 282 L223 290 L188 285 L162 270 L148 252 L153 232 L161 210 L158 188 Z M395 145 L430 138 L465 152 L494 142 L520 158 L548 158 L578 168 L612 162 L646 175 L674 168 L702 182 L725 178 L728 196 L702 212 L674 220 L644 228 L612 236 L580 248 L552 256 L522 268 L496 272 L468 280 L436 286 L406 282 L386 268 L376 246 L380 226 L390 206 L396 184 Z M430 295 L468 295 L500 308 L530 320 L552 340 L568 358 L572 380 L562 402 L536 416 L502 420 L472 412 L444 396 L426 376 L420 350 L424 322 Z M740 188 L772 178 L800 192 L820 178 L848 192 L865 210 L878 232 L880 256 L862 274 L838 280 L812 286 L788 282 L766 268 L748 248 L740 224 Z M188 350 L224 358 L256 372 L284 392 L300 414 L298 434 L276 446 L246 442 L222 428 L208 410 L194 388 L186 372 Z";

// Country pin coordinates (x%, y%)
const PIN_COORDS: Record<string, { x: number; y: number }> = {
  US: { x: 22, y: 38 },
  BR: { x: 33, y: 70 },
  GB: { x: 47, y: 30 },
  DE: { x: 52, y: 32 },
  RU: { x: 65, y: 28 },
  CN: { x: 78, y: 42 },
  IN: { x: 70, y: 50 },
  AU: { x: 85, y: 75 },
};

const SEVERITY_STYLES: Record<
  "low" | "medium" | "high",
  { dot: string; ring: string; label: string }
> = {
  low: {
    dot: "bg-info",
    ring: "ring-info/40",
    label: "Low severity",
  },
  medium: {
    dot: "bg-warning",
    ring: "ring-warning/40",
    label: "Medium severity",
  },
  high: {
    dot: "bg-destructive",
    ring: "ring-destructive/40",
    label: "High severity",
  },
};

export function FraudHotspotsMap() {
  return (
    <Card data-testid="fraud-hotspots-map" className="h-full bg-card/60">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Fraud Hotspots by Country</CardTitle>
          <CardDescription>Current invalid traffic by region</CardDescription>
        </div>
        <Legend />
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-md bg-muted/40">
          <svg
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="World map with fraud hotspots"
            className="h-full w-full"
          >
            <path
              d={WORLD_PATH}
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth={1.5}
              opacity={0.85}
            />
          </svg>

          {fraudHotspots.map((hotspot) => {
            const pos = PIN_COORDS[hotspot.code];
            if (!pos) return null;
            const style = SEVERITY_STYLES[hotspot.severity];
            return (
              <Tooltip key={hotspot.code}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={`${hotspot.country}: ${hotspot.incidents.toLocaleString()} incidents`}
                    data-testid={`hotspot-${hotspot.code}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <span
                      className={cn(
                        "block h-3 w-3 rounded-full ring-4 transition-transform hover:scale-125",
                        style.dot,
                        style.ring,
                      )}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="text-xs">
                    <div className="font-semibold">{hotspot.country}</div>
                    <div className="text-muted-foreground">
                      {hotspot.incidents.toLocaleString()} incidents · {style.label}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function Legend() {
  return (
    <ul className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
      <li className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-destructive" /> High
      </li>
      <li className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-warning" /> Medium
      </li>
      <li className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-info" /> Low
      </li>
    </ul>
  );
}
