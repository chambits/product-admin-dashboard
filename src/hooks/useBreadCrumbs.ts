import { matchPath, useLocation } from "react-router-dom";
import { BreadcrumbMap } from "../constants";

export const useBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbs = pathnames.map((_, index) => {
    const url = `/${pathnames.slice(0, index + 1).join("/")}`;

    const matchedKey = Object.keys(BreadcrumbMap).find((pattern) =>
      matchPath(pattern, url)
    );

    return {
      path: url,
      label: matchedKey ? BreadcrumbMap[matchedKey].label : url,
      title: matchedKey ? BreadcrumbMap[matchedKey].title : undefined,
    };
  });

  return breadcrumbs;
};
