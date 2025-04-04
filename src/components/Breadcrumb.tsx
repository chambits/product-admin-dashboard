import { Breadcrumb as AntBreadcrumb } from "antd";

const Breadcrumb = () => {
  return (
    <AntBreadcrumb style={{ margin: "16px 16px" }}>
      <AntBreadcrumb.Item>User</AntBreadcrumb.Item>
      <AntBreadcrumb.Item>Bill</AntBreadcrumb.Item>
    </AntBreadcrumb>
  );
};

export default Breadcrumb;
