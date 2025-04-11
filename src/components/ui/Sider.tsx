import { Flex, Layout } from "antd";
import { useUiSlice } from "../../app/ui/uiSlice";
import Menu from "./Menu";
import { Logo } from "./Logo";
import styled from "@emotion/styled";

const { Sider: AntSider } = Layout;

const StyledSider = styled(AntSider)`
  background: "#001529";
  overflow: auto;
  height: "100vh";
  position: "sticky";
  inset-inline-start: 0;
  top: 0;
  bottom: 0;
  scrollbar-width: "thin";
  scrollbar-gutter: "stable";
`;

const Sider = () => {
  const { siderCollapsed, setSiderCollapsed } = useUiSlice();

  return (
    <StyledSider
      trigger={null}
      collapsible
      collapsed={siderCollapsed}
      onCollapse={setSiderCollapsed}
      breakpoint="lg"
      collapsedWidth="60"
      width="250"
    >
      <Flex vertical align="center" gap={8} style={{ marginTop: 16 }}>
        <Logo collapsed={siderCollapsed} />
        <Menu />
      </Flex>
    </StyledSider>
  );
};

export default Sider;
