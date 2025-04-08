import { Col, Row } from "antd";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import AddProductButton from "../features/products/components/AddProductButton";
import ProductSearchBar from "../features/products/components/ProductSearchBar";
import ProductsTable from "../features/products/components/ProductTable";
import { useGetProductsByCategoryQuery } from "../features/products/productApi";

const CategoriesPage = () => {
  const [searchText, setSearchText] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useGetProductsByCategoryQuery({
    categoryId: id || "",
    searchTerm: searchText,
  });
  const searchHandler = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginTop: 24, marginBottom: 16 }}
        gutter={[16, 16]}
      >
        <Col>
          <ProductSearchBar onSearch={searchHandler} />
        </Col>
        <Col>
          <AddProductButton />
        </Col>
      </Row>
      <ProductsTable data={data} isLoading={isLoading} />
    </>
  );
};

export default CategoriesPage;
