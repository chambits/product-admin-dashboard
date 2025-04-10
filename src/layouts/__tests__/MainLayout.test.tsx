import { render, screen } from "../../test/test-utils";
import { describe, expect, it, vi, beforeEach } from "vitest";
import MainLayout from "../MainLayout";
import { useGetCategoriesQuery } from "../../features/categories/categoryApi";

vi.mock("../../components/ui/Sider", () => ({
  default: () => <div data-testid="sider">Sider</div>,
}));

vi.mock("../../components/ui/Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock("../../components/Breadcrumb", () => ({
  default: () => <div data-testid="breadcrumb">Breadcrumb</div>,
}));

vi.mock("react-router-dom", () => ({
  Outlet: () => <div data-testid="outlet">Outlet</div>,
}));

// Mock hooks
vi.mock("../../features/categories/categoryApi", () => ({
  useGetCategoriesQuery: vi.fn(),
}));

describe("MainLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useGetCategoriesQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });
  });

  it("renders all main components", () => {
    render(<MainLayout />);

    expect(screen.getByTestId("sider")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
  });

  it("calls useGetCategoriesQuery on mount", () => {
    render(<MainLayout />);
    expect(useGetCategoriesQuery).toHaveBeenCalled();
  });

  it("renders loading state when categories are loading", () => {
    vi.mocked(useGetCategoriesQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      refetch: vi.fn(),
    });

    render(<MainLayout />);
    expect(screen.getByTestId("sider")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
  });

  it("renders with categories data", () => {
    const mockCategories = {
      ids: ["cat1", "cat2"],
      entities: {
        cat1: { id: "cat1", name: "Category 1" },
        cat2: { id: "cat2", name: "Category 2" },
      },
    };

    vi.mocked(useGetCategoriesQuery).mockReturnValue({
      data: mockCategories,
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<MainLayout />);
    expect(screen.getByTestId("sider")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
  });
});
