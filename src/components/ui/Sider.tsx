import { Flex, Layout } from "antd";
import { useUiSlice } from "../../app/ui/uiSlice";
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
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
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
