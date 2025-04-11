import { beforeEach, describe, expect, it, vi } from "vitest";
import { Product, ProductStatus } from "../../features/products/types";
import { fireEvent, render, screen } from "../../test/test-utils";
import ProductDetailsPage from "../ProductDetailsPage";

const mockNavigate = vi.fn();
const mockDeleteProduct = vi.fn();
const mockUseProductWithCategory = vi.fn();
const mockUseProductById = vi.fn();
const mockUseParams = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams(),
}));

vi.mock("../../features/products/hooks/useDeleteProduct", () => ({
  useDeleteProduct: () => ({
    deleteProductData: mockDeleteProduct,
  }),
}));

vi.mock("../../features/products/selectors/productSelectors", () => ({
  useProductWithCategory: () => mockUseProductWithCategory(),
  useProductById: () => mockUseProductById(),
}));

vi.mock("../../features/products/components/ProductView", () => ({
  ProductView: ({ product }: { product: Product }) => (
    <div data-testid="product-view">Product View: {product.name}</div>
  ),
}));

vi.mock("../../features/products/components/ProductEditView", () => ({
  ProductEditView: ({
    product,
    onCancel,
  }: {
    product: Product;
    onCancel: () => void;
  }) => (
    <div data-testid="product-edit-view">
      <div>Editing: {product.name}</div>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

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

describe("ProductDetailsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ id: "P123" });
    mockUseProductWithCategory.mockReturnValue({
      productWithCategory: mockProduct,
      isLoading: false,
    });
    mockUseProductById.mockReturnValue({
      product: mockProduct,
      isLoading: false,
    });
  });

  it("renders product view", () => {
    render(<ProductDetailsPage />);

    expect(screen.getByTestId("product-view")).toBeInTheDocument();
    expect(screen.getByText(/Product View: Test Product/)).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("shows delete confirmation and handles delete", async () => {
    render(<ProductDetailsPage />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole("button", { name: /yes/i });
    fireEvent.click(confirmButton);

    expect(mockDeleteProduct).toHaveBeenCalledWith("P123");
  });

  it("handles missing product ID", () => {
    mockUseParams.mockReturnValue({ id: undefined });
    mockUseProductById.mockReturnValue({
      product: null,
      isLoading: false,
    });

    render(<ProductDetailsPage />);

    expect(
      screen.getByText("Unable to find product details for this product")
    ).toBeInTheDocument();
    expect(screen.getByText("Go to products")).toBeInTheDocument();
  });
});
