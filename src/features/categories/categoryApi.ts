import { apiSlice } from "../../app/api/apiSlice";
import { endpoints } from "../../endpoints";
import { Category } from "./types";
export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => endpoints.categories,
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
