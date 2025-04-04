import { Flex, Layout } from "antd";
import { useUiSlice } from "../app/uiSlice";
import Menu from "./Menu";

const { Sider: AntSider } = Layout;

const Sider = () => {
  const { siderCollapsed, setSiderCollapsed } = useUiSlice();
  return (
    <AntSider
      trigger={null}
      collapsible
      collapsed={siderCollapsed}
      onCollapse={setSiderCollapsed}
      breakpoint="lg"
      collapsedWidth="60"
      width="300"
      style={{
        background: "#001529",
        overflowY: "auto",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <Flex vertical>
        <div
          className="logo"
          style={{
            height: "32px",
            margin: "16px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu />
      </Flex>
    </AntSider>
  );
};

export default Sider;
