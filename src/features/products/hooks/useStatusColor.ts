import { ProductStatus } from "../types";

export const useStatusColor = () => {
  const getStatusColor = (status: ProductStatus) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "error";
      case "Out of stock":
        return "warning";
      case "Archived":
        return "default";
      case "Draft":
        return "processing";
      default:
        return "default";
    }
  };

  return { getStatusColor };
};
