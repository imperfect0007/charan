import { describe, expect, it } from "vitest";

import {
  cn,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/lib/utils";

describe("lib/utils", () => {
  describe("cn", () => {
    it("merges plain class names", () => {
      expect(cn("a", "b")).toBe("a b");
    });

    it("filters falsy values", () => {
      expect(cn("a", false && "b", null, undefined, "c")).toBe("a c");
    });

    it("dedupes conflicting tailwind classes via twMerge", () => {
      expect(cn("p-2", "p-4")).toBe("p-4");
      expect(cn("text-sm", "text-base")).toBe("text-base");
    });
  });

  describe("formatNumber", () => {
    it("formats integers with thousand separators", () => {
      expect(formatNumber(1245678)).toBe("1,245,678");
    });
    it("respects fraction options", () => {
      expect(formatNumber(0.084, { style: "percent" })).toBe("8%");
    });
  });

  describe("formatPercent", () => {
    it("appends a percent sign with one decimal by default", () => {
      expect(formatPercent(8.4)).toBe("8.4%");
    });
    it("supports custom precision", () => {
      expect(formatPercent(8.4321, 2)).toBe("8.43%");
    });
  });

  describe("formatCurrency", () => {
    it("formats USD by default", () => {
      expect(formatCurrency(3240)).toBe("$3,240");
    });
    it("supports another currency", () => {
      const result = formatCurrency(1000, "EUR");
      expect(result).toMatch(/€|EUR/);
      expect(result).toContain("1,000");
    });
  });
});
