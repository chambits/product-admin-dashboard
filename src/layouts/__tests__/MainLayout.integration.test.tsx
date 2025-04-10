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

    const userMenu = screen.getByText("John Doe");
    fireEvent.click(userMenu);
    expect(screen.getByText("Logout")).toBeInTheDocument();

    const collapseButton = screen.getByRole("button", { name: /collapse/i });
    fireEvent.click(collapseButton);
    await waitFor(() => {
      expect(screen.getByRole("navigation")).toHaveStyle({ width: "60px" });
    });

    const categoryMenu = screen.getByText("Categories");
    fireEvent.click(categoryMenu);
    const category = screen.getByText("Electronics");
    fireEvent.click(category);
    await waitFor(() => {
      expect(window.location.pathname).toBe("/categories/electronics");
    });

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });
});
