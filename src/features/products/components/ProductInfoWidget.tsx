import styled from "@emotion/styled";
import { Badge } from "../../../components/ui/Badge";
import { Product, ProductStatus } from "../types";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useStatusColor } from "../hooks/useStatusColor";

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  border: 1px solid #d9d9d9;
`;

const Title = styled.h3`
  font-size: 14px;
  margin: 0 0 8px 0;
  font-weight: 500;
  color: grey;
`;

const ProductName = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  flex-wrap: wrap;
`;

interface ProductInfoWidgetProps {
  title: ReactNode;
  product: Product;
}

const ProductInfoWidget: React.FC<ProductInfoWidgetProps> = ({
  title,
  product,
}) => {
  const navigate = useNavigate();
  const { getStatusColor } = useStatusColor();
  return (
    <WidgetContainer onClick={() => navigate(`/products/${product.id}`)}>
      <Title>{title}</Title>
      <ProductName>{product.name}</ProductName>
      <Info>
        <Badge
          color={getStatusColor(product.status as ProductStatus)}
          content={product.status}
        />
        <Badge color="cyan" content={product.category.name} />
        <span>Stock: {product.stock}</span>
      </Info>
    </WidgetContainer>
  );
};

export default ProductInfoWidget;
