import { Button, Result, Typography } from "antd";
import { CloseCircleOutlined, ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface ErrorViewProps {
  error?: Error;
  resetError?: () => void;
}

export const ErrorView = ({ resetError }: ErrorViewProps) => {
  return (
    <Result
      status="error"
      icon={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
      title="Oops! Something went wrong"
      subTitle={<Text type="secondary">{"An unexpected error occurred"}</Text>}
      extra={[
        <Button
          key="reload"
          type="primary"
          icon={<ReloadOutlined />}
          onClick={() => {
            resetError?.();
          }}
        >
          Try Again
        </Button>,
      ]}
    />
  );
};
