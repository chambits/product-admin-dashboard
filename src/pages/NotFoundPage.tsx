import { Button, Result, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import PageTransition from "../components/PageTransition";
import { RouteMap } from "../constants";

const { Text, Title } = Typography;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <Result
        status="404"
        icon={<Title>404</Title>}
        title="Page Not Found"
        subTitle={
          <Space direction="vertical" size={8}>
            <Text strong style={{ fontSize: 16 }}>
              Sorry, the page you visited does not exist.
            </Text>
            <Text type="secondary" style={{ fontSize: 14 }}>
              The page might have been removed, had its name changed, or is
              temporarily unavailable.
            </Text>
          </Space>
        }
        extra={
          <Space size="middle">
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={() => navigate(RouteMap.home)}
            >
              Back to Home
            </Button>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Space>
        }
      />
    </PageTransition>
  );
};

export default NotFoundPage;
