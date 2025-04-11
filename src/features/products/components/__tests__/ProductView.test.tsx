import { render, screen } from "../../../../test/test-utils";
import { describe, expect, it, vi } from "vitest";
import { ProductView } from "../ProductView";
import { Product, ProductStatus } from "../../types";

vi.mock("../../hooks/useFormatAttributeLabel", () => ({
  useFormatAttributeLabel: () => ({
    formatAttributeLabel: (code: string) => code.toUpperCase(),
  }),
}));

vi.mock("../../hooks/useRenderAttribute", () => ({
  useRenderAttribute: () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderAttribute: (attr: { value: any }) => attr.value.toString(),
  }),
}));

describe("ProductView", () => {
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
    attributes: [
      { code: "color", value: "Red" },
      { code: "size", value: "Large" },
    ],
  };

  it("renders basic product information", () => {
    render(<ProductView product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("$ 99.99")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
  });

  it("renders product statistics", () => {
    render(<ProductView product={mockProduct} />);

    expect(screen.getByText("Product ID")).toBeInTheDocument();
    expect(screen.getByText("P123")).toBeInTheDocument();

    expect(screen.getByText("Stock")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("renders dates correctly", () => {
    render(<ProductView product={mockProduct} />);

    expect(screen.getByText("Last Updated")).toBeInTheDocument();
  });

  it("renders product attributes", () => {
    render(<ProductView product={mockProduct} />);

    expect(screen.getByText("Additional Information")).toBeInTheDocument();
    expect(screen.getByText("COLOR")).toBeInTheDocument();
    expect(screen.getByText("SIZE")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Large")).toBeInTheDocument();
  });
});
