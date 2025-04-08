import { useAppDispatch } from "../../../app/store/hooks";
import { useNotification } from "../../../providers/NotificationProvider";
import { productApi } from "../../products/productApi";
import { useUpdateProductMutation } from "../productApi";
import { Product, ProductAttribute } from "../types";

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
    values: Product,
    options?: {
      onSuccess?: () => void;
      transformValues?: boolean;
    }
  ) => {
    try {
      const productResult = await dispatch(
        productApi.endpoints.getProduct.initiate(productId)
      );

      const existingProduct = productResult.data;
      console.log(existingProduct, "existingProduct");
      const transformedValues = options?.transformValues
        ? {
            ...values,
            attributes: values.attributes
              ? transformAttributes(
                  values.attributes as unknown as Record<
                    string,
                    ProductAttribute
                  >
                )
              : [],
            modifiedDate: new Date().toISOString(),
            createdDate:
              existingProduct?.createdDate || new Date().toISOString(),
          }
        : values;

      await updateProduct({ ...transformedValues, id: productId });
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
