import { createSelector } from "@reduxjs/toolkit";
import type { MenuProps } from "antd";
import { RootState } from "../../../app/store/index";
import { Category } from "../types";
import { useAppSelector } from "../../../app/store/hooks";

type MenuItem = Required<MenuProps>["items"][number];

export const selectCategories = (state: RootState) =>
  state.api.queries["getCategories(undefined)"]?.data;

export const selectCategoryMenuItems = createSelector(
  [selectCategories],
  (categories): MenuItem[] => {
    if (!categories) return [];

    const categoryMap = new Map<string | null, Category[]>();

    categories.forEach((category: Category) => {
      const parentId = category.parentId ?? null;
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

export const selectCategoryNames = createSelector(
  [selectCategories],
  (categories): { [key: string]: string } => {
    if (!categories) return {};

    return categories.reduce(
      (acc: { [key: string]: string }, category: Category) => ({
        ...acc,
        [category.id]: category.name,
      }),
      {}
    );
  }
);

export const useCategoryMenuItems = (): MenuItem[] => {
  const menuItems = useAppSelector(selectCategoryMenuItems);
  return menuItems;
};

export const useCategoryNames = (): { [key: string]: string } => {
  const categoryNames = useAppSelector(selectCategoryNames);
  return categoryNames;
};
