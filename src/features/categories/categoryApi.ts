import { apiSlice } from "../../app/api/apiSlice";
import { endpoints } from "../../endpoints";

export interface Category {
  id: number;
  parent_id?: number;
  name: string;
  slug: string;
  level: number;
}

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => endpoints.categories,
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
