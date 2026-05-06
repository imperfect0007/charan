import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import {
  DEFAULT_FILTERS,
  FiltersSidebar,
  type FraudFilters,
} from "@/components/ad-fraud/filters-sidebar";
import { renderWithProviders, screen, within } from "@/test/utils";

function setup(initial: FraudFilters = DEFAULT_FILTERS) {
  const handleChange = vi.fn();
  let value = initial;
  const utils = renderWithProviders(
    <FiltersSidebar
      value={value}
      onChange={(next) => {
        value = next;
        handleChange(next);
      }}
    />,
  );
  return { handleChange, ...utils };
}

describe("<FiltersSidebar />", () => {
  it("renders all five filter sections", () => {
    setup();
    const sidebar = screen.getByTestId("filters-sidebar");
    expect(within(sidebar).getByRole("heading", { name: /Filters/i })).toBeInTheDocument();
    expect(within(sidebar).getByText(/^Date Range$/i)).toBeInTheDocument();
    expect(within(sidebar).getByText(/^Campaigns$/i)).toBeInTheDocument();
    expect(within(sidebar).getByText(/^Traffic Sources$/i)).toBeInTheDocument();
    expect(within(sidebar).getByText(/^Fraud Types$/i)).toBeInTheDocument();
    expect(within(sidebar).getByText(/^Region$/i)).toBeInTheDocument();
  });

  it("emits onChange when reset filters is clicked", async () => {
    const user = userEvent.setup();
    const { handleChange } = setup({
      ...DEFAULT_FILTERS,
      campaign: "holiday-boost",
    });

    await user.click(screen.getByTestId("reset-filters"));

    expect(handleChange).toHaveBeenCalledWith(DEFAULT_FILTERS);
  });

  it("propagates campaign selection changes", async () => {
    const user = userEvent.setup();
    const { handleChange } = setup();

    await user.click(screen.getByTestId("filter-campaign"));
    const option = await screen.findByRole("option", { name: /Holiday Boost/i });
    await user.click(option);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ campaign: "holiday-boost" }),
    );
  });
});
