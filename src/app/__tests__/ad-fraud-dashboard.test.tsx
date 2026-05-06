import { describe, expect, it } from "vitest";

import AdFraudDashboardPage from "@/app/ad-fraud/page";
import { renderWithProviders, screen, setPathname } from "@/test/utils";

describe("Ad Fraud Detection Dashboard page", () => {
  it("renders the heading and all stat cards", () => {
    setPathname("/ad-fraud");
    renderWithProviders(<AdFraudDashboardPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Ad Fraud Detection Dashboard/i,
      }),
    ).toBeInTheDocument();

    [
      "stat-fraud-rate",
      "stat-total-traffic",
      "stat-valid-traffic",
      "stat-ivt",
      "stat-revenue-saved",
    ].forEach((id) => {
      expect(screen.getByTestId(id)).toBeInTheDocument();
    });
  });

  it("matches the screenshot's headline numbers", () => {
    setPathname("/ad-fraud");
    renderWithProviders(<AdFraudDashboardPage />);

    expect(screen.getByTestId("stat-fraud-rate-value")).toHaveTextContent(
      "8.4%",
    );
    expect(screen.getByTestId("stat-total-traffic-value")).toHaveTextContent(
      "1,245,678",
    );
    expect(screen.getByTestId("stat-valid-traffic-value")).toHaveTextContent(
      "1,141,010",
    );
    expect(screen.getByTestId("stat-ivt-value")).toHaveTextContent(
      "104,668",
    );
    expect(screen.getByTestId("stat-revenue-saved-value")).toHaveTextContent(
      "$3,240",
    );
  });

  it("renders the filters sidebar, all charts and incidents table", () => {
    setPathname("/ad-fraud");
    renderWithProviders(<AdFraudDashboardPage />);

    expect(screen.getAllByTestId("filters-sidebar").length).toBeGreaterThan(0);
    expect(screen.getByTestId("fraud-trend-chart")).toBeInTheDocument();
    expect(screen.getByTestId("fraud-distribution-chart")).toBeInTheDocument();
    expect(screen.getByTestId("fraud-hotspots-map")).toBeInTheDocument();
    expect(screen.getByTestId("top-sources-chart")).toBeInTheDocument();
    expect(screen.getByTestId("incidents-table")).toBeInTheDocument();
  });

  it("renders the FraudShield top navigation", () => {
    setPathname("/ad-fraud");
    renderWithProviders(<AdFraudDashboardPage />);
    expect(screen.getByTestId("fraud-top-nav")).toBeInTheDocument();
  });
});
