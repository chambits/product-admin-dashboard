import { Layout } from "antd";
import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Sider from "../components/Sider";
import { useGetCategoriesQuery } from "../features/categories/categoryApi";
import { Outlet } from "react-router-dom";

const { Content } = Layout;
const MainLayout: React.FC = () => {
  useGetCategoriesQuery();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Breadcrumb />
        <Content
          style={{
            margin: "0 16px",
            minHeight: 280,
            borderRadius: 10,
            marginBottom: 16,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
