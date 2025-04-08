import { Breadcrumb as AntBreadcrumb, Typography, Flex } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "../hooks/useBreadCrumbs";

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <>
      <Flex vertical align="flex-start" style={{ margin: 16 }}>
        <AntBreadcrumb>
          <AntBreadcrumb.Item>
            <Link to="/">
              <HomeOutlined />
            </Link>
          </AntBreadcrumb.Item>
          {breadcrumbs.map((crumb) => (
            <AntBreadcrumb.Item key={crumb.path}>
              <Link to={crumb.path}>{crumb.label}</Link>
            </AntBreadcrumb.Item>
          ))}
        </AntBreadcrumb>
        <Typography.Title level={3}>Products list</Typography.Title>
      </Flex>
    </>
  );
};

export default Breadcrumb;
