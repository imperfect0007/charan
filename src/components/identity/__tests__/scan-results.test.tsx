import { describe, expect, it } from "vitest";

import { ScanResultsCard } from "@/components/identity/scan-results";
import { renderWithProviders, screen } from "@/test/utils";

describe("<ScanResultsCard />", () => {
  it("displays the verified phone result", () => {
    renderWithProviders(<ScanResultsCard />);
    expect(screen.getByTestId("phone-scan-result")).toBeInTheDocument();
    expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument();
    expect(screen.getByText(/Verified/i)).toBeInTheDocument();
  });

  it("renders the document scan progress copy", () => {
    renderWithProviders(<ScanResultsCard />);
    expect(screen.getByText(/Analyzing Document/i)).toBeInTheDocument();
    expect(screen.getByText(/Extracting Details/i)).toBeInTheDocument();
  });

  it("renders the face match cross-check copy", () => {
    renderWithProviders(<ScanResultsCard />);
    expect(screen.getByTestId("face-match-result")).toBeInTheDocument();
    expect(screen.getByText(/Comparing/i)).toBeInTheDocument();
  });
});
