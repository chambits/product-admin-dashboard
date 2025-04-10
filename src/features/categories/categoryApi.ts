import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { endpoints } from "../../endpoints";
import { Category } from "./types";

const categoriesAdapter = createEntityAdapter<Category>();

const initialState = categoriesAdapter.getInitialState();

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<EntityState<Category, string>, void>({
      query: () => endpoints.categories,
      transformResponse: (responseData: Category[]) =>
        categoriesAdapter.setAll(initialState, responseData),
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
export const selectCategoryResult =
  categoryApi.endpoints.getCategories.select();
