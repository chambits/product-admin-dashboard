import {
  CaretDownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  Space,
  Typography,
} from "antd";
import { useUiSlice } from "../../app/ui/uiSlice";
import { useAuth } from "../../features/auth/authSlice";
import { useNotification } from "../../providers/NotificationProvider";
const { Header: AntHeader } = Layout;
const { Text } = Typography;

const AppHeader = styled(AntHeader)`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
`;

const Header = () => {
  const { siderCollapsed, setSiderCollapsed } = useUiSlice();
  const { showNotification } = useNotification();
  const { logout, auth } = useAuth();
  const { user } = auth;

  const logoutHandler = () => {
    logout();
    showNotification("success", "Success", "Logged out successfully");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <Space>
          <LogoutOutlined />
          Logout
        </Space>
      ),
      onClick: logoutHandler,
      danger: true,
    },
  ];

  return (
    <AppHeader>
      <Flex align="center" gap={16}>
        {siderCollapsed ? (
          <Button
            size="large"
            name="menu-unfold"
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={() => setSiderCollapsed(!siderCollapsed)}
          />
        ) : (
          <Button
            size="large"
            name="menu-fold"
            type="text"
            icon={<MenuFoldOutlined />}
            onClick={() => setSiderCollapsed(!siderCollapsed)}
          />
        )}
      </Flex>

      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
        <Space style={{ cursor: "pointer" }}>
          <Text>{user?.firstName}</Text>
          <Avatar icon={<UserOutlined />} size={40} />
          <CaretDownOutlined style={{ fontSize: 12 }} />
        </Space>
      </Dropdown>
    </AppHeader>
  );
};

export default Header;
