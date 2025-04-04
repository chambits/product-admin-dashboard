import { describe, test, expect } from "vitest";
import { selectCategoryMenuItems } from "./categorySelectors";
import { RootState } from "..";
import { Category } from "../../../features/categories/types";

const mockCategories: Category[] = [
  { id: "C1", parent_id: null, name: "Electronics" },
  { id: "C2", parent_id: "C1", name: "Smartphones" },
  { id: "C3", parent_id: "C1", name: "Laptops" },
  { id: "C4", parent_id: null, name: "Furniture" },
  { id: "C5", parent_id: "C4", name: "Chairs" },
  { id: "C6", parent_id: "C4", name: "Tables" },
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
        key: "C1",
        label: "Electronics",
        children: [
          { key: "C2", label: "Smartphones", children: [] },
          { key: "C3", label: "Laptops", children: [] },
        ],
      },
      {
        key: "C4",
        label: "Furniture",
        children: [
          { key: "C5", label: "Chairs", children: [] },
          { key: "C6", label: "Tables", children: [] },
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
