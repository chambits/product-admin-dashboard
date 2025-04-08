export type StatusType =
  | "Active"
  | "Inactive"
  | "Out of stock"
  | "Archived"
  | "Draft";

export const useStatusColor = () => {
  const getStatusColor = (status: string) => {
    const statusColors: Record<StatusType, string> = {
      Active: "green",
      Inactive: "red",
      "Out of stock": "orange",
      Archived: "gray",
      Draft: "blue",
    };
    return statusColors[status as StatusType] || "default";
  };

  return { getStatusColor };
};
