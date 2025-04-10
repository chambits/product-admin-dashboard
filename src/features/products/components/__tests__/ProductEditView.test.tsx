import { render, screen, waitFor } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Product, ProductStatus } from "../../types";
import { ProductEditView } from "../ProductEditView";

// Mock the hooks
vi.mock("../../../providers/NotificationProvider", () => ({
  useNotification: () => ({
    showNotification: vi.fn(),
  }),
}));

vi.mock("../hooks/useFormatAttributeLabel", () => ({
  useFormatAttributeLabel: () => ({
    formatAttributeLabel: (code: string) => code.toUpperCase(),
  }),
}));

vi.mock("../hooks/useRenderAttribute", () => ({
  useRenderAttribute: () => ({
    renderAttribute: (attr: { value: any }) => attr.value.toString(),
  }),
}));

vi.mock("../hooks/useUpdateProduct", () => ({
  useUpdateProduct: () => ({
    updateProductData: vi.fn(),
    isUpdating: false,
  }),
}));

describe("ProductEditView", () => {
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
    attributes: [
      { code: "color", value: "Red" },
      { code: "size", value: "Large" },
    ],
  };

  const mockOnSuccess = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  //   it("renders basic form fields correctly", () => {
  //     render(<ProductEditView product={mockProduct} />);

  //     // Check basic information
  //     expect(screen.getByText("P123")).toBeInTheDocument();
  //     expect(screen.getByText("Test Category")).toBeInTheDocument();

  //     // Check form fields
  //     expect(screen.getByLabelText(/Product Name/i)).toHaveValue("Test Product");
  //     expect(screen.getByLabelText(/Status/i)).toHaveValue("Active");
  //     expect(screen.getByLabelText(/Price/i)).toHaveValue("99.99");
  //     expect(screen.getByLabelText(/Stock/i)).toHaveValue(50);
  //     expect(screen.getByLabelText(/Description/i)).toHaveValue(
  //       "Test Description"
  //     );
  //   });

  //   it("renders advanced view with attributes table", () => {
  //     render(<ProductEditView product={mockProduct} view="advanced" />);

  //     expect(screen.getByText("Additional Information")).toBeInTheDocument();
  //     expect(screen.getByText("Add Attribute")).toBeInTheDocument();
  //     expect(screen.getByText("COLOR")).toBeInTheDocument();
  //     expect(screen.getByText("SIZE")).toBeInTheDocument();
  //   });

  //   it("handles form submission", async () => {
  //     const { updateProductData } = useUpdateProduct();
  //     render(<ProductEditView product={mockProduct} onSuccess={mockOnSuccess} />);

  //     const nameInput = screen.getByLabelText(/Product Name/i);
  //     await userEvent.clear(nameInput);
  //     await userEvent.type(nameInput, "Updated Product");

  //     const submitButton = screen.getByText("Save Changes");
  //     await userEvent.click(submitButton);

  //     expect(updateProductData).toHaveBeenCalledWith(
  //       "P123",
  //       expect.objectContaining({ name: "Updated Product" }),
  //       expect.any(Object)
  //     );
  //   });

  //   it("handles attribute addition", async () => {
  //     render(<ProductEditView product={mockProduct} view="advanced" />);

  //     // Open modal
  //     const addButton = screen.getByText("Add Attribute");
  //     await userEvent.click(addButton);

  //     // Fill attribute form
  //     const codeInput = screen.getByLabelText(/Attribute Code/i);
  //     const valueInput = screen.getByLabelText(/Attribute Value/i);
  //     await userEvent.type(codeInput, "weight");
  //     await userEvent.type(valueInput, "100g");

  //     // Submit attribute
  //     const submitAttrButton = screen.getByText("Add");
  //     await userEvent.click(submitAttrButton);

  //     // Check if attribute is added
  //     await waitFor(() => {
  //       expect(screen.getByText("WEIGHT")).toBeInTheDocument();
  //       expect(screen.getByText("100g")).toBeInTheDocument();
  //     });
  //   });

  it("handles attribute deletion", async () => {
    render(<ProductEditView product={mockProduct} view="advanced" />);

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText("COLOR")).not.toBeInTheDocument();
    });
  });

  it("validates required fields", async () => {
    render(<ProductEditView product={mockProduct} />);

    const nameInput = screen.getByLabelText(/Product Name/i);
    await userEvent.clear(nameInput);

    const submitButton = screen.getByText("Save Changes");
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("Please input product name!")
    ).toBeInTheDocument();
  });

  it("handles form cancellation", async () => {
    render(<ProductEditView product={mockProduct} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByText("Cancel");
    await userEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("validates price and stock inputs", async () => {
    render(<ProductEditView product={mockProduct} />);

    const priceInput = screen.getByLabelText(/Price/i);
    const stockInput = screen.getByLabelText(/Stock/i);

    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, "-100");

    await userEvent.clear(stockInput);
    await userEvent.type(stockInput, "-50");

    const submitButton = screen.getByText("Save Changes");
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("Price must be positive!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Stock must be non-negative!")
    ).toBeInTheDocument();
  });

  it("shows empty state for attributes", () => {
    const productWithoutAttrs = { ...mockProduct, attributes: [] };
    render(<ProductEditView product={productWithoutAttrs} view="advanced" />);

    expect(screen.getByText("No attributes added yet")).toBeInTheDocument();
  });
});
