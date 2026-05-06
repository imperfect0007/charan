import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import ResizeObserver from "resize-observer-polyfill";

// Required because Recharts' ResponsiveContainer relies on ResizeObserver,
// which jsdom does not implement.
globalThis.ResizeObserver = ResizeObserver;

// Recharts also queries getBoundingClientRect on its parent. Provide a sane
// default so charts render with non-zero dimensions in tests.
if (typeof Element !== "undefined") {
  Element.prototype.getBoundingClientRect = function () {
    return {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 600,
      right: 800,
      width: 800,
      height: 600,
      toJSON() {
        return this;
      },
    } as DOMRect;
  };
}

// matchMedia is referenced by next-themes in light/dark detection.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Radix UI uses scrollIntoView and hasPointerCapture in jsdom-incompatible ways.
if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = vi.fn();
}
if (!(HTMLElement.prototype as any).hasPointerCapture) {
  (HTMLElement.prototype as any).hasPointerCapture = vi.fn(() => false);
}
if (!(HTMLElement.prototype as any).releasePointerCapture) {
  (HTMLElement.prototype as any).releasePointerCapture = vi.fn();
}

// Mock next/navigation for any component that calls usePathname.
vi.mock("next/navigation", () => {
  return {
    usePathname: () => (globalThis as any).__TEST_PATHNAME__ ?? "/",
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams(),
  };
});

afterEach(() => {
  cleanup();
  (globalThis as any).__TEST_PATHNAME__ = "/";
});
