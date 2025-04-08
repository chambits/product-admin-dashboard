import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Descriptions,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";
import { useMemo, useState, useEffect } from "react";
import { useNotification } from "../../../providers/NotificationProvider";
import { useFormatAttributeLabel } from "../hooks/useFormatAttributeLabel";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useRenderAttribute } from "../hooks/useRenderAttribute";
import { Product, ProductAttribute } from "../types";
import { AddAttributeModal } from "./AddAttributeModal";

const { Title } = Typography;

interface ProductEditViewProps {
  product: Product;
  view?: "basic" | "advanced";
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ProductEditView = ({
  product,
  view = "basic",
  onSuccess,
  onCancel,
}: ProductEditViewProps) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [attributeForm] = Form.useForm();
  const [newAttributes, setNewAttributes] = useState<ProductAttribute[]>([]);
  const { formatAttributeLabel } = useFormatAttributeLabel();
  const { renderAttribute } = useRenderAttribute(true);
  const { showNotification } = useNotification();
  const { updateProductData, isUpdating } = useUpdateProduct();

  const formInitialValues = useMemo(() => {
    return {
      ...product,
      attributes: product.attributes.reduce(
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

  const handleSubmit = async (values: Product) => {
    try {
      await updateProductData(product.id, values, {
        transformValues: true,
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

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={formInitialValues}
        onFinish={handleSubmit}
      >
        <Title level={2} style={{ marginBottom: 24 }}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input product name!" },
              { min: 3, message: "Name must be at least 3 characters" },
            ]}
            style={{
              marginBottom: 0,
              display: "inline-block",
              width: "calc(100% - 120px)",
            }}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
            style={{
              marginBottom: 0,
              display: "inline-block",
              width: "120px",
              paddingLeft: 12,
            }}
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
              <Select.Option value="Out of stock">Out of stock</Select.Option>
              <Select.Option value="Archived">Archived</Select.Option>
              <Select.Option value="Draft">Draft</Select.Option>
            </Select>
          </Form.Item>
        </Title>

        <Title level={5} style={{ marginBottom: 16 }}>
          Basic Information
        </Title>
        <Descriptions bordered>
          <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
          <Descriptions.Item label="Price">
            <Form.Item
              name="price"
              rules={[
                { required: true, message: "Please input price!" },
                { type: "number", min: 0, message: "Price must be positive!" },
              ]}
              style={{ marginBottom: 0 }}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Stock">
            <Form.Item
              name="stock"
              rules={[
                { required: true, message: "Please input stock!" },
                {
                  type: "number",
                  min: 0,
                  message: "Stock must be non-negative!",
                },
              ]}
              style={{ marginBottom: 0 }}
              hasFeedback
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            <Form.Item
              name="categoryId"
              rules={[{ required: true, message: "Please input category!" }]}
              style={{ marginBottom: 0 }}
            >
              <Input />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            <Form.Item
              name="description"
              rules={[{ max: 500, message: "Description too long!" }]}
              style={{ marginBottom: 0 }}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>

        {view === "advanced" && (
          <>
            <Title level={5} style={{ margin: "24px 0 16px" }}>
              Product Specifications
              <Button
                variant="outlined"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                style={{ marginLeft: 16 }}
              >
                Add
              </Button>
            </Title>

            <Descriptions bordered>
              {Array.isArray(product.attributes) &&
                product.attributes.map((attr) => (
                  <Descriptions.Item
                    key={attr.code}
                    label={formatAttributeLabel(attr.code)}
                  >
                    {renderAttribute(attr)}
                  </Descriptions.Item>
                ))}

              {newAttributes.map((attr) => (
                <Descriptions.Item
                  key={attr.code}
                  label={formatAttributeLabel(attr.code)}
                >
                  {renderAttribute(attr)}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </>
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
        existingAttributes={[...product.attributes, ...newAttributes]}
      />
    </>
  );
};
