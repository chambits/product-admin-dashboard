import { Descriptions, Typography } from "antd";
import CopyButton from "../../../components/CopyButton";
import { StatusBadge } from "../../../components/StatusBadge";
import { StatusType } from "../../../hooks/useStatusColor";
import { useFormatAttributeLabel } from "../hooks/useFormatAttributeLabel";
import { useRenderAttribute } from "../hooks/useRenderAttribute";
import { Product } from "../types";
import { formatDate } from "../../../utils/dateFormat";

const { Title } = Typography;

interface ProductViewProps {
  product: Product;
}

export const ProductView = ({ product }: ProductViewProps) => {
  const { formatAttributeLabel } = useFormatAttributeLabel();
  const { renderAttribute } = useRenderAttribute(false);

  return (
    <>
      <Title level={2} style={{ marginBottom: 24 }}>
        {product.name}
        <StatusBadge
          status={product.status as StatusType}
          style={{ marginLeft: 12 }}
        />
      </Title>

      <Title level={5} style={{ marginBottom: 16 }}>
        Basic Information
      </Title>
      <Descriptions bordered>
        <Descriptions.Item label="ID">
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {product.id}
            <CopyButton text={product.id} />
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Price">{product.price}</Descriptions.Item>
        <Descriptions.Item label="Stock">{product.stock}</Descriptions.Item>
        <Descriptions.Item label="Category">
          {product.categoryId}
        </Descriptions.Item>
        <Descriptions.Item label="Created">
          {formatDate.full(product.createdDate) === "Invalid date"
            ? ""
            : formatDate.full(product.createdDate)}
        </Descriptions.Item>
        <Descriptions.Item label="Modified">
          {formatDate.full(product.modifiedDate) === "Invalid date"
            ? "Invalid date"
            : formatDate.full(product.modifiedDate)}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {product.description}
        </Descriptions.Item>
      </Descriptions>

      {Array.isArray(product.attributes) && product.attributes.length > 0 && (
        <>
          <Title level={5} style={{ margin: "24px 0 16px" }}>
            Product Specifications
          </Title>
          <Descriptions bordered>
            {product.attributes.map((attr) => (
              <Descriptions.Item
                key={attr.code}
                label={formatAttributeLabel(attr.code)}
              >
                {renderAttribute(attr)}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </>
      )}
    </>
  );
};
