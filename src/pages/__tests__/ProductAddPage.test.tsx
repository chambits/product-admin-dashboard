import { render, screen, fireEvent, waitFor } from "../../test/test-utils";
import { describe, expect, it, vi, beforeEach } from "vitest";
import ProductAddPage from "../ProductAddPage";
import { useCreateProduct } from "../../features/products/hooks/useCreateProduct";
import { useGetCategoriesQuery } from "../../features/categories/categoryApi";
import { useNavigate } from "react-router-dom";
import { ProductStatus } from "../../features/products/types";
import { EntityState } from "@reduxjs/toolkit";

vi.mock("../../features/products/hooks/useCreateProduct", () => ({
  useCreateProduct: vi.fn(),
}));

vi.mock("../../features/categories/categoryApi", () => ({
  useGetCategoriesQuery: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

// describe("ProductAddPage", () => {
//   const mockNavigate = vi.fn();
//   const mockCreateProduct = vi.fn();
//   const mockGenerateSimpleId = vi.fn().mockReturnValue("P123456");
//   const mockCategories: EntityState<{ id: string; name: string }, string> = {
//     ids: ["cat1", "cat2"],
//     entities: {
//       cat1: { id: "cat1", name: "Category 1" },
//       cat2: { id: "cat2", name: "Category 2" },
//     },
//   };
//   beforeEach(() => {
//     vi.clearAllMocks();
//     vi.mocked(useNavigate).mockReturnValue(mockNavigate);
//     vi.mocked(useCreateProduct).mockReturnValue({
//       createProduct: mockCreateProduct,
//       generateSimpleId: mockGenerateSimpleId,
//       isLoading: false,
//     });
//     vi.mocked(useGetCategoriesQuery).mockReturnValue({
//       data: mockCategories,
//       isLoading: false,
//       refetch: vi.fn(),
//     });
//   });
//   it("renders all form fields", () => {
//     render(<ProductAddPage />);
//     expect(screen.getByLabelText("Product Name")).toBeInTheDocument();
//     expect(screen.getByLabelText("Status")).toBeInTheDocument();
//     expect(screen.getByLabelText("Category")).toBeInTheDocument();
//     expect(screen.getByLabelText("Price")).toBeInTheDocument();
//     expect(screen.getByLabelText("Stock")).toBeInTheDocument();
//     expect(screen.getByLabelText("Description")).toBeInTheDocument();
//     expect(screen.getByText("Add Attribute")).toBeInTheDocument();
//   });
//   it("populates category options from API", () => {
//     render(<ProductAddPage />);
//     const categorySelect = screen.getByLabelText("Category");
//     fireEvent.mouseDown(categorySelect);
//     expect(screen.getByText("Category 1")).toBeInTheDocument();
//     expect(screen.getByText("Category 2")).toBeInTheDocument();
//   });
//   it("populates status options", () => {
//     render(<ProductAddPage />);
//     const statusSelect = screen.getByLabelText("Status");
//     fireEvent.mouseDown(statusSelect);
//     Object.values(ProductStatus).forEach((status) => {
//       expect(screen.getByText(status)).toBeInTheDocument();
//     });
//   });
//   it("validates required fields", async () => {
//     render(<ProductAddPage />);
//     const submitButton = screen.getByText("Create Product");
//     fireEvent.click(submitButton);
//     await waitFor(() => {
//       expect(
//         screen.getByText("Please input product name!")
//       ).toBeInTheDocument();
//       expect(screen.getByText("Please select status!")).toBeInTheDocument();
//       expect(screen.getByText("Please select category!")).toBeInTheDocument();
//       expect(screen.getByText("Please input price!")).toBeInTheDocument();
//       expect(screen.getByText("Please input stock!")).toBeInTheDocument();
//     });
//   });
//   it("validates name pattern", async () => {
//     render(<ProductAddPage />);
//     const nameInput = screen.getByLabelText("Product Name");
//     fireEvent.change(nameInput, { target: { value: "Invalid@Name" } });
//     const submitButton = screen.getByText("Create Product");
//     fireEvent.click(submitButton);
//     await waitFor(() => {
//       expect(
//         screen.getByText("Name must contain only letters, numbers, and spaces")
//       ).toBeInTheDocument();
//     });
//   });
//   it("validates price and stock are positive", async () => {
//     render(<ProductAddPage />);
//     const priceInput = screen.getByLabelText("Price");
//     const stockInput = screen.getByLabelText("Stock");
//     fireEvent.change(priceInput, { target: { value: "-100" } });
//     fireEvent.change(stockInput, { target: { value: "-10" } });
//     const submitButton = screen.getByText("Create Product");
//     fireEvent.click(submitButton);
//     await waitFor(() => {
//       expect(screen.getAllByText("Price must be positive!")).toHaveLength(2);
//     });
//   });
//   it("handles form submission", async () => {
//     render(<ProductAddPage />);
//     // Fill in required fields
//     fireEvent.change(screen.getByLabelText("Product Name"), {
//       target: { value: "Test Product" },
//     });
//     fireEvent.mouseDown(screen.getByLabelText("Status"));
//     fireEvent.click(screen.getByText(ProductStatus.Active));
//     fireEvent.mouseDown(screen.getByLabelText("Category"));
//     fireEvent.click(screen.getByText("Category 1"));
//     fireEvent.change(screen.getByLabelText("Price"), {
//       target: { value: "100" },
//     });
//     fireEvent.change(screen.getByLabelText("Stock"), {
//       target: { value: "10" },
//     });
//     const submitButton = screen.getByText("Create Product");
//     fireEvent.click(submitButton);
//     await waitFor(() => {
//       expect(mockCreateProduct).toHaveBeenCalledWith(
//         expect.objectContaining({
//           name: "Test Product",
//           status: ProductStatus.Active,
//           categoryId: "cat1",
//           price: 100,
//           stock: 10,
//         })
//       );
//     });
//   });
//   it("handles cancel button click", () => {
//     render(<ProductAddPage />);
//     const cancelButton = screen.getByText("Cancel");
//     fireEvent.click(cancelButton);
//     expect(mockNavigate).toHaveBeenCalledWith("/products");
//   });
//   it("shows loading state during submission", () => {
//     vi.mocked(useCreateProduct).mockReturnValue({
//       createProduct: mockCreateProduct,
//       generateSimpleId: mockGenerateSimpleId,
//       isLoading: true,
//     });
//     render(<ProductAddPage />);
//     expect(screen.getByText("Create Product").closest("button")).toBeDisabled();
//   });
//   it("allows adding and removing attributes", async () => {
//     render(<ProductAddPage />);
//     // Add attribute
//     const addButton = screen.getByText("Add Attribute");
//     fireEvent.click(addButton);
//     // Fill attribute fields
//     const codeInput = screen.getByPlaceholderText("Attribute Code");
//     const valueInput = screen.getByPlaceholderText("Value");
//     fireEvent.change(codeInput, { target: { value: "color" } });
//     fireEvent.change(valueInput, { target: { value: "red" } });
//     // Remove attribute
//     const removeButton = screen.getByRole("button", { name: "remove" });
//     fireEvent.click(removeButton);
//     expect(codeInput).not.toBeInTheDocument();
//     expect(valueInput).not.toBeInTheDocument();
//   });
// });
