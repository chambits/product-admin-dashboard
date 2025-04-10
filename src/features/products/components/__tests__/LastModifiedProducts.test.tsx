import { render, screen } from "../../../../test/test-utils";
import { describe, expect, it, vi } from "vitest";
import LastModifiedProducts from "../LastModifiedProducts";
import { Product, ProductStatus } from "../../types";
import { useLastModifiedProducts } from "../../selectors/productSelectors";

vi.mock("../../selectors/productSelectors", () => ({
  useLastModifiedProducts: vi.fn(),
}));

vi.mock("../ProductInfoWidget", () => ({
  default: ({
    title,
    product,
  }: {
    title: React.ReactNode;
    product: Product;
  }) => (
    <div data-testid={`product-widget-${product.id}`}>
      <div data-testid="widget-title">{title}</div>
      <div>{product.name}</div>
    </div>
  ),
}));

const mockProducts: Product[] = [
  {
    id: "P1",
    name: "Recent Product 1",
    description: "Description 1",
    price: 99.99,
    currency: "$",
    categoryId: "cat1",
    categoryName: "Category 1",
    stock: 50,
    status: ProductStatus.Active,
    createdDate: "2024-03-20T10:00:00Z",
    modifiedDate: "2024-03-21T15:30:00Z",
    attributes: [],
  },
  {
    id: "P2",
    name: "Recent Product 2",
    description: "Description 2",
    price: 149.99,
    currency: "$",
    categoryId: "cat2",
    categoryName: "Category 2",
    stock: 30,
    status: ProductStatus.Active,
    createdDate: "2024-03-19T10:00:00Z",
    modifiedDate: "2024-03-21T14:30:00Z",
    attributes: [],
  },
];

describe("LastModifiedProducts", () => {
  it("renders skeleton loading state when no products", () => {
    vi.mocked(useLastModifiedProducts).mockReturnValue({
      lastModifiedIds: [],
      lastModifiedEntities: [],
    });

    render(<LastModifiedProducts />);

    const skeletons = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("ant-skeleton-input"));
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders product widgets for each modified product", () => {
    vi.mocked(useLastModifiedProducts).mockReturnValue({
      lastModifiedIds: ["P1", "P2"],
      lastModifiedEntities: mockProducts,
    });

    render(<LastModifiedProducts />);

    expect(screen.getByTestId("product-widget-P1")).toBeInTheDocument();
    expect(screen.getByTestId("product-widget-P2")).toBeInTheDocument();
    expect(screen.getByText("Recent Product 1")).toBeInTheDocument();
    expect(screen.getByText("Recent Product 2")).toBeInTheDocument();
  });

  it("displays update time in widget titles", () => {
    vi.mocked(useLastModifiedProducts).mockReturnValue({
      lastModifiedIds: ["P1"],
      lastModifiedEntities: [mockProducts[0]],
    });

    render(<LastModifiedProducts />);

    const widgetTitle = screen.getByTestId("widget-title");
    expect(widgetTitle).toHaveTextContent("Updated");
  });

  it("renders responsive grid layout", () => {
    vi.mocked(useLastModifiedProducts).mockReturnValue({
      lastModifiedIds: ["P1", "P2"],
      lastModifiedEntities: mockProducts,
    });

    render(<LastModifiedProducts />);

    const columns = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("ant-col"));

    expect(columns).toHaveLength(2); // Two products
    columns.forEach((column) => {
      expect(column).toHaveClass("ant-col-xs-24");
      expect(column).toHaveClass("ant-col-md-8");
      expect(column).toHaveClass("ant-col-lg-8");
    });
  });

  it("renders skeleton with correct layout", () => {
    vi.mocked(useLastModifiedProducts).mockReturnValue({
      lastModifiedIds: [],
      lastModifiedEntities: [],
    });

    render(<LastModifiedProducts />);

    const columns = screen
      .getAllByRole("generic")
      .filter((element) => element.className.includes("ant-col"));

    expect(columns).toHaveLength(3); // Three skeleton loaders
    columns.forEach((column) => {
      expect(column).toHaveClass("ant-col-xs-24");
      expect(column).toHaveClass("ant-col-md-8");
      expect(column).toHaveClass("ant-col-lg-8");
    });
  });

  //   it("handles empty products array", () => {
  //     vi.mocked(useLastModifiedProducts).mockReturnValue({
  //       lastModifiedIds: [],
  //       lastModifiedEntities: [],
  //     });

  //     render(<LastModifiedProducts />);

  //     const skeletonCards = screen
  //       .getAllByRole("generic")
  //       .filter((element) => element.className.includes("ant-card"));
  //     expect(skeletonCards).toHaveLength(3);
  //   });
});
