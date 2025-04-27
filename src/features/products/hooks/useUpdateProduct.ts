import { useAppDispatch } from "../../../app/store/hooks";
import { useNotification } from "../../../providers/NotificationProvider";
import { useUpdateProductMutation } from "../api";
import { productQueries } from "../api/productQueries";
import { Product, ProductAttribute, UpdateProductRequest } from "../types";

export const useUpdateProduct = () => {
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { showNotification } = useNotification();
  const dispatch = useAppDispatch();

  const transformAttributes = (
    attributes: Record<string, ProductAttribute> = {}
  ) => {
    return Object.entries(attributes).map(
      ([code, attribute]: [string, ProductAttribute]) => ({
        code,
        value: attribute.value,
      })
    );
  };

  const updateProductData = async (
    productId: string,
    values: UpdateProductRequest,
    options?: {
      onSuccess?: () => void;
    }
  ) => {
    try {
      const productResult = await dispatch(
        productQueries.endpoints.getProduct.initiate(productId)
      );

      const existingProduct = productResult.data;
      const productToUpdate: Product = {
        ...values,
        id: productId,
        attributes: values.attributes
          ? transformAttributes(
              values.attributes as unknown as Record<string, ProductAttribute>
            )
          : [],
        modifiedDate: new Date().toISOString(),
        createdDate: existingProduct?.createdDate || new Date().toISOString(),
        currency: existingProduct?.currency || "$",
        category: {
          id: existingProduct?.category?.id || "",
          name: existingProduct?.category?.name || "",
          parentId: existingProduct?.category?.parentId || "",
        },
      };

      await updateProduct({ ...productToUpdate, id: productId });
      dispatch(productQueries.endpoints.getProducts.initiate(""));

      showNotification("success", "Success", "Product updated successfully");
      options?.onSuccess?.();
    } catch (error) {
      console.error(error);
      showNotification("error", "Error", "Failed to update product");
      throw error;
    }
  };

  return {
    updateProductData,
    transformAttributes,
    isUpdating,
  };
};
