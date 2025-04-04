import { Card, Layout } from "antd";
import React from "react";
import Breadcrumb from "./components/Breadcrumb";
import Header from "./components/Header";
import Sider from "./components/Sider";

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Breadcrumb />
        <Content
          style={{
            margin: "0 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
            borderRadius: 10,
            marginBottom: 16,
          }}
        >
          <Card>{children}</Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
