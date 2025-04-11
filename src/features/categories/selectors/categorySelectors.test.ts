/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import {
  selectCategoryMenuItems,
  selectCategoryNames,
} from "./categorySelectors";

describe("Category Selectors", () => {
  const mockCategoryResult = {
    data: {
      ids: ["1", "2", "3", "4"],
      entities: {
        "1": {
          id: "1",
          name: "Electronics",
          parentId: null,
        },
        "2": {
          id: "2",
          name: "Phones",
          parentId: "1",
        },
        "3": {
          id: "3",
          name: "Laptops",
          parentId: "1",
        },
        "4": {
          id: "4",
          name: "iPhone",
          parentId: "2",
        },
      },
    },
  };

  describe("selectCategoryMenuItems", () => {
    it("should return empty array when no data", () => {
      const result = selectCategoryMenuItems({
        api: { queries: { "getCategories(undefined)": { data: null } } },
      } as any);
      expect(result).toEqual([]);
    });

    it("should transform categories into menu items with correct hierarchy", () => {
      const result = selectCategoryMenuItems({
        api: { queries: { "getCategories(undefined)": mockCategoryResult } },
      } as any);

      expect(result).toEqual([
        {
          key: "1",
          label: "Electronics",
          children: [
            {
              key: "2",
              label: "Phones",
              children: [
                {
                  key: "4",
                  label: "iPhone",
                  children: undefined,
                },
              ],
            },
            {
              key: "3",
              label: "Laptops",
              children: undefined,
            },
          ],
        },
      ]);
    });
  });

  describe("selectCategoryNames", () => {
    it("should return empty object when no data", () => {
      const result = selectCategoryNames({
        api: { queries: { "getCategories(undefined)": { data: null } } },
      } as any);
      expect(result).toEqual({});
    });

    it("should return flat object with category ids as keys and names as values", () => {
      const result = selectCategoryNames({
        api: { queries: { "getCategories(undefined)": mockCategoryResult } },
      } as any);

      expect(result).toEqual({
        "1": "Electronics",
        "2": "Phones",
        "3": "Laptops",
        "4": "iPhone",
      });
    });

    it("should handle missing category names", () => {
      const mockDataWithMissingName = {
        data: {
          ids: ["1"],
          entities: {
            "1": {
              id: "1",
              parentId: null,
            },
          },
        },
      };

      const result = selectCategoryNames({
        api: {
          queries: { "getCategories(undefined)": mockDataWithMissingName },
        },
      } as any);

      expect(result).toEqual({
        "1": "",
      });
    });
  });
});
