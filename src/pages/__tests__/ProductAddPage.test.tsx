import { EntityState } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "../../test/test-utils";
import ProductAddPage from "../ProductAddPage";
import { Category } from "../../features/categories/types";

const mockNavigate = vi.fn();
const mockCreateProduct = vi.fn();
const mockGenerateSimpleId = vi.fn().mockReturnValue("P123456");
const mockUseCreateProduct = vi.fn();
const mockUseGetCategoriesQuery = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../features/products/hooks/useCreateProduct", () => ({
  useCreateProduct: () => mockUseCreateProduct(),
}));

vi.mock("../../features/categories/categoryApi", () => ({
  useGetCategoriesQuery: () => mockUseGetCategoriesQuery(),
}));

describe("ProductAddPage", () => {
  const mockCategories: EntityState<Category, string> = {
    ids: ["cat1", "cat2"],
    entities: {
      cat1: { id: "cat1", name: "Category 1", parentId: "cat2" },
      cat2: { id: "cat2", name: "Category 2", parentId: null },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseCreateProduct.mockReturnValue({
      createProduct: mockCreateProduct,
      generateSimpleId: mockGenerateSimpleId,
      isLoading: false,
    });

    mockUseGetCategoriesQuery.mockReturnValue({
      data: mockCategories,
      isLoading: false,
      refetch: vi.fn(),
    });
  });

  it("renders all form fields", () => {
    render(<ProductAddPage />);
    expect(screen.getByLabelText("Product Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Stock")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByText("Add Attribute")).toBeInTheDocument();
  });
  it("populates category options with parent id from API", () => {
    render(<ProductAddPage />);
    const categorySelect = screen.getByLabelText("Category");
    fireEvent.mouseDown(categorySelect);
    expect(screen.getByText("Category 1")).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<ProductAddPage />);
    const submitButton = screen.getByText("Create Product");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText("Please input product name!")
      ).toBeInTheDocument();
      expect(screen.getByText("Please select category!")).toBeInTheDocument();
      expect(screen.getByText("Please input price!")).toBeInTheDocument();
      expect(screen.getByText("Please input stock!")).toBeInTheDocument();
    });
  });
  it("validates name pattern", async () => {
    render(<ProductAddPage />);
    const nameInput = screen.getByLabelText("Product Name");
    fireEvent.change(nameInput, { target: { value: "Invalid@Name" } });
    const submitButton = screen.getByText("Create Product");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText("Name must contain only letters, numbers, and spaces")
      ).toBeInTheDocument();
    });
  });
  it("validates price and stock are positive", async () => {
    render(<ProductAddPage />);
    const priceInput = screen.getByLabelText("Price");
    const stockInput = screen.getByLabelText("Stock");
    fireEvent.change(priceInput, { target: { value: "-100" } });
    fireEvent.change(stockInput, { target: { value: "-10" } });
    const submitButton = screen.getByText("Create Product");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getAllByText("Price must be positive!")).toHaveLength(2);
    });
  });
});
