export const RouteMap: Record<string, string> = {
  dashboard: "/",
  categories: "/categories",
  products: "/products",
  productAdd: "/products/new",
  productDetails: "/products/:id",
  categoryDetails: "/categories/:id",
};

export const breadcrumbMap: Record<string, { label: string; title?: string }> =
  {
    "/": { label: "Products", title: "Products List" },
    "/products": { label: "Products", title: "Products List" },
    "/products/new": { label: "Add Product", title: "Add Product" },
    "/products/:id": { label: "Product Details", title: "Product Details" },
    "/categories": { label: "Categories", title: "Categories List" },
    "/categories/:id": { label: "Category Details", title: "Category Details" },
  };

export const TokenKey = "home-pro-token";
