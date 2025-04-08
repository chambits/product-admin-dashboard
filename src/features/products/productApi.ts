import { apiSlice } from "../../app/api/apiSlice";
import { endpoints } from "../../endpoints";
import { Product } from "./types";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string>({
      query: (searchTerm: string) =>
        searchTerm
          ? `${endpoints.products}?q=${searchTerm}`
          : endpoints.products,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `${endpoints.products}/${id}`,
    }),
    getProductsByCategory: builder.query<
      Product[],
      { categoryId: string; searchTerm: string }
    >({
      query: ({
        categoryId,
        searchTerm,
      }: {
        categoryId: string;
        searchTerm: string;
      }) =>
        searchTerm
          ? `${endpoints.products}?categoryId=${categoryId}&q=${searchTerm}`
          : `${endpoints.products}?categoryId=${categoryId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "ProductsByCategory" as const,
                id,
              })),
              { type: "ProductsByCategory", id: "LIST" },
            ]
          : [{ type: "ProductsByCategory", id: "LIST" }],
    }),
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

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddProductMutation,
  useGetProductQuery,
} = productApi;
