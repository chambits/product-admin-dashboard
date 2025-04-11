import styled from "@emotion/styled";
import { ReactNode } from "react";

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

const MainContent = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  flex-wrap: wrap;
`;

interface ProductInfoWidgetProps {
  title: ReactNode;
  mainContent: ReactNode;
  info: ReactNode;
  onClick: () => void;
}

const ProductInfoWidget: React.FC<ProductInfoWidgetProps> = ({
  title,
  mainContent,
  info,
  onClick,
}) => {
  return (
    <WidgetContainer onClick={onClick}>
      <Title>{title}</Title>
      <MainContent>{mainContent}</MainContent>
      <InfoContainer>{info}</InfoContainer>
    </WidgetContainer>
  );
};

export default ProductInfoWidget;
