import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { useAppSelector } from "../../../app/store/hooks";
import { selectCategoryResult } from "../../categories/categoryApi";
import {
  selectProductsByCategoryResult,
  selectProductsResult,
  useGetProductQuery,
} from "../api";

const selectEnrichedProducts = (searchTerm: string = "") =>
  createSelector(
    selectProductsResult(searchTerm),
    selectCategoryResult,
    (productRes, categoryRes) => {
      const products =
        productRes.data?.ids.map((id) => productRes.data?.entities[id]) || [];
      const categoryMap = categoryRes?.data?.entities || {};

      return products.map((prod) => ({
        ...prod,
        categoryName: prod?.categoryId
          ? categoryMap[prod.categoryId]?.name || "Unknown"
          : "Unknown",
      }));
    }
  );

const selectEnrichedProductsByCategory = (
  categoryId: string,
  searchTerm: string = ""
) =>
  createSelector(
    selectProductsByCategoryResult({ categoryId, searchTerm }),
    selectCategoryResult,
    (productRes, categoryRes) => {
      const products =
        productRes.data?.ids.map((id) => productRes.data?.entities[id]) || [];
      const categoryMap = categoryRes?.data?.entities || {};

      return products.map((prod) => ({
        ...prod,
        categoryName: prod?.categoryId
          ? categoryMap[prod.categoryId]?.name || "Unknown"
          : "Unknown",
      }));
    }
  );

const selectProductWithCategory = createSelector(
  [
    selectProductsResult(),
    selectCategoryResult,
    (_state: RootState, id: string) => id,
  ],
  (productRes, categoryRes, id) => {
    const product = productRes.data?.entities[id];
    const categoryMap = categoryRes?.data?.entities || {};

    if (!product) return null;
    return {
      ...product,
      categoryName: product?.categoryId
        ? categoryMap[product.categoryId]?.name || "Unknown"
        : "Unknown",
    };
  }
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

export const useEnrichedProducts = (searchTerm: string = "") => {
  const enrichedProducts = useAppSelector(selectEnrichedProducts(searchTerm));
  return enrichedProducts;
};

export const useEnrichedProductsByCategory = (
  categoryId: string,
  searchTerm: string = ""
) => {
  const enrichedProducts = useAppSelector(
    selectEnrichedProductsByCategory(categoryId, searchTerm)
  );
  return enrichedProducts;
};

export const useProductWithCategory = (id: string) => {
  const { isLoading, data: productData } = useGetProductQuery(id);
  const productWithCategory = useAppSelector((state: RootState) => {
    const cachedProduct = selectProductWithCategory(state, id);
    if (cachedProduct) return cachedProduct;

    if (productData) {
      const categoryMap = selectCategoryResult(state)?.data?.entities || {};
      return {
        ...productData,
        categoryName: productData?.categoryId
          ? categoryMap[productData.categoryId]?.name || "Unknown"
          : "Unknown",
      };
    }

    return null;
  });

  return { productWithCategory, isLoading };
};
