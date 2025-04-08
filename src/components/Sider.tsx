import { Flex, Layout } from "antd";
import { useUiSlice } from "../app/uiSlice";
import Menu from "./Menu";
import { Logo } from "./Logo";

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
      width="250"
      style={{
        background: "#001529",
        overflowY: "auto",
        // overflowX: "hidden",
        // minHeight: "100vh",
      }}
    >
      <Flex vertical align="center" gap={8} style={{ marginTop: 16 }}>
        <Logo collapsed={siderCollapsed} />
        <Menu />
      </Flex>
    </AntSider>
  );
};

export default Sider;
