import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter
      style={{
        textAlign: "center",
        background: "#f0f2f5",
        padding: "12px",
      }}
    >
      Ant Design ©2025 Created by Ant UED
    </AntFooter>
  );
};

export default Footer;
