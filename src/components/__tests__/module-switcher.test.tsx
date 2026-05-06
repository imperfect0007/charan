import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { ModuleSwitcher } from "@/components/shared/module-switcher";
import {
  renderWithProviders,
  screen,
  setPathname,
} from "@/test/utils";

describe("ModuleSwitcher", () => {
  it("displays FraudShield as active when on /ad-fraud", () => {
    setPathname("/ad-fraud");
    renderWithProviders(<ModuleSwitcher />);
    expect(screen.getByText("FraudShield")).toBeInTheDocument();
    expect(screen.getByText(/Ad Fraud Detection/i)).toBeInTheDocument();
  });

  it("displays Identity Suite as active when on /identity", () => {
    setPathname("/identity");
    renderWithProviders(<ModuleSwitcher />);
    expect(screen.getByText("Identity Suite")).toBeInTheDocument();
  });

  it("opens a menu with both modules when clicked", async () => {
    setPathname("/ad-fraud");
    const user = userEvent.setup();
    renderWithProviders(<ModuleSwitcher />);

    await user.click(screen.getByTestId("module-switcher"));

    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();

    const links = screen.getAllByRole("menuitem");
    expect(links.length).toBeGreaterThanOrEqual(2);
    expect(menu).toHaveTextContent("FraudShield");
    expect(menu).toHaveTextContent("Identity Suite");
  });

  it("links each module to the correct route", async () => {
    setPathname("/");
    const user = userEvent.setup();
    renderWithProviders(<ModuleSwitcher />);

    await user.click(screen.getByTestId("module-switcher"));

    const fraudLink = screen.getByRole("menuitem", { name: /FraudShield/i });
    const identityLink = screen.getByRole("menuitem", {
      name: /Identity Suite/i,
    });

    expect(fraudLink.getAttribute("href")).toBe("/ad-fraud");
    expect(identityLink.getAttribute("href")).toBe("/identity");
  });
});
