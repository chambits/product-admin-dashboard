import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Popconfirm,
  Row,
  Skeleton,
  Space,
} from "antd";
import { Product } from "../features/products/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { ProductEditView } from "../features/products/components/ProductEditView";
import { ProductView } from "../features/products/components/ProductView";
import { useDeleteProduct } from "../features/products/hooks/useDeleteProduct";
import { useProductWithCategory } from "../features/products/selectors/productSelectors";
import { RouteMap } from "../constants";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deleteProductData } = useDeleteProduct();
  const [isEditing, setIsEditing] = useState(false);

  const { productWithCategory: product, isLoading } = useProductWithCategory(
    id ?? ""
  );

  if (isLoading) return <Skeleton active />;

  if (!id)
    return (
      <Flex align="center" vertical gap={16}>
        <Empty description="Product not found" />
        <Button onClick={() => navigate(RouteMap.products)}>
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
        </Col>
      </Row>
    </PageTransition>
  );
};

export default ProductDetailsPage;
