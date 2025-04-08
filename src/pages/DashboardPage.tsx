import { Card, Col, Row } from "antd";
import { useGetProductsQuery } from "../features/products/productApi";
import PageTransition from "../components/PageTransition";

const DashboardPage = () => {
  const { data: products } = useGetProductsQuery("");

  return (
    <PageTransition>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card>
            <h3>Total Products</h3>
            <h2>{products?.length || 0}</h2>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card>
            <h3>Active Products</h3>
            <h2>
              {products?.filter((p) => p.status === "Active").length || 0}
            </h2>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card>
            <h3>Out of Stock</h3>
            <h2>
              {products?.filter((p) => p.status === "Out of stock").length || 0}
            </h2>
          </Card>
        </Col>
      </Row>
    </PageTransition>
  );
};

export default DashboardPage;
