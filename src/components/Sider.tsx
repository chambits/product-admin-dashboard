import { Layout } from "antd";
import Menu from "./Menu";
import { useUiSlice } from "../app/uiSlice";

const { Sider: AntSider } = Layout;

const Sider = () => {
  const { siderCollapsed, setSiderCollapsed } = useUiSlice();
  return (
    <AntSider
      collapsible
      collapsed={siderCollapsed}
      onCollapse={setSiderCollapsed}
      breakpoint="lg"
      collapsedWidth="60"
      width="250"
      style={{
        background: "#001529",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div
        className="logo"
        style={{
          height: "32px",
          margin: "16px",
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu />
    </AntSider>
  );
};

export default Sider;
