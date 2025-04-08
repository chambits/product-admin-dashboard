import { HomeOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

interface LogoProps {
  collapsed?: boolean;
  title?: string;
  style?: React.CSSProperties;
}

export const Logo = ({
  collapsed = false,
  title = "Home PRO",
  style,
}: LogoProps) => {
  return (
    <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
      <Flex align="center" gap={8} justify="center" style={style}>
        {collapsed ? (
          <HomeOutlined style={{ fontSize: 24 }} />
        ) : (
          <Flex align="center" gap={8} justify="center">
            <HomeOutlined style={{ fontSize: 24, color: "white" }} />
            <Title
              level={1}
              style={{
                color: "white",
                textAlign: "center",
                marginTop: 16,
              }}
            >
              {title}
            </Title>
          </Flex>
        )}
      </Flex>
    </Link>
  );
};
