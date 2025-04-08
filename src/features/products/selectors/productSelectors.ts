import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { useGetProductsQuery } from "../productApi";
import { useSelector } from "react-redux";

// Base selector for products query data
const selectProductsResult = (state: RootState) =>
  state.api.queries["getProducts(undefined)"]?.data;

// Selector for last modified products
export const selectLastModifiedProducts = createSelector(
  [selectProductsResult, (_state: RootState, limit: number) => limit],
  (products, limit) => {
    if (!products) return [];

    return [...products]
      .sort((a, b) => {
        const dateA = new Date(a.modifiedDate).getTime();
        const dateB = new Date(b.modifiedDate).getTime();
        return dateB - dateA;
      })
      .slice(0, limit);
  }
);

// Hook to use the selector
export const useLastModifiedProducts = (limit: number = 3) => {
  const { isLoading } = useGetProductsQuery("");
  const lastModifiedProducts = useSelector((state: RootState) =>
    selectLastModifiedProducts(state, limit)
  );

  return {
    lastModifiedProducts,
    isLoading,
  };
};
