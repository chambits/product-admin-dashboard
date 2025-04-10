import { apiSlice } from "../../../app/api/apiSlice";
import { endpoints } from "../../../endpoints";
import { Product } from "../types";

export const productMutations = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: endpoints.products,
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: `${endpoints.products}/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    deleteProduct: builder.mutation<Product, string>({
      query: (id) => ({
        url: `${endpoints.products}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});
