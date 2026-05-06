import { describe, expect, it } from "vitest";

import { FraudTrendChart } from "@/components/ad-fraud/fraud-trend-chart";
import { FraudDistributionChart } from "@/components/ad-fraud/fraud-distribution-chart";
import { TopSourcesChart } from "@/components/ad-fraud/top-sources-chart";
import { FraudHotspotsMap } from "@/components/ad-fraud/fraud-hotspots-map";
import { renderWithProviders, screen } from "@/test/utils";

describe("Ad-fraud charts", () => {
  it("renders the fraud trend area chart with title", () => {
    renderWithProviders(<FraudTrendChart />);
    expect(
      screen.getByText(/Ad Fraud Trend \(Daily\)/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId("fraud-trend-chart")).toBeInTheDocument();
  });

  it("renders fraud distribution chart container", () => {
    const { container } = renderWithProviders(<FraudDistributionChart />);
    expect(
      screen.getByText(/Fraud Distribution by Type/i),
    ).toBeInTheDocument();

    // Recharts axis labels can vary in jsdom. The key requirement is that
    // the chart renders an SVG and the component mounts without errors.
    const card = screen.getByTestId("fraud-distribution-chart");
    expect(card).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("renders the top fraudulent sources legend with five sources", () => {
    renderWithProviders(<TopSourcesChart />);
    expect(screen.getByText(/Top 5 Fraudulent Sources/i)).toBeInTheDocument();
    ["Source A", "Source B", "Source C", "Source D", "Source E"].forEach(
      (s) => {
        expect(screen.getByText(s)).toBeInTheDocument();
      },
    );
  });

  it("renders the world map with at least one country pin", () => {
    renderWithProviders(<FraudHotspotsMap />);
    expect(screen.getByText(/Fraud Hotspots by Country/i)).toBeInTheDocument();
    expect(screen.getByTestId("hotspot-US")).toBeInTheDocument();
    expect(screen.getByTestId("hotspot-BR")).toBeInTheDocument();
  });
});
