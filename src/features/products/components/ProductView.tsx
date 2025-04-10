import { Card, Col, Row, Space, Typography, Tag, Statistic, theme } from "antd";
import CopyButton from "../../../components/CopyButton";
import { StatusBadge } from "../../../components/StatusBadge";
import { formatDate } from "../../../utils/dateFormat";
import { useFormatAttributeLabel } from "../hooks/useFormatAttributeLabel";
import { useRenderAttribute } from "../hooks/useRenderAttribute";
import { Product, ProductStatus } from "../types";
import {
  ShoppingOutlined,
  CalendarOutlined,
  TagOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

interface ProductViewProps {
  product: Product;
}

export const ProductView = ({ product }: ProductViewProps) => {
  const { formatAttributeLabel } = useFormatAttributeLabel();
  const { renderAttribute } = useRenderAttribute(false);
  const { token } = theme.useToken();

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col flex="auto">
            <Space size={16} align="center">
              <Title level={2} style={{ margin: 0 }}>
                {product.name}
              </Title>
              <StatusBadge status={product.status as ProductStatus} />
            </Space>
            <Paragraph type="secondary" style={{ marginTop: token.marginSM }}>
              {product.description || "No description available"}
            </Paragraph>
          </Col>
          <Col>
            <Space wrap>
              <Tag color="blue" icon={<ShoppingOutlined />}>
                {product.currency} {product.price}
              </Tag>
              <Tag color="cyan" icon={<TagOutlined />}>
                {product.categoryName}
              </Tag>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Product ID"
              value={product.id}
              suffix={<CopyButton text={product.id} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Stock"
              value={product.stock}
              prefix={<InboxOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Space direction="vertical" size={4}>
              <Text type="secondary">
                <CalendarOutlined style={{ marginRight: 8 }} />
                Last Updated
              </Text>
              <Text strong>
                {formatDate.full(product.modifiedDate) === "Invalid date"
                  ? "Not available"
                  : formatDate.full(product.modifiedDate)}
              </Text>
              <Text type="secondary">
                Created:{" "}
                {formatDate.full(product.createdDate) === "Invalid date"
                  ? "Not available"
                  : formatDate.full(product.createdDate)}
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>

      {Array.isArray(product.attributes) && product.attributes.length > 0 && (
        <Card
          title={
            <Title level={5} style={{ margin: 0 }}>
              Product Specifications
            </Title>
          }
        >
          <Row gutter={[16, 16]}>
            {product.attributes.map((attr) => (
              <Col xs={24} sm={12} md={8} key={attr.code}>
                <Card
                  size="small"
                  style={{
                    background: token.colorFillQuaternary,
                    borderColor: token.colorBorderSecondary,
                  }}
                >
                  <Space direction="vertical" size={4}>
                    <Text type="secondary">
                      {formatAttributeLabel(attr.code)}
                    </Text>
                    <Text strong>{renderAttribute(attr)}</Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      )}
    </Space>
  );
};
