import { createSelector } from "@reduxjs/toolkit";
import type { MenuProps } from "antd";
import { useAppSelector } from "../../../app/store/hooks";
import { selectCategoryResult } from "../categoryApi";
import { Category } from "../types";

type MenuItem = Required<MenuProps>["items"][number];

export const selectCategoryMenuItems = createSelector(
  [selectCategoryResult],
  (categoryRes): MenuItem[] => {
    if (!categoryRes.data) return [];

    const categoryMap = new Map<string | null, Category[]>();

    categoryRes.data.ids.forEach((id) => {
      const category = categoryRes?.data?.entities[id];
      if (!category) return;
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
  [selectCategoryResult],
  (categoryRes): { [key: string]: string } => {
    if (!categoryRes.data) return {};

    return categoryRes.data.ids.reduce(
      (acc: { [key: string]: string }, id: string) => ({
        ...acc,
        [id]: categoryRes.data?.entities[id]?.name || "",
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
