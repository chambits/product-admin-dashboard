import { describe, test, expect } from "vitest";
import { selectCategoryMenuItems } from "./categorySelectors";
import { RootState } from "..";
import { Category } from "../../../features/categories/types";

const mockCategories: Category[] = [
  { id: "c1", parentId: null, name: "Electronics" },
  { id: "c2", parentId: "c1", name: "Smartphones" },
  { id: "c3", parentId: "c1", name: "Laptops" },
  { id: "c4", parentId: null, name: "Furniture" },
  { id: "c5", parentId: "c4", name: "Chairs" },
  { id: "c6", parentId: "c4", name: "Tables" },
];

describe("selectCategoryMenuItems", () => {
  test("should transform categories into nested menu items", () => {
    const mockState = {
      api: {
        queries: {
          "getCategories(undefined)": {
            status: "fulfilled",
            endpointName: "getCategories",
            requestId: "mockRequest",
            originalArgs: undefined,
            startedTimeStamp: 123,
            data: mockCategories,
          },
        },
        provided: {},
        subscriptions: {},
        mutations: {},
        config: {},
      },
    } as unknown as RootState;

    const result = selectCategoryMenuItems(mockState);

    expect(result).toEqual([
      {
        key: "c1",
        label: "Electronics",
        children: [
          { key: "c2", label: "Smartphones", children: undefined },
          { key: "c3", label: "Laptops", children: undefined },
        ],
      },
      {
        key: "c4",
        label: "Furniture",
        children: [
          { key: "c5", label: "Chairs", children: undefined },
          { key: "c6", label: "Tables", children: undefined },
        ],
      },
    ]);
  });

  test("should return empty array when no categories exist", () => {
    const emptyState = {
      api: {
        queries: {
          "getCategories(undefined)": {
            status: "fulfilled",
            endpointName: "getCategories",
            data: undefined,
          },
        },
      },
    } as unknown as RootState;

    const result = selectCategoryMenuItems(emptyState);
    expect(result).toEqual([]);
  });
});
