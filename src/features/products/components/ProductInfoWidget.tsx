import styled from "@emotion/styled";
import { StatusBadge } from "../../../components/StatusBadge";
import { Product } from "../types";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  border: 1px solid #f0f0f0;
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
  margin-bottom: 4px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
`;

interface ProductInfoWidgetProps {
  title: ReactNode;
  product: Product;
}

const ProductInfoWidget = ({ title, product }: ProductInfoWidgetProps) => {
  const navigate = useNavigate();
  return (
    <WidgetContainer onClick={() => navigate(`/products/${product.id}`)}>
      <Title>{title}</Title>
      <ProductName>{product.name}</ProductName>
      <Info>
        <StatusBadge status={product.status} />
        <span>
          Price: {product.currency}
          {product.price}
        </span>
        <span>Stock: {product.stock}</span>
      </Info>
    </WidgetContainer>
  );
};

export default ProductInfoWidget;
