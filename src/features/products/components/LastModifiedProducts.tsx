import { Col, Row } from "antd";
import React from "react";
import { formatDate } from "../../../utils/dateFormat";
import { useLastModifiedProducts } from "../hooks/useLastModifiedProducts";
import ProductInfoWidget from "./ProductInfoWidget";

const LastModifiedProducts = React.memo(() => {
  const { lastModifiedProducts } = useLastModifiedProducts(3);
  return (
    <Row gutter={[16, 16]}>
      {lastModifiedProducts.map((product) => {
        return (
          <Col xs={24} md={8} lg={8} key={product.id}>
            <ProductInfoWidget
              title={`Last Modified ${formatDate.relative(
                product.modifiedDate
              )}`}
              product={product}
            />
          </Col>
        );
      })}
    </Row>
  );
});
export default LastModifiedProducts;
