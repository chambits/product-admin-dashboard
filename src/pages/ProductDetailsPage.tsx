import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Flex, Popconfirm, Row, Space } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_MAP } from "../components/Menu";
import PageTransition from "../components/PageTransition";
import { ProductEditView } from "../features/products/components/ProductEditView";
import { ProductView } from "../features/products/components/ProductView";
import { useGetProductsQuery } from "../features/products/productApi";
import { useDeleteProduct } from "../features/products/hooks/useDeleteProduct";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deleteProductData } = useDeleteProduct();
  const [isEditing, setIsEditing] = useState(false);

  const { product } = useGetProductsQuery("", {
    selectFromResult: ({ data }) => ({
      product: data?.find((p) => p.id === id),
    }),
  });

  if (!product)
    return (
      <Flex align="center" vertical gap={16}>
        <Empty description="Product not found" />
        <Button onClick={() => navigate(ROUTE_MAP.products)}>
          Go to products
        </Button>
      </Flex>
    );

  return (
    <PageTransition>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isEditing ? "edit" : "view"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <Card>
                {isEditing ? (
                  <ProductEditView
                    product={product}
                    view="advanced"
                    onCancel={() => setIsEditing(false)}
                    onSuccess={() => setIsEditing(false)}
                  />
                ) : (
                  <>
                    <Flex justify="end" gap={16}>
                      <Space>
                        <Button
                          icon={<EditOutlined />}
                          onClick={() => setIsEditing(true)}
                        >
                          Edit
                        </Button>
                        <Popconfirm
                          title="Delete Product"
                          description="Are you sure you want to delete this product?"
                          onConfirm={() => deleteProductData(product!.id)}
                          okText="Yes"
                          cancelText="No"
                          okButtonProps={{ danger: true }}
                        >
                          <Button danger icon={<DeleteOutlined />}>
                            Delete
                          </Button>
                        </Popconfirm>
                      </Space>
                    </Flex>
                    <ProductView product={product} />
                  </>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </Col>
      </Row>
    </PageTransition>
  );
};

export default ProductDetailsPage;
