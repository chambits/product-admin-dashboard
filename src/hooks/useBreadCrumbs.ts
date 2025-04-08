import { matchPath, useLocation } from "react-router-dom";

export const breadcrumbMap: Record<string, string> = {
  "/": "Dashboard",
  "/products": "Products",
  "/products/new": "Add Product",
  "/products/:id": "Product Details",
  "/categories": "Categories",
  "/categories/:id": "Category Details",
};

export const useBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbs = pathnames.map((_, index) => {
    const url = `/${pathnames.slice(0, index + 1).join("/")}`;

    const matchedKey = Object.keys(breadcrumbMap).find((pattern) =>
      matchPath(pattern, url)
    );

    return {
      path: url,
      label: matchedKey ? breadcrumbMap[matchedKey] : url,
    };
  });

  return breadcrumbs;
};
