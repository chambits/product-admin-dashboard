import { HomeOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

interface LogoProps {
  collapsed?: boolean;
  title?: string;
  color?: "black" | "white";
}

export const Logo = ({
  collapsed = false,
  title = "Home PRO",
  color = "white",
}: LogoProps) => {
  return (
    <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
      <Flex align="center" gap={8} justify="center">
        {collapsed ? (
          <HomeOutlined style={{ fontSize: 24, color }} />
        ) : (
          <Flex align="center" gap={8} justify="center">
            <HomeOutlined style={{ fontSize: 24, color }} />
            <Title
              level={2}
              style={{
                color,
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
