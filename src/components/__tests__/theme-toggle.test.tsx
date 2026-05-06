import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  renderWithProviders,
  screen,
  waitFor,
} from "@/test/utils";

describe("ThemeToggle", () => {
  it("renders an accessible toggle", () => {
    renderWithProviders(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /toggle theme/i }),
    ).toBeInTheDocument();
  });

  it("offers light, dark, and system options", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(
      await screen.findByRole("menuitem", { name: /^light/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /^dark/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /^system/i }),
    ).toBeInTheDocument();
  });

  it("applies the dark class on the html element when Dark is chosen", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: /toggle theme/i }));
    await user.click(await screen.findByRole("menuitem", { name: /^dark/i }));

    await waitFor(() =>
      expect(document.documentElement).toHaveClass("dark"),
    );
  });
});
