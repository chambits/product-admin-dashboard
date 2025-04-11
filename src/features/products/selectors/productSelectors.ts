import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { useAppSelector } from "../../../app/store/hooks";
import {
  selectProductsByCategoryResult,
  selectProductsResult,
  useGetProductQuery,
} from "../api";
import { Product } from "../types";

const selectProducts = (searchTerm: string = "") =>
  createSelector(selectProductsResult(searchTerm), (productRes) => {
    const products =
      productRes.data?.ids.map((id) => productRes.data?.entities[id]) || [];
    return products;
  });

const selectProductsByCategory = (
  categoryId: string,
  searchTerm: string = ""
) =>
  createSelector(
    selectProductsByCategoryResult({ categoryId, searchTerm }),
    (productRes) => {
      const products =
        productRes.data?.ids.map((id) => productRes.data?.entities[id]) || [];
      return products;
    }
  );

const selectProductById = createSelector(
  [
    (state: RootState) => selectProductsResult()(state).data,
    (_state: RootState, id: string) => id,
  ],
  (productsData, id) => productsData?.entities[id]
);

const selectLastModifiedProducts = createSelector(
  [
    (state: RootState) => selectProductsResult()(state).data,
    (_state: RootState, limit: number) => limit,
  ],
  (productsData, limit) => {
    if (!productsData?.entities || !productsData?.ids.length) return [];

    const sortedIds = [...productsData.ids].sort((a, b) => {
      const entityA = productsData.entities[a];
      const entityB = productsData.entities[b];

      if (!entityA || !entityB) return 0;

      const dateA = new Date(entityA.modifiedDate || "").getTime();
      const dateB = new Date(entityB.modifiedDate || "").getTime();

      return dateB - dateA;
    });

    return sortedIds.slice(0, limit);
  }
);

export const selectProductEntitiesByIds = createSelector(
  [
    (state: RootState) => selectProductsResult()(state).data,
    (_state: RootState, ids: string[]) => ids,
  ],
  (productsData, ids) => {
    if (!productsData?.entities) return [];

    return ids.map((id) => productsData.entities[id]).filter(Boolean);
  }
);

export const useLastModifiedProducts = (limit: number = 3) => {
  const lastModifiedIds = useAppSelector((state: RootState) =>
    selectLastModifiedProducts(state, limit)
  );

  const lastModifiedEntities = useAppSelector((state: RootState) =>
    selectProductEntitiesByIds(state, lastModifiedIds)
  );

  return {
    lastModifiedIds,
    lastModifiedEntities,
  };
};

export const useProducts = (searchTerm: string = "") => {
  const products = useAppSelector(selectProducts(searchTerm));
  return products as Product[];
};

export const useProductsByCategory = (
  categoryId: string,
  searchTerm: string = ""
) => {
  const products = useAppSelector(
    selectProductsByCategory(categoryId, searchTerm)
  );
  return products as Product[];
};

export const useProductById = (id: string) => {
  const cachedProduct = useAppSelector((state: RootState) =>
    selectProductById(state, id)
  );

  const { isLoading, data: productData } = useGetProductQuery(id, {
    skip: !!cachedProduct,
  });

  return {
    product: cachedProduct || productData,
    isLoading,
  };
};
