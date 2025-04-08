import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

interface ProductSearchBarProps {
  onSearch: (value: string) => void;
}

const ProductSearchBar = React.memo(({ onSearch }: ProductSearchBarProps) => {
  console.log("ProductSearchBar");

  return (
    <Input
      placeholder="Search products..."
      allowClear
      prefix={<SearchOutlined />}
      size="large"
      style={{ width: "100%" }}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
});

export default ProductSearchBar;
