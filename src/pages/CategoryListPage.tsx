// import { Card, Col, Row, Space, Table, Tag, Typography } from "antd";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PageTransition from "../components/PageTransition";
// import { useGetCategoriesQuery } from "../features/categories/categoryApi";
// import { Category } from "../features/categories/types";

// const { Title } = Typography;

const CategoryListPage = () => {
  //   const [searchText, setSearchText] = useState("");
  //   const { data: categories, isLoading } = useGetCategoriesQuery();
  //   const navigate = useNavigate();
  //   // Create a flat array of categories from normalized state
  //   const categoryList =
  //     categories?.ids.map((id) => categories.entities[id]) || [];
  //   // Filter categories based on search text
  //   const filteredCategories = categoryList.filter((category) =>
  //     category?.name.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   // Get parent category name
  //   const getParentName = (parentId: string | null | undefined) => {
  //     if (!parentId) return "-";
  //     return categories?.entities[parentId]?.name || "Unknown";
  //   };
  //   // Count products in each category
  //   const getCategoryProductCount = (categoryId: string) => {
  //     // This would ideally be derived from your product data
  //     // For now, we'll just return a random number between 0-50
  //     return Math.floor(Math.random() * 50);
  //   };
  //   const columns = [
  //     {
  //       title: "Category Name",
  //       dataIndex: "name",
  //       key: "name",
  //       render: (text: string, record: Category) => (
  //         <a onClick={() => navigate(`/categories/${record.id}`)}>{text}</a>
  //       ),
  //     },
  //     {
  //       title: "Parent Category",
  //       key: "parentCategory",
  //       render: (_: any, record: Category) => getParentName(record.parentId),
  //     },
  //     {
  //       title: "Products",
  //       key: "products",
  //       render: (_: any, record: Category) => getCategoryProductCount(record.id),
  //     },
  //     {
  //       title: "Type",
  //       key: "type",
  //       render: (_: any, record: Category) =>
  //         record.parentId ? (
  //           <Tag color="blue">Subcategory</Tag>
  //         ) : (
  //           <Tag color="green">Main Category</Tag>
  //         ),
  //     },
  //     {
  //       title: "Actions",
  //       key: "actions",
  //       render: (_: any, record: Category) => (
  //         <Space size="middle">
  //           <a onClick={() => navigate(`/categories/${record.id}`)}>
  //             View Products
  //           </a>
  //         </Space>
  //       ),
  //     },
  //   ];
  //   return (
  //     <PageTransition>
  //       <Card>
  //         <Row
  //           justify="space-between"
  //           align="middle"
  //           style={{ marginBottom: 16 }}
  //         >
  //           <Col>
  //             <Title level={4}>Categories</Title>
  //           </Col>
  //         </Row>
  //         <Table
  //           dataSource={filteredCategories}
  //           columns={columns}
  //           rowKey="id"
  //           loading={isLoading}
  //           pagination={{ pageSize: 10 }}
  //         />
  //       </Card>
  //     </PageTransition>
  //   );
};

export default CategoryListPage;
