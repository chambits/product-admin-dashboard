import { EntityState } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";
import { endpoints } from "../../../endpoints";
import { Product } from "../types";
import { productsAdapter, initialState } from "./productsAdapter";

export const productQueries = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<EntityState<Product, string>, string>({
      query: (searchTerm: string) =>
        searchTerm
          ? `${endpoints.products}?q=${searchTerm}`
          : endpoints.products,
      transformResponse: (responseData: Product[]) =>
        productsAdapter.setAll(initialState, responseData),
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
      keepUnusedDataFor: 60,
    }),

    getProduct: builder.query<Product, string>({
      query: (id) => `${endpoints.products}/${id}`,
    }),

    getProductsByCategory: builder.query<
      EntityState<Product, string>,
      { categoryId: string; searchTerm: string }
    >({
      query: ({ categoryId, searchTerm }) =>
        searchTerm
          ? `${endpoints.products}?categoryId=${categoryId}&q=${searchTerm}`
          : `${endpoints.products}?categoryId=${categoryId}`,
      transformResponse: (responseData: Product[]) =>
        productsAdapter.setAll(initialState, responseData),
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({
                type: "ProductsByCategory" as const,
                id,
              })),
              { type: "ProductsByCategory", id: "LIST" },
            ]
          : [{ type: "ProductsByCategory", id: "LIST" }],
    }),
  }),
});
