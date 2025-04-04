import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";
import type { MenuProps } from "antd";
import { categoryApi } from "../../../features/categories/categoryApi";
import { Category } from "../../../features/categories/categoryApi";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

// Basic selectors
export const selectCategories = (state: RootState) =>
  categoryApi.endpoints.getCategories.select()(state).data;
// export const selectSelectedCategory = (state: RootState) =>
//   state.category.selectedCategory;

// Memoized selector for menu structure
export const selectCategoryMenuItems = createSelector(
  [selectCategories],
  (categories): MenuItem[] => {
    if (!categories) return [];

    const categoryMap = new Map();
    categories.forEach((cat: Category) => {
      if (!categoryMap.has(cat.parent_id)) {
        categoryMap.set(cat.parent_id, []);
      }
      categoryMap.get(cat.parent_id).push(cat);
    });

    const buildMenuTree = (parentId: number | null = null): MenuItem[] => {
      const children = categoryMap.get(parentId) || [];
      return children.map((cat: Category) => ({
        key: cat.id.toString(),
        label: cat.name,
        children: categoryMap.has(cat.id) ? buildMenuTree(cat.id) : undefined,
      }));
    };

    const data = buildMenuTree(null);

    return [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: <AppstoreOutlined />,
      },
      {
        key: "categories",
        label: "Categories",
        icon: <SettingOutlined />,
        children: data,
      },
    ];
  }
);
