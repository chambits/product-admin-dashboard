import { render, screen } from "../../../../test/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LastModifiedProducts from "../LastModifiedProducts";
import { Product, ProductStatus } from "../../types";
import { useLastModifiedProducts } from "../../selectors/productSelectors";

vi.mock("../../selectors/productSelectors", () => ({
  useLastModifiedProducts: vi.fn(),
}));

vi.mock("../ProductInfoWidget", () => ({
  __esModule: true,
  default: vi.fn(
    ({
      title,
      mainContent,
      info,
      onClick,
    }: {
      title: React.ReactNode;
      mainContent: React.ReactNode;
      info: React.ReactNode;
      onClick: () => void;
    }) => (
      <div onClick={onClick}>
        <div data-testid="widget-title">{title}</div>
        <div data-testid="widget-content">{mainContent}</div>
        <div data-testid="widget-info">{info}</div>
      </div>
    )
  ),
}));

const mockProducts: Product[] = [
  {
    id: "P1",
    name: "Recent Product 1",
    description: "Description 1",
    price: 99.99,
    currency: "$",
    category: {
      id: "cat1",
      name: "Category 1",
    },
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
    category: {
      id: "cat2",
      name: "Category 2",
    },
    stock: 30,
    status: ProductStatus.Active,
    createdDate: "2024-03-19T10:00:00Z",
    modifiedDate: "2024-03-21T14:30:00Z",
    attributes: [],
  },
];

describe("LastModifiedProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders product widgets for each modified product", () => {
    vi.mocked(useLastModifiedProducts).mockReturnValue({
      lastModifiedIds: ["P1", "P2"],
      lastModifiedEntities: mockProducts,
    });

    render(<LastModifiedProducts />);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("widget-title")).toHaveLength(
      mockProducts.length
    );

    expect(screen.getAllByTestId("widget-info")).toHaveLength(
      mockProducts.length
    );
  });

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
});
