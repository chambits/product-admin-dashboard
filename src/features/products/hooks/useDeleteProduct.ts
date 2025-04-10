import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../providers/NotificationProvider";
import { useDeleteProductMutation } from "../api";
import { RouteMap } from "../../../constants";

export const useDeleteProduct = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [deleteProduct] = useDeleteProductMutation();

  const deleteProductData = async (
    id: string,
    options?: {
      onSuccess?: () => void;
      redirectAfterDelete?: boolean;
    }
  ) => {
    try {
      await deleteProduct(id);
      showNotification("success", "Success", "Product deleted successfully");

      if (options?.onSuccess) {
        options.onSuccess();
      }

      if (options?.redirectAfterDelete !== false) {
        navigate(RouteMap.products);
      }
    } catch (error) {
      console.error(error);
      showNotification("error", "Error", "Failed to delete product");
    }
  };

  return { deleteProductData };
};
