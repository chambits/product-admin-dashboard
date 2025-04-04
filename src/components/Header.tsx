import { Layout } from "antd";
import { useUiSlice } from "../app/uiSlice";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

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
        paddingLeft: 16,
      }}
    >
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
    </AntHeader>
  );
};

export default Header;
