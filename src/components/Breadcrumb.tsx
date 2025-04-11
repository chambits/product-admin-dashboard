import { Breadcrumb as AntBreadcrumb, Typography, Flex } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "../hooks/useBreadCrumbs";

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();
  const title = breadcrumbs[breadcrumbs.length - 1]?.title;

  const items = [
    {
      title: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...breadcrumbs.map((crumb) => ({
      title: <Link to={crumb.path}>{crumb.label}</Link>,
    })),
  ];

  return (
    <Flex vertical align="flex-start" style={{ margin: 16 }}>
      <AntBreadcrumb items={items} />
      <Typography.Title level={3}>{title}</Typography.Title>
    </Flex>
  );
};

export default Breadcrumb;
