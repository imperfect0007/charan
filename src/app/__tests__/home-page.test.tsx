import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import { renderWithProviders, screen } from "@/test/utils";

describe("Landing page", () => {
  it("renders both module CTAs", () => {
    renderWithProviders(<Home />);
    const fraudCta = screen.getByTestId("cta-ad-fraud");
    const idCta = screen.getByTestId("cta-identity");

    expect(fraudCta).toBeInTheDocument();
    expect(fraudCta.getAttribute("href")).toBe("/ad-fraud");
    expect(idCta).toBeInTheDocument();
    expect(idCta.getAttribute("href")).toBe("/identity");
  });

  it("renders the suite headline", () => {
    renderWithProviders(<Home />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Two operations dashboards/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the theme toggle in the header", () => {
    renderWithProviders(<Home />);
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });
});
