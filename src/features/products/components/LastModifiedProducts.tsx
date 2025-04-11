import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Skeleton } from "antd";
import React from "react";
import { formatDate } from "../../../utils/dateFormat";
import { useLastModifiedProducts } from "../selectors/productSelectors";
import ProductInfoWidget from "./ProductInfoWidget";

const ProductSkeleton = () => (
  <Card>
    <Skeleton.Input active block style={{ marginBottom: 16 }} />
    <Skeleton.Input active block size="large" style={{ marginBottom: 8 }} />
    <Skeleton.Input active block style={{ width: "60%" }} />
  </Card>
);

const LastModifiedProducts = React.memo(() => {
  const { lastModifiedEntities } = useLastModifiedProducts(3);

  if (lastModifiedEntities.length === 0) {
    return (
      <Row gutter={[16, 16]}>
        {[1, 2, 3].map((key) => (
          <Col xs={24} md={8} lg={8} key={key}>
            <ProductSkeleton />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {lastModifiedEntities.map((product) => {
        return (
          <Col xs={24} md={8} lg={8} key={product.id}>
            <ProductInfoWidget
              title={
                <>
                  <ClockCircleOutlined style={{ marginRight: 8 }} />
                  Updated {formatDate.relative(product.modifiedDate)}
                </>
              }
              product={product}
            />
          </Col>
        );
      })}
    </Row>
  );
});

export default LastModifiedProducts;
