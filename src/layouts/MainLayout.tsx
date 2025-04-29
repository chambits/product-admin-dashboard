import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/ui/Header";
import Sider from "../components/ui/Sider";
import { useGetCategoriesQuery } from "../features/categories/categoryApi";
import styled from "@emotion/styled";

const { Content } = Layout;

const ContentWrapper = styled(Content)`
  margin: 0 16px;
  min-height: 280px;
  border-radius: 10px;
  margin-bottom: 16px;
`;

const MainLayout: React.FC = () => {
  useGetCategoriesQuery();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Breadcrumb />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
