import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  Space,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useUiSlice } from "../app/uiSlice";
import { useNotification } from "../providers/NotificationProvider";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  const { siderCollapsed, setSiderCollapsed } = useUiSlice();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleLogout = () => {
    showNotification("success", "Success", "Logged out successfully");
    navigate("/login");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <Space>
          <UserOutlined />
          Profile
        </Space>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <Space>
          <LogoutOutlined />
          Logout
        </Space>
      ),
      onClick: handleLogout,
      danger: true,
    },
  ];

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

      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
        <Space style={{ cursor: "pointer" }}>
          <Text>{"Admin"}</Text>
          <Avatar icon={<UserOutlined />} size={40} />
          <CaretDownOutlined style={{ fontSize: 12 }} />
        </Space>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;
