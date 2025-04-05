import { apiSlice } from "../../app/api/apiSlice";
import { endpoints } from "../../endpoints";
import { Product } from "./types";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => endpoints.products,
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
