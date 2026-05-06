import { describe, expect, it } from "vitest";

import IdentityDashboardPage from "@/app/identity/page";
import { renderWithProviders, screen, setPathname } from "@/test/utils";

describe("Identity Verification Dashboard page", () => {
  it("renders the title in the top bar", () => {
    setPathname("/identity");
    renderWithProviders(<IdentityDashboardPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Identity Verification & User Dashboard/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders all primary widgets", () => {
    setPathname("/identity");
    renderWithProviders(<IdentityDashboardPage />);

    expect(screen.getByTestId("verification-progress")).toBeInTheDocument();
    expect(screen.getByTestId("scan-results")).toBeInTheDocument();
    expect(screen.getByTestId("user-profile-card")).toBeInTheDocument();
    expect(
      screen.getByTestId("verification-success-chart"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("verification-history-table"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("user-status-chart")).toBeInTheDocument();
  });

  it("renders the verifying profile badge with a [Scanning] placeholder", () => {
    setPathname("/identity");
    renderWithProviders(<IdentityDashboardPage />);

    expect(screen.getByText(/Verifying Profile/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\[Scanning…\]/).length).toBeGreaterThan(0);
  });
});
