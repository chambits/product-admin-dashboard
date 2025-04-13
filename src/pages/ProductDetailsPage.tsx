import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Empty, Flex, Popconfirm, Row, Space } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
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

  const editHandler = useCallback(() => {
    setIsEditing(true);
  }, []);

  const cancelHandler = useCallback(() => {
    setIsEditing(false);
  }, []);

  const deleteHandler = useCallback(() => {
    deleteProductData(product!.id);
  }, [deleteProductData, product]);

  const actionButtons = useMemo(
    () => (
      <Flex justify="end" gap={16}>
        <Space>
          <Button icon={<EditOutlined />} onClick={editHandler}>
            Edit
          </Button>
          <Popconfirm
            title="Delete Product"
            onConfirm={deleteHandler}
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
    ),
    [editHandler, deleteHandler]
  );

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
                      onCancel={cancelHandler}
                      onSuccess={() => setIsEditing(false)}
                    />
                  ) : (
                    <Flex vertical gap={16}>
                      <Flex justify="end" gap={16} style={{ flexWrap: "wrap" }}>
                        <Button
                          icon={<ArrowLeftOutlined />}
                          onClick={() => navigate(RouteMap.products)}
                          type="link"
                          style={{ marginLeft: -8 }}
                        >
                          Back to Products
                        </Button>
                        {actionButtons}
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
