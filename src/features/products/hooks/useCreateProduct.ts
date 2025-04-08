import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../providers/NotificationProvider";
import { useAddProductMutation } from "../productApi";
import { ROUTE_MAP } from "../../../components/Menu";
import { Product } from "../types";

export const useCreateProduct = () => {
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();
  const { showNotification } = useNotification();

  const generateSimpleId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `P${timestamp}${random}`;
  };

  const createProduct = async (
    values: Product,
    options?: {
      onSuccess?: () => void;
      redirectAfterCreate?: boolean;
    }
  ) => {
    try {
      const productWithId = {
        ...values,
        id: generateSimpleId(),
        createdDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
      };

      await addProduct(productWithId);
      showNotification("success", "Success", "Product added successfully");

      if (options?.onSuccess) {
        options.onSuccess();
      }

      if (options?.redirectAfterCreate !== false) {
        navigate(ROUTE_MAP.products);
      }
    } catch (error) {
      console.error(error);
      showNotification("error", "Error", "Failed to add product");
      throw error; // Re-throw to let component handle if needed
    }
  };

  return {
    createProduct,
    generateSimpleId,
  };
};
