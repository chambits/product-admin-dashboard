import {
  DeleteOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Empty, Flex, Popconfirm, Row, Space } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { RouteMap } from "../constants";
import { ProductEditView } from "../features/products/components/ProductEditView";
import { ProductView } from "../features/products/components/ProductView";
import { useDeleteProduct } from "../features/products/hooks/useDeleteProduct";
import { useProductById } from "../features/products/selectors/productSelectors";
import { Product } from "../features/products/types";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deleteProductData } = useDeleteProduct();
  const [isEditing, setIsEditing] = useState(false);
  const { product } = useProductById(id ?? "");

  if (!product) {
    return (
      <Flex align="center" vertical gap={16}>
        <Empty
          description="Unable to find product details for this product"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <Button onClick={() => navigate(RouteMap.products)}>
          Go to products
        </Button>
      </Flex>
    );
  }

  return (
    <PageTransition>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Flex vertical gap={16}>
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
                      product={product as Product}
                      view="advanced"
                      onCancel={() => setIsEditing(false)}
                      onSuccess={() => setIsEditing(false)}
                    />
                  ) : (
                    <Flex vertical gap={16}>
                      <Flex justify="end" gap={16}>
                        <Space>
                          <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate(RouteMap.products)}
                            type="link"
                            style={{ marginLeft: -8 }}
                          >
                            Back to Products
                          </Button>
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
                      <Flex vertical gap={16}>
                        <ProductView product={product as Product} />
                      </Flex>
                    </Flex>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>
          </Flex>
        </Col>
      </Row>
    </PageTransition>
  );
};

export default ProductDetailsPage;
