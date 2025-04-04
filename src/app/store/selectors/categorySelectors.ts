import { createSelector } from "@reduxjs/toolkit";
import type { MenuProps } from "antd";
import { useAppSelector } from "../../hooks";
import { RootState } from "../index";
import { Category } from "../../../features/categories/types";

type MenuItem = Required<MenuProps>["items"][number];

export const selectCategories = (state: RootState) =>
  state.api.queries["getCategories(undefined)"]?.data;

export const selectCategoryMenuItems = createSelector(
  [selectCategories],
  (categories): MenuItem[] => {
    if (!categories) return [];

    const categoryMap = new Map<string | null, Category[]>();

    categories.forEach((category: Category) => {
      const parentId = category.parent_id ?? null;
      if (!categoryMap.has(parentId)) {
        categoryMap.set(parentId, []);
      }
      categoryMap.get(parentId)!.push(category);
    });

    const buildTree = (parentId: string | null): MenuItem[] => {
      const children = categoryMap.get(parentId) || [];
      return children.map((category) => {
        const subTree = buildTree(category.id);
        return {
          key: category.id,
          label: category.name,
          children: subTree.length > 0 ? subTree : undefined,
        };
      });
    };

    return buildTree(null);
  }
);
export const useCategoryMenuItems = (): MenuItem[] => {
  const menuItems = useAppSelector(selectCategoryMenuItems);
  return menuItems;
};
