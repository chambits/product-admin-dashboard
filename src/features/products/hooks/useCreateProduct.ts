import { useNavigate } from "react-router-dom";
import { RouteMap } from "../../../constants";
import { useNotification } from "../../../providers/NotificationProvider";
import { useGetCategoriesQuery } from "../../categories/categoryApi";
import { useAddProductMutation } from "../api";
import { CreateProductRequest, Product } from "../types";

export const useCreateProduct = () => {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { showNotification } = useNotification();
  const { data: categories } = useGetCategoriesQuery();

  const generateSimpleId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `P${timestamp}${random}`;
  };

  const createProduct = async (
    values: CreateProductRequest,
    options?: {
      onSuccess?: () => void;
      redirectAfterCreate?: boolean;
    }
  ) => {
    try {
      const category = categories?.entities[values.category];

      if (!category) {
        throw new Error("Category not found");
      }

      const productToCreate: Product = {
        ...values,
        id: generateSimpleId(),
        createdDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        currency: "$",
        attributes: values.attributes || [],
        category,
      };

      await addProduct(productToCreate);
      showNotification("success", "Success", "Product added successfully");

      if (options?.onSuccess) {
        options.onSuccess();
      }

      if (options?.redirectAfterCreate !== false) {
        navigate(RouteMap.products);
      }
    } catch (error) {
      console.error(error);
      showNotification("error", "Error", "Failed to add product");
      throw error;
    }
  };

  return {
    createProduct,
    generateSimpleId,
    isLoading,
  };
};
