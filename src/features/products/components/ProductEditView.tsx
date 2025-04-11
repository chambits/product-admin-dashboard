import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNotification } from "../../../providers/NotificationProvider";
import { formatDate } from "../../../utils/dateFormat";
import { useFormatAttributeLabel } from "../hooks/useFormatAttributeLabel";
import { useRenderAttribute } from "../hooks/useRenderAttribute";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import {
  Product,
  ProductAttribute,
  ProductStatus,
  UpdateProductRequest,
} from "../types";
import { AddAttributeModal } from "./AddAttributeModal";
const { Title } = Typography;

interface ProductEditViewProps {
  product: Product;
  view?: "basic" | "advanced";
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ProductEditView: React.FC<ProductEditViewProps> = ({
  product,
  view = "basic",
  onSuccess,
  onCancel,
}: ProductEditViewProps) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [attributeForm] = Form.useForm();
  const [newAttributes, setNewAttributes] = useState<ProductAttribute[]>([]);
  const [existingAttributes, setExistingAttributes] = useState<
    ProductAttribute[]
  >(product.attributes || []);
  const { formatAttributeLabel } = useFormatAttributeLabel();
  const { renderAttribute } = useRenderAttribute(true);
  const { showNotification } = useNotification();
  const { updateProductData, isUpdating } = useUpdateProduct();

  const formInitialValues = useMemo(() => {
    return {
      ...product,
      attributes:
        product.attributes &&
        product.attributes.reduce(
          (acc, attr) => ({
            ...acc,
            [attr.code]: { value: attr.value },
          }),
          {}
        ),
    };
  }, [product]);

  useEffect(() => {
    form.setFieldsValue(formInitialValues);
    setNewAttributes([]);
  }, [form, formInitialValues, product.id]);

  const handleSubmit = async (values: UpdateProductRequest) => {
    try {
      await updateProductData(product.id, values, {
        onSuccess,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAttribute = async () => {
    try {
      const values = await attributeForm.validateFields();
      const attributes = form.getFieldValue("attributes") || {};

      form.setFieldsValue({
        attributes: {
          ...attributes,
          [values.code]: { value: values.value },
        },
      });

      setNewAttributes([
        ...newAttributes,
        { code: values.code, value: values.value },
      ]);

      attributeForm.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
      showNotification("error", "Failed to add attribute");
    }
  };

  const handleDeleteAttribute = async (code: string) => {
    try {
      const currentAttributes = form.getFieldValue("attributes") || {};

      const { ...remainingAttributes } = currentAttributes;
      form.setFieldsValue({ attributes: remainingAttributes });

      if (newAttributes.some((attr) => attr.code === code)) {
        setNewAttributes(newAttributes.filter((attr) => attr.code !== code));
      } else {
        const updatedAttributes = (product.attributes || []).filter(
          (attr) => attr.code !== code
        );

        setExistingAttributes(updatedAttributes);
      }

      showNotification("success", "Success", "Attribute removed successfully");
    } catch (error) {
      console.error(error);
      showNotification("error", "Error", "Failed to remove attribute");
    }
  };

  const specificationsColumns = [
    {
      title: "Attribute",
      dataIndex: "code",
      key: "code",
      render: (code: string) => formatAttributeLabel(code),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (_: unknown, record: ProductAttribute) => renderAttribute(record),
    },
    {
      title: "Actions",
      key: "actions",
      width: 40,
      render: (record: ProductAttribute) => (
        <Space size="small">
          <Tooltip title="Delete">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteAttribute(record.code)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const allAttributes = [...existingAttributes, ...newAttributes];

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={formInitialValues}
        onFinish={handleSubmit}
      >
        {view === "advanced" && (
          <Title level={5} style={{ marginBottom: 16 }}>
            Basic Information
          </Title>
        )}
        <Flex gap={32}>
          <Flex vertical>
            <Typography.Text type="secondary" style={{ marginBottom: 4 }}>
              Product ID
            </Typography.Text>
            <Tag color="blue" style={{ fontSize: "14px", padding: "4px 8px" }}>
              {product.id}
            </Tag>
          </Flex>

          <Flex vertical>
            <Typography.Text type="secondary" style={{ marginBottom: 4 }}>
              Category
            </Typography.Text>
            <Tag color="cyan" style={{ fontSize: "14px", padding: "4px 8px" }}>
              {product.category?.name}
            </Tag>
          </Flex>

          <Flex vertical>
            <Typography.Text type="secondary" style={{ marginBottom: 4 }}>
              Created At
            </Typography.Text>
            <Typography.Text>
              {formatDate.short(product.createdDate)}
            </Typography.Text>
          </Flex>
          <Flex vertical>
            <Typography.Text type="secondary" style={{ marginBottom: 4 }}>
              Last Modified
            </Typography.Text>
            <Typography.Text>
              {formatDate.relative(product.modifiedDate)}
            </Typography.Text>
          </Flex>
        </Flex>
        <Divider />

        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            { required: true, message: "Please input product name!" },
            { min: 3, message: "Name must be at least 3 characters" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select>
            {Object.values(ProductStatus).map((status) => (
              <Select.Option value={status}>{status}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input price!" },
            { type: "number", min: 0, message: "Price must be positive!" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            { required: true, message: "Please input stock!" },
            {
              type: "number",
              min: 0,
              message: "Stock must be non-negative!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ max: 500, message: "Description too long!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {view === "advanced" && (
          <Card
            title={
              <Flex justify="space-between" align="center">
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Additional Information
                </Typography.Title>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalVisible(true)}
                >
                  Add Attribute
                </Button>
              </Flex>
            }
            style={{ marginTop: 24 }}
          >
            {allAttributes.length > 0 ? (
              <Table
                dataSource={allAttributes}
                columns={specificationsColumns}
                pagination={false}
                rowKey="code"
                size="middle"
                bordered
                style={{ marginTop: 16 }}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Space direction="vertical" align="center">
                    <Typography.Text type="secondary">
                      No attributes added yet
                    </Typography.Text>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setIsModalVisible(true)}
                    >
                      Add Attribute
                    </Button>
                  </Space>
                }
                style={{ margin: "32px 0" }}
              />
            )}
          </Card>
        )}
        <Form.Item style={{ marginTop: 24 }}>
          <Flex justify="end" gap={16}>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              Save Changes
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                onCancel?.();
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Form.Item>
      </Form>

      <AddAttributeModal
        open={isModalVisible}
        onCancel={() => {
          attributeForm.resetFields();
          setIsModalVisible(false);
        }}
        onOk={handleAddAttribute}
        form={attributeForm}
        existingAttributes={allAttributes}
      />
    </>
  );
};
