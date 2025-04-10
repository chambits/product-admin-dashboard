import { Tag } from "antd";
import { ProductStatus } from "../features/products/types";
interface StatusBadgeProps {
  status: ProductStatus;
  style?: React.CSSProperties;
}

export const StatusBadge = ({ status, style }: StatusBadgeProps) => {
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
    }
  };

  return (
    <Tag color={getStatusColor(status)} style={{ ...style, borderRadius: 12 }}>
      {status}
    </Tag>
  );
};
