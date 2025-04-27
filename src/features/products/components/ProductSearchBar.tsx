import { SearchOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import debounce from "lodash.debounce";
import React, { useCallback, useTransition } from "react";

interface ProductSearchBarProps {
  onSearch: (value: string) => void;
}

const ProductSearchBar: React.FC<ProductSearchBarProps> = React.memo(
  ({ onSearch }) => {
    const [isPending, startTransition] = useTransition();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
      debounce((value: string) => {
        startTransition(() => {
          onSearch(value);
        });
      }, 300),
      [onSearch]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      debouncedSearch(value);
    };

    return (
      <Input
        placeholder="Search products..."
        allowClear
        prefix={isPending ? <Spin size="small" /> : <SearchOutlined />}
        size="large"
        onChange={handleChange}
      />
    );
  }
);

export default ProductSearchBar;
