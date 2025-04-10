import { productQueries } from "./productQueries";
import { productMutations } from "./productMutations";

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
} = productQueries;

export const {
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productMutations;

export const selectProductsResult = (searchTerm: string = "") =>
  productQueries.endpoints.getProducts.select(searchTerm);

export const selectProductsByCategoryResult = (
  params = { categoryId: "", searchTerm: "" }
) => productQueries.endpoints.getProductsByCategory.select(params);
