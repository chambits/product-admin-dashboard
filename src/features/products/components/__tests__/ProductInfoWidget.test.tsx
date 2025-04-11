import { beforeEach, describe, expect, it, vi } from "vitest";
import { Badge } from "../../../../components/ui/Badge";
import { fireEvent, render, screen } from "../../../../test/test-utils";
import { Product, ProductStatus } from "../../types";
import ProductInfoWidget from "../ProductInfoWidget";

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
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders widget content correctly", () => {
    render(
      <ProductInfoWidget
        title={mockTitle}
        mainContent={mockProduct.name}
        info={
          <>
            <Badge color="green" content={mockProduct.status} />
            <Badge color="cyan" content={mockProduct.category.name} />
            <span>Stock: {mockProduct.stock}</span>
          </>
        }
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.status)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category.name)).toBeInTheDocument();
    expect(screen.getByText(`Stock: ${mockProduct.stock}`)).toBeInTheDocument();
  });

  it("handles click events", () => {
    render(
      <ProductInfoWidget
        title={mockTitle}
        mainContent={mockProduct.name}
        info={<span>Test Info</span>}
        onClick={mockOnClick}
      />
    );

    const widget = screen.getByText(mockProduct.name).closest("div");
    fireEvent.click(widget!);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it("renders with complex title and info", () => {
    const complexTitle = (
      <div>
        <span>Complex</span>
        <span>Title</span>
      </div>
    );

    const complexInfo = (
      <div>
        <span>Info</span>
        <span>Details</span>
      </div>
    );

    render(
      <ProductInfoWidget
        title={complexTitle}
        mainContent={mockProduct.name}
        info={complexInfo}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("renders with minimal content", () => {
    render(
      <ProductInfoWidget
        title="Simple Title"
        mainContent="Simple Content"
        info="Simple Info"
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText("Simple Title")).toBeInTheDocument();
    expect(screen.getByText("Simple Content")).toBeInTheDocument();
    expect(screen.getByText("Simple Info")).toBeInTheDocument();
  });
});
