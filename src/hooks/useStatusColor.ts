import { ProductStatus } from "../features/products/types";

export const useStatusColor = () => {
  const getStatusColor = (status: string) => {
    const statusColors: Record<ProductStatus, string> = {
      Active: "green",
      Inactive: "red",
      "Out of stock": "orange",
      Archived: "gray",
      Draft: "blue",
    };
    return statusColors[status as ProductStatus] || "default";
  };

  return { getStatusColor };
};
