import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useCallback } from "react";
import debounce from "lodash.debounce";

interface ProductSearchBarProps {
  onSearch: (value: string) => void;
}

const ProductSearchBar: React.FC<ProductSearchBarProps> = React.memo(
  ({ onSearch }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
      debounce((value: string) => {
        onSearch(value);
      }, 300),
      [onSearch]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    };

    return (
      <Input
        placeholder="Search products..."
        allowClear
        prefix={<SearchOutlined />}
        size="large"
        style={{ width: "100%" }}
        onChange={handleChange}
      />
    );
  }
);

export default ProductSearchBar;
