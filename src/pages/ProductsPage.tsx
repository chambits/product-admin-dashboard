import { Col, Row } from "antd";
import { useCallback, useState } from "react";
import PageTransition from "../components/PageTransition";
import { useGetCategoriesQuery } from "../features/categories/categoryApi";
import AddProductButton from "../features/products/components/AddProductButton";
import ProductSearchBar from "../features/products/components/ProductSearchBar";
import ProductsTable from "../features/products/components/ProductTable";
import { useGetProductsQuery } from "../features/products/api";
import { useEnrichedProducts } from "../features/products/selectors/productSelectors";
import { Product } from "../features/products/types";
import LastModifiedProducts from "../features/products/components/LastModifiedProducts";

export default function ProductsPage() {
  const [searchText, setSearchText] = useState("");
  const { isLoading } = useGetProductsQuery(searchText);
  useGetCategoriesQuery();

  const enrichedProducts = useEnrichedProducts(searchText);

  const searchHandler = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  return (
    <PageTransition>
      <LastModifiedProducts />

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
      <ProductsTable
        data={enrichedProducts as Product[]}
        isLoading={isLoading}
      />
    </PageTransition>
  );
}
