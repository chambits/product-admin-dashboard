import {
  render,
  screen,
  fireEvent,
  mockNavigate,
} from "../../../../test/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductInfoWidget from "../ProductInfoWidget";
import { Product, ProductStatus } from "../../types";

describe("ProductInfoWidget", () => {
  const mockProduct: Product = {
    id: "P123",
    name: "Test Product",
    description: "Test Description",
    price: 99.99,
    currency: "$",
    category: {
      id: "cat1",
      name: "Test Category",
    },
    stock: 50,
    status: ProductStatus.Active,
    createdDate: "2024-03-20T10:00:00Z",
    modifiedDate: "2024-03-21T15:30:00Z",
    attributes: [],
  };

  const mockTitle = "Recently Updated";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders product information correctly", () => {
    render(<ProductInfoWidget title={mockTitle} product={mockProduct} />);
    expect(screen.getByText("Recently Updated")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(ProductStatus.Active)).toBeInTheDocument();
    expect(screen.getByText("Stock: 50")).toBeInTheDocument();
  });

  it("navigates to product details when clicked", () => {
    render(<ProductInfoWidget title={mockTitle} product={mockProduct} />);

    const widget = screen.getByText("Test Product").closest("div");
    fireEvent.click(widget!);

    expect(mockNavigate).toHaveBeenCalledWith("/products/P123");
  });

  it("handles different product statuses", () => {
    const inactiveProduct = {
      ...mockProduct,
      status: ProductStatus.Inactive,
    };

    render(<ProductInfoWidget title={mockTitle} product={inactiveProduct} />);
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });
});
