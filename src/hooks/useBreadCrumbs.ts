import { matchPath, useLocation } from "react-router-dom";
import { breadcrumbMap } from "../constants";

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
      label: matchedKey ? breadcrumbMap[matchedKey].label : url,
      title: matchedKey ? breadcrumbMap[matchedKey].title : undefined,
    };
  });

  return breadcrumbs;
};
