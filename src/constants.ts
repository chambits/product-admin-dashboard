export const RouteMap: Record<string, string> = {
  home: "/",
  categories: "/categories",
  products: "/products",
  productAdd: "/products/new",
  productDetails: "/products/:id",
  categoryDetails: "/categories/:id",
};

export const BreadcrumbMap: Record<string, { label: string; title?: string }> =
  {
    "/": { label: "Home", title: "Home" },
    "/products": { label: "Products", title: "Product List" },
    "/products/new": { label: "Add Product", title: "Add Product" },
    "/products/:id": { label: "Product Details", title: "Product Details" },
    "/categories": { label: "Categories", title: "Category List" },
    "/categories/:id": { label: "Category Details", title: "Category Details" },
  };

export const TokenKey = "home-pro-token";
export const BaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002"
    : "https://mock-json-server-75fe176df02c.herokuapp.com/";
