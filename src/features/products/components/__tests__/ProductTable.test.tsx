import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../../test/test-utils";
import { Product, ProductStatus } from "../../types";
import ProductTable from "../ProductTable";

vi.mock("ag-grid-react", () => ({
  AgGridReact: ({ rowData }: { rowData: Product[] }) => (
    <div data-testid="mock-ag-grid">
      {rowData?.map((row: Product) => (
        <div key={row.id} data-testid={`row-${row.id}`}>
          {row.name}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../hooks/useDeleteProduct", () => ({
  useDeleteProduct: () => ({
    deleteProductData: vi.fn(),
  }),
}));

describe("ProductTable", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Test Product 1",
      price: 100,
      currency: "$",
      description: "Test Description 1",
      categoryId: "cat1",
      categoryName: "Category 1",
      stock: 10,
      status: ProductStatus.Active,
      attributes: [],
      createdDate: "2024-01-01",
      modifiedDate: "2024-01-02",
    },
    {
      id: "2",
      name: "Test Product 2",
      price: 200,
      currency: "$",
      description: "Test Description 2",
      categoryId: "cat2",
      categoryName: "Category 2",
      stock: 20,
      status: ProductStatus.Inactive,
      attributes: [],
      createdDate: "2024-01-01",
      modifiedDate: "2024-01-02",
    },
  ];

  it("renders products correctly", () => {
    render(<ProductTable data={mockProducts} isLoading={false} />);

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
  });
});
