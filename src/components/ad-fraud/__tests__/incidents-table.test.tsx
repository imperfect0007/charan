import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { IncidentsTable } from "@/components/ad-fraud/incidents-table";
import { fraudIncidents } from "@/lib/mock-data";
import { renderWithProviders, screen } from "@/test/utils";

describe("<IncidentsTable />", () => {
  it("renders every incident initially", () => {
    renderWithProviders(<IncidentsTable />);
    expect(screen.getAllByTestId("incident-row")).toHaveLength(
      fraudIncidents.length,
    );
  });

  it("filters rows when the user types in search", async () => {
    const user = userEvent.setup();
    renderWithProviders(<IncidentsTable />);

    const search = screen.getByTestId("incidents-search");
    await user.type(search, "berlin");

    const rows = screen.getAllByTestId("incident-row");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent(/Berlin, DE/i);
  });

  it("shows an empty state when no incident matches", async () => {
    const user = userEvent.setup();
    renderWithProviders(<IncidentsTable />);

    await user.type(
      screen.getByTestId("incidents-search"),
      "no-such-event-asdf",
    );

    expect(
      screen.getByText(/No incidents match your search/i),
    ).toBeInTheDocument();
    expect(screen.queryAllByTestId("incident-row")).toHaveLength(0);
  });

  it("renders status badges for blocked incidents", () => {
    renderWithProviders(<IncidentsTable />);
    expect(screen.getAllByText("Blocked").length).toBeGreaterThan(0);
  });
});
