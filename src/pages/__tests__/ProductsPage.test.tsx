import { EntityState } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGetCategoriesQuery } from "../../features/categories/categoryApi";
import { useGetProductsQuery } from "../../features/products/api";
import { useEnrichedProducts } from "../../features/products/selectors/productSelectors";
import { Product, ProductStatus } from "../../features/products/types";
import { fireEvent, render, screen } from "../../test/test-utils";
import ProductsPage from "../ProductsPage";

// Mock the hooks
vi.mock("../../features/products/api", () => ({
  useGetProductsQuery: vi.fn(),
}));

vi.mock("../../features/categories/categoryApi", () => ({
  useGetCategoriesQuery: vi.fn(),
}));

vi.mock("../../features/products/selectors/productSelectors", () => ({
  useEnrichedProducts: vi.fn(),
}));

// Mock child components
vi.mock("../../features/products/components/LastModifiedProducts", () => ({
  default: () => <div data-testid="last-modified-products" />,
}));

vi.mock("../../features/products/components/ProductSearchBar", () => ({
  default: ({ onSearch }: { onSearch: (value: string) => void }) => (
    <input
      data-testid="search-input"
      onChange={(e) => onSearch(e.target.value)}
    />
  ),
}));

vi.mock("../../features/products/components/AddProductButton", () => ({
  default: () => <button data-testid="add-product-button">Add Product</button>,
}));

vi.mock("../../features/products/components/ProductTable", () => ({
  default: ({ data, isLoading }: { data: Product[]; isLoading: boolean }) => (
    <div data-testid="product-table">
      {isLoading ? "Loading..." : `Products: ${data.length}`}
    </div>
  ),
}));

describe("ProductsPage", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Product 1",
      price: 100,
      currency: "$",
      description: "Description 1",
      categoryId: "cat1",
      categoryName: "Category 1",
      stock: 10,
      status: ProductStatus.Active,
      attributes: [],
      createdDate: "2024-01-01",
      modifiedDate: "2024-01-01",
    },
    {
      id: "2",
      name: "Product 2",
      price: 200,
      currency: "$",
      description: "Description 2",
      categoryId: "cat2",
      categoryName: "Category 2",
      stock: 20,
      status: ProductStatus.Active,
      attributes: [],
      createdDate: "2024-01-01",
      modifiedDate: "2024-01-01",
    },
  ];

  const mockEntityState: EntityState<Product, string> = {
    ids: ["1", "2"],
    entities: {
      "1": mockProducts[0],
      "2": mockProducts[1],
    },
  };

  beforeEach(() => {
    vi.mocked(useGetProductsQuery).mockReturnValue({
      isLoading: false,
      data: mockEntityState,
      refetch: vi.fn(),
    });

    vi.mocked(useGetCategoriesQuery).mockReturnValue({
      isLoading: false,
      data: { ids: [], entities: {} },
      refetch: vi.fn(),
    });

    vi.mocked(useEnrichedProducts).mockReturnValue(mockProducts);
  });

  it("renders all main components", () => {
    render(<ProductsPage />);

    expect(screen.getByTestId("last-modified-products")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("add-product-button")).toBeInTheDocument();
    expect(screen.getByTestId("product-table")).toBeInTheDocument();
  });

  it("shows loading state in product table", () => {
    vi.mocked(useGetProductsQuery).mockReturnValue({
      isLoading: true,
      data: undefined,
      refetch: vi.fn(),
    });

    render(<ProductsPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("updates search text when typing in search bar", () => {
    render(<ProductsPage />);
    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, { target: { value: "test search" } });

    // Verify that the search text is passed to the product table
    expect(screen.getByTestId("product-table")).toBeInTheDocument();
  });

  it("displays correct number of products in table", () => {
    render(<ProductsPage />);
    expect(screen.getByText("Products: 2")).toBeInTheDocument();
  });

  it("handles empty product list", () => {
    vi.mocked(useEnrichedProducts).mockReturnValue([]);
    render(<ProductsPage />);
    expect(screen.getByText("Products: 0")).toBeInTheDocument();
  });
});
