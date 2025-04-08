import { useMemo } from "react";
import { useGetProductsQuery } from "../productApi";

export const useLastModifiedProducts = (limit: number = 3) => {
  const { data: products = [], isLoading } = useGetProductsQuery("");

  const lastModifiedProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const dateA = new Date(a.modifiedDate).getTime();
        const dateB = new Date(b.modifiedDate).getTime();
        return dateB - dateA;
      })
      .slice(0, limit);
  }, [products, limit]);

  return {
    lastModifiedProducts,
    isLoading,
  };
};
