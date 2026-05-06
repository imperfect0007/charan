import { describe, expect, it } from "vitest";

import { UserStatusChart } from "@/components/identity/user-status-chart";
import { renderWithProviders, screen } from "@/test/utils";

describe("<UserStatusChart />", () => {
  it("renders the chart and legend", () => {
    renderWithProviders(<UserStatusChart />);
    expect(screen.getByText(/User Status Distribution/i)).toBeInTheDocument();
    expect(screen.getByText("Verified")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
  });
});
