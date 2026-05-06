import { describe, expect, it } from "vitest";

import { VerificationHistoryTable } from "@/components/identity/verification-history-table";
import { verificationHistory } from "@/lib/mock-data";
import { renderWithProviders, screen } from "@/test/utils";

describe("<VerificationHistoryTable />", () => {
  it("renders one row per history entry", () => {
    renderWithProviders(<VerificationHistoryTable />);
    expect(screen.getAllByTestId("verification-history-row")).toHaveLength(
      verificationHistory.length,
    );
  });

  it("renders verified, pending and failed badges", () => {
    renderWithProviders(<VerificationHistoryTable />);
    expect(screen.getAllByText(/Verified/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Pending/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Failed/i).length).toBeGreaterThan(0);
  });

  it("provides a 'View Details' affordance for each row", () => {
    renderWithProviders(<VerificationHistoryTable />);
    const links = screen.getAllByRole("button", { name: /View Details/i });
    expect(links).toHaveLength(verificationHistory.length);
  });
});
