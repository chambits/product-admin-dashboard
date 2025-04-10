import { Col, Row } from "antd";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "../features/products/api";
import AddProductButton from "../features/products/components/AddProductButton";
import LastModifiedProducts from "../features/products/components/LastModifiedProducts";
import ProductSearchBar from "../features/products/components/ProductSearchBar";
import ProductsTable from "../features/products/components/ProductTable";
import { useEnrichedProductsByCategory } from "../features/products/selectors/productSelectors";
import { Product } from "../features/products/types";

const CategoriesDetailsPage = () => {
  const [searchText, setSearchText] = useState("");
  const { id } = useParams();
  const { isLoading: isProductsLoading } = useGetProductsQuery(searchText);
  useGetProductsByCategoryQuery(
    {
      categoryId: id || "",
      searchTerm: searchText,
    },
    { skip: !id }
  );
  const enrichedProducts = useEnrichedProductsByCategory(id || "", searchText);

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
        isLoading={isProductsLoading}
      />
    </PageTransition>
  );
};

export default CategoriesDetailsPage;
