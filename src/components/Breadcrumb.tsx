import { Breadcrumb as AntBreadcrumb, Typography, Flex } from "antd";

const Breadcrumb = () => {
  return (
    <>
      <Flex vertical align="flex-start" style={{ margin: 16 }}>
        <AntBreadcrumb>
          <AntBreadcrumb.Item>User</AntBreadcrumb.Item>
          <AntBreadcrumb.Item>Bill</AntBreadcrumb.Item>
        </AntBreadcrumb>
        <Typography.Title level={3}>Products</Typography.Title>
      </Flex>
    </>
  );
};

export default Breadcrumb;
