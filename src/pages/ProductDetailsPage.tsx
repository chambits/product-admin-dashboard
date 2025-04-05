import {
  Card,
  Descriptions,
  Tag,
  Typography,
  Row,
  Col,
  Button,
  Input,
  Form,
  InputNumber,
  Select,
  Popconfirm,
  message,
  Space,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductsQuery,
  // useUpdateProductMutation,
  // useDeleteProductMutation,
} from "../features/products/productApi";
import { useState } from "react";
import { EditOutlined, SaveOutlined, DeleteOutlined } from "@ant-design/icons";
// import { ProductAttribute } from "../features/products/types";

const { Title } = Typography;
const { Option } = Select;

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const { product } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      product: data?.find((p) => p.id === id),
    }),
  });

  // const [updateProduct] = useUpdateProductMutation();
  // const [deleteProduct] = useDeleteProductMutation();

  const getStatusColor = (status: string) => {
    const statusColors = {
      Active: "green",
      Inactive: "red",
      "Out of stock": "orange",
      Archived: "gray",
      Draft: "blue",
    };
    return statusColors[status as keyof typeof statusColors] || "default";
  };

  const handleSubmit = async (values: any) => {
    try {
      // Transform attributes back to array format
      // const transformedValues = {
      //   ...values,
      //   attributes: Object.entries(values.attributes || {}).map(
      //     ([code, value]) => ({
      //       code,
      //       value: value.value,
      //     })
      //   ),
      // };

      // await updateProduct({ id, ...transformedValues });
      setIsEditing(false);
      message.success("Product updated successfully");
    } catch (error) {
      message.error("Failed to update product");
    }
  };

  const handleDelete = async () => {
    try {
      // await deleteProduct(id);
      message.success("Product deleted successfully");
      // navigate("/products");
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  if (!product) return null;

  const statusOptions = [
    "Active",
    "Inactive",
    "Out of stock",
    "Archived",
    "Draft",
  ];

  // Transform attributes to object format for form
  const initialValues = {
    ...product,
    attributes: product.attributes.reduce(
      (acc, attr) => ({
        ...acc,
        [attr.code]: { value: attr.value },
      }),
      {}
    ),
  };

  const formatAttributeLabel = (code: string) => {
    return code
      .split(/[_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const renderAttributeValue = (attr: { code: string; value: any }) => {
    if (typeof attr.value === "boolean") {
      return attr.value ? "Yes" : "No";
    } else if (Array.isArray(attr.value)) {
      return (
        <Space size={[0, 8]} wrap>
          {!isEditing &&
            attr.value.map((tag: string, index: number) => (
              <Tag key={index} style={{ marginRight: 3 }}>
                {tag}
              </Tag>
            ))}
          {isEditing && (
            <Form.Item
              name={["attributes", attr.code, "value"]}
              style={{ marginBottom: 0, display: "inline-block" }}
            >
              <Select
                mode="tags"
                style={{ width: "100%", minWidth: 200 }}
                placeholder="Add tags"
                defaultValue={attr.value}
              />
            </Form.Item>
          )}
        </Space>
      );
    }

    // Handle regular input for non-tag attributes
    return isEditing ? (
      <Form.Item
        name={["attributes", attr.code, "value"]}
        style={{ marginBottom: 0 }}
      >
        <Input />
      </Form.Item>
    ) : (
      attr.value
    );
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card
          extra={
            <Space>
              {isEditing ? (
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => form.submit()}
                >
                  Save
                </Button>
              ) : (
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
              <Popconfirm
                title="Delete Product"
                description="Are you sure you want to delete this product?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
                okButtonProps={{ danger: true }}
                align={{ offset: [-10, 0] }}
              >
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          }
        >
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Title level={2}>
              {isEditing ? (
                <Form.Item name="name" style={{ marginBottom: 0 }}>
                  <Input />
                </Form.Item>
              ) : (
                product.name
              )}
            </Title>

            <Descriptions
              bordered
              column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
              <Descriptions.Item label="Category ID">
                {product.categoryId}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                {isEditing ? (
                  <Form.Item name="price" style={{ marginBottom: 0 }}>
                    <Input />
                  </Form.Item>
                ) : (
                  product.price
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Stock">
                {isEditing ? (
                  <Form.Item name="stock" style={{ marginBottom: 0 }}>
                    <InputNumber min={0} />
                  </Form.Item>
                ) : (
                  product.stock
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {isEditing ? (
                  <Form.Item name="status" style={{ marginBottom: 0 }}>
                    <Select style={{ width: 120 }}>
                      {statusOptions.map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : (
                  <Tag color={getStatusColor(product.status)}>
                    {product.status}
                  </Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={3}>
                {isEditing ? (
                  <Form.Item name="description" style={{ marginBottom: 0 }}>
                    <Input.TextArea rows={4} />
                  </Form.Item>
                ) : (
                  product.description
                )}
              </Descriptions.Item>
            </Descriptions>

            <Title level={3} style={{ marginTop: 24 }}>
              Attributes
            </Title>
            <Descriptions
              bordered
              column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
            >
              {product.attributes.map((attr) => (
                <Descriptions.Item
                  key={attr.code}
                  label={formatAttributeLabel(attr.code)}
                  span={1}
                >
                  {renderAttributeValue(attr)}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetailsPage;
