import { describe, expect, it } from "vitest";

import { StatCard } from "@/components/ad-fraud/stat-card";
import { renderWithProviders, screen } from "@/test/utils";

describe("<StatCard />", () => {
  it("renders the label and value", () => {
    renderWithProviders(
      <StatCard label="Overall Fraud Rate" value="8.4%" testId="stat" />,
    );

    expect(screen.getByText(/Overall Fraud Rate/i)).toBeInTheDocument();
    expect(screen.getByTestId("stat-value")).toHaveTextContent("8.4%");
  });

  it("renders an optional unit", () => {
    renderWithProviders(
      <StatCard
        label="Total Traffic"
        value="1,245,678"
        unit="clicks"
        testId="stat"
      />,
    );
    expect(screen.getByText("clicks")).toBeInTheDocument();
  });

  it("shows a positive delta as success", () => {
    renderWithProviders(
      <StatCard
        label="Revenue Saved"
        value="$3,240"
        delta={6.1}
        testId="stat"
      />,
    );
    expect(screen.getByText(/\+6\.1%/)).toBeInTheDocument();
  });

  it("shows a negative delta as destructive", () => {
    renderWithProviders(
      <StatCard
        label="Overall Fraud Rate"
        value="8.4%"
        delta={-0.5}
        testId="stat"
      />,
    );
    expect(screen.getByText(/-0\.5%/)).toBeInTheDocument();
  });

  it("does not render delta when not supplied", () => {
    renderWithProviders(
      <StatCard label="No Trend" value="100" testId="stat" />,
    );
    expect(screen.queryByText(/%/)).toBeNull();
  });
});
