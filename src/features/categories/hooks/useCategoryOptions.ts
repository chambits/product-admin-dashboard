import { useMemo } from "react";
import { useGetCategoriesQuery } from "../categoryApi";

export interface SelectOption {
  label: string;
  value: string;
}

export const useCategoryOptions = (options?: {
  onlySubcategories?: boolean;
}) => {
  const { data: categories } = useGetCategoriesQuery();

  return useMemo(() => {
    if (!categories) return [];

    return categories.ids
      .map((id) => {
        const category = categories.entities[id];

        if (options?.onlySubcategories && !category?.parentId) return null;

        return {
          label: category?.name || "",
          value: id,
        };
      })
      .filter(Boolean) as SelectOption[];
  }, [categories, options?.onlySubcategories]);
};
