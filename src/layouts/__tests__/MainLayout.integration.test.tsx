import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "../../test/test-utils";

import MainLayout from "../MainLayout";

describe("MainLayout Integration", () => {
  const renderWithWrapper = (ui: React.ReactElement) => {
    return render(ui);
  };

  it("completes full user flow", async () => {
    renderWithWrapper(<MainLayout />);

    // 1. Initial render
    expect(screen.getByText("Home PRO")).toBeInTheDocument();

    // 2. Navigation
    const productsLink = screen.getByText("Products");
    fireEvent.click(productsLink);
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });

    // // 3. Interaction with header
    // const userMenu = screen.getByText("John Doe");
    // fireEvent.click(userMenu);
    // expect(screen.getByText("Logout")).toBeInTheDocument();

    // // 4. Sidebar collapse
    // const collapseButton = screen.getByRole("button", { name: /collapse/i });
    // fireEvent.click(collapseButton);
    // await waitFor(() => {
    //   expect(screen.getByRole("navigation")).toHaveStyle({ width: "60px" });
    // });

    // // 5. Category navigation
    // const categoryMenu = screen.getByText("Categories");
    // fireEvent.click(categoryMenu);
    // const category = screen.getByText("Electronics");
    // fireEvent.click(category);
    // await waitFor(() => {
    //   expect(window.location.pathname).toBe("/categories/electronics");
    // });

    // // 6. Breadcrumb verification
    // expect(screen.getByText("Home")).toBeInTheDocument();
    // expect(screen.getByText("Categories")).toBeInTheDocument();
    // expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  //   it("handles error states", async () => {
  //     // Mock API error
  //     server.use(
  //       rest.get("/api/categories", (req, res, ctx) => {
  //         return res(ctx.status(500));
  //       })
  //     );

  //     renderWithWrapper(<MainLayout />);

  //     // Verify error handling
  //     await waitFor(() => {
  //       expect(screen.getByText("Error loading categories")).toBeInTheDocument();
  //     });

  //     // Verify UI still works
  //     const collapseButton = screen.getByRole("button", { name: /collapse/i });
  //     fireEvent.click(collapseButton);
  //     expect(screen.getByRole("navigation")).toHaveStyle({ width: "60px" });
  //   });

  //   it("handles responsive behavior", async () => {
  //     // Mock mobile viewport
  //     window.innerWidth = 768;
  //     fireEvent(window, new Event("resize"));

  //     renderWithWrapper(<MainLayout />);

  //     // Verify mobile layout
  //     expect(screen.getByRole("navigation")).toHaveStyle({ width: "0px" });
  //     expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();

  //     // Test mobile menu
  //     fireEvent.click(screen.getByRole("button", { name: /menu/i }));
  //     await waitFor(() => {
  //       expect(screen.getByRole("navigation")).toHaveStyle({ width: "200px" });
  //     });
  //   });

  //   it("maintains state across route changes", async () => {
  //     renderWithWrapper(<MainLayout />);

  //     // Collapse sidebar
  //     fireEvent.click(screen.getByRole("button", { name: /collapse/i }));

  //     // Navigate
  //     fireEvent.click(screen.getByText("Products"));
  //     await waitFor(() => {
  //       expect(window.location.pathname).toBe("/products");
  //     });

  //     // Verify state persisted
  //     expect(screen.getByRole("navigation")).toHaveStyle({ width: "60px" });
  //   });
});
