import { createSelector } from "@reduxjs/toolkit";
import type { MenuProps } from "antd";
import { RootState } from "../../../app/store";
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

const selectCategories = createSelector(
  [selectCategoryResult],
  (categoryRes): Category[] => {
    return (
      categoryRes.data?.ids.map((id) => categoryRes.data?.entities[id]) || []
    ).filter((category): category is Category => category !== undefined);
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

export const selectCategoryById = (id: string) =>
  createSelector(
    [selectCategoryResult],
    (categoryRes): Category | undefined => {
      if (!categoryRes.data) return undefined;
      return categoryRes.data?.entities[id];
    }
  );

export const useCategories = () => {
  const categories = useAppSelector(selectCategories);
  return categories;
};

export const selectCategoryEntitiesByIds = createSelector(
  [
    (state: RootState) => selectCategoryResult(state).data,
    (_state: RootState, ids: string[]) => ids,
  ],
  (categoriesData, ids) => {
    if (!categoriesData?.entities) return [];

    return ids.map((id) => categoriesData.entities[id]).filter(Boolean);
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
