import { describe, expect, it } from "vitest";

import { VerificationProgressCard } from "@/components/identity/verification-progress";
import { renderWithProviders, screen } from "@/test/utils";

describe("<VerificationProgressCard />", () => {
  it("renders both verification rows", () => {
    renderWithProviders(<VerificationProgressCard />);
    expect(screen.getByTestId("phone-verification-row")).toBeInTheDocument();
    expect(screen.getByTestId("document-scan-row")).toBeInTheDocument();
  });

  it("marks the phone row as Active and shows progress", () => {
    renderWithProviders(<VerificationProgressCard />);
    expect(
      screen.getByTestId("phone-verification-row"),
    ).toHaveTextContent(/Active/i);
  });

  it("shows the document scan progress hint", () => {
    renderWithProviders(<VerificationProgressCard />);
    expect(
      screen.getByText(/Processing — 65% Complete/i),
    ).toBeInTheDocument();
  });

  it("renders an upload button", () => {
    renderWithProviders(<VerificationProgressCard />);
    expect(screen.getByTestId("upload-id-button")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Upload ID Document/i }),
    ).toBeInTheDocument();
  });
});
