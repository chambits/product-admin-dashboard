import { render, screen, fireEvent } from "../../test/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Product, ProductStatus } from "../../features/products/types";
import ProductDetailsPage from "../ProductDetailsPage";
import { useProductWithCategory } from "../../features/products/selectors/productSelectors";
import { useParams } from "react-router-dom";

const mockNavigate = vi.fn();
const mockDeleteProduct = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "P123" }),
}));

vi.mock("../../features/products/hooks/useDeleteProduct", () => ({
  useDeleteProduct: () => ({
    deleteProductData: mockDeleteProduct,
  }),
}));

vi.mock("../../features/products/selectors/productSelectors", () => ({
  useProductWithCategory: () => ({
    productWithCategory: mockProduct,
    isLoading: false,
  }),
}));

vi.mock("../../features/products/components/ProductView", () => ({
  ProductView: ({ product }: { product: Product }) => (
    <div data-testid="product-view">Product View: {product.name}</div>
  ),
}));

vi.mock("../../features/products/components/ProductEditView", () => ({
  ProductEditView: ({ onCancel }: { onCancel: () => void }) => (
    <div data-testid="product-edit-view">
      <button onClick={onCancel}>Cancel Edit</button>
    </div>
  ),
}));

const mockProduct: Product = {
  id: "P123",
  name: "Test Product",
  description: "Test Description",
  price: 99.99,
  currency: "$",
  categoryId: "cat1",
  categoryName: "Test Category",
  stock: 50,
  status: ProductStatus.Active,
  createdDate: "2024-03-20T10:00:00Z",
  modifiedDate: "2024-03-21T15:30:00Z",
  attributes: [],
};

describe("ProductDetailsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    vi.mocked(useProductWithCategory).mockReturnValueOnce({
      productWithCategory: null,
      isLoading: true,
    });

    render(<ProductDetailsPage />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it("renders product view", () => {
    render(<ProductDetailsPage />);

    expect(screen.getByTestId("product-view")).toBeInTheDocument();
    expect(screen.getByText(/Product View: Test Product/)).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("switches to edit mode when edit button is clicked", async () => {
    render(<ProductDetailsPage />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(screen.getByTestId("product-edit-view")).toBeInTheDocument();
  });

  it("returns to view mode when edit is cancelled", async () => {
    render(<ProductDetailsPage />);

    fireEvent.click(screen.getByText("Edit"));
    fireEvent.click(screen.getByText("Cancel Edit"));

    expect(screen.getByTestId("product-view")).toBeInTheDocument();
  });

  it("shows delete confirmation and handles delete", async () => {
    render(<ProductDetailsPage />);

    const confirmButton = screen.getByText("Yes");
    fireEvent.click(confirmButton);

    expect(mockDeleteProduct).toHaveBeenCalledWith("P123");
  });

  it("handles missing product ID", () => {
    vi.mocked(useParams).mockReturnValueOnce({ product: undefined });

    render(<ProductDetailsPage />);

    expect(screen.getByText("Product not found")).toBeInTheDocument();
    expect(screen.getByText("Go to products")).toBeInTheDocument();
  });

  it("navigates back to products list when no product found", () => {
    vi.mocked(useParams).mockReturnValueOnce({ id: undefined });

    render(<ProductDetailsPage />);

    const backButton = screen.getByText("Go to products");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });
});
