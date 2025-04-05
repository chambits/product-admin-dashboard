import { Flex, Layout, Avatar, Space } from "antd";
import { useUiSlice } from "../app/uiSlice";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = () => {
  const { siderCollapsed, setSiderCollapsed } = useUiSlice();

  return (
    <AntHeader
      style={{
        background: "#fff",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <Flex align="center" gap={16}>
        {siderCollapsed ? (
          <MenuUnfoldOutlined
            className="trigger"
            onClick={() => setSiderCollapsed(!siderCollapsed)}
          />
        ) : (
          <MenuFoldOutlined
            className="trigger"
            onClick={() => setSiderCollapsed(!siderCollapsed)}
          />
        )}
      </Flex>
      <Space>
        <Avatar icon={<UserOutlined />} size={40} />
      </Space>
    </AntHeader>
  );
};

export default Header;
