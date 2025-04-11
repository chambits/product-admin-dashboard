import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "../../test/test-utils";

import MainLayout from "../MainLayout";

describe("MainLayout Integration", () => {
  const renderWithWrapper = (ui: React.ReactElement) => {
    return render(ui);
  };

  it("completes full user flow", async () => {
    renderWithWrapper(<MainLayout />);
    expect(screen.getByText("Home PRO")).toBeInTheDocument();
    const productsLink = screen.getByText("Products");
    fireEvent.click(productsLink);
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
