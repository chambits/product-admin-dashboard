import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Skeleton } from "antd";
import React, { useCallback } from "react";
import { formatDate } from "../../../utils/dateFormat";
import { useLastModifiedProducts } from "../selectors/productSelectors";
import ProductInfoWidget from "./ProductInfoWidget";
import { Badge } from "../../../components/ui/Badge";
import { ProductStatus } from "../types";
import { useStatusColor } from "../../../hooks/useStatusColor";
import { useNavigate } from "react-router-dom";

const ProductSkeleton = () => (
  <Card>
    <Skeleton.Input active block style={{ marginBottom: 16 }} />
    <Skeleton.Input active block size="large" style={{ marginBottom: 8 }} />
    <Skeleton.Input active block style={{ width: "60%" }} />
  </Card>
);

const LastModifiedProducts: React.FC = React.memo(() => {
  const { lastModifiedEntities } = useLastModifiedProducts(3);
  const { getStatusColor } = useStatusColor();
  const navigate = useNavigate();

  const navigateHandler = useCallback(
    (id: string) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );

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
              mainContent={product.name}
              info={
                <>
                  <Badge
                    color={getStatusColor(product.status as ProductStatus)}
                    content={product.status}
                  />
                  <Badge color="cyan" content={product.category.name} />
                  <span>Stock: {product.stock}</span>
                </>
              }
              onClick={() => navigateHandler(product.id)}
            />
          </Col>
        );
      })}
    </Row>
  );
});

export default LastModifiedProducts;
