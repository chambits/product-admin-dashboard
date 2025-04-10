import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
  Col,
  Divider,
} from "antd";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { useGetCategoriesQuery } from "../features/categories/categoryApi";
import { useCreateProduct } from "../features/products/hooks/useCreateProduct";
import { ProductStatus } from "../features/products/types";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { RouteMap } from "../constants";
const { Title } = Typography;
const { TextArea } = Input;

const ProductAddPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { createProduct, isLoading } = useCreateProduct();
  const { data: categories } = useGetCategoriesQuery();

  const categoryOptions = categories?.ids.map((id) => ({
    label: categories?.entities[id]?.name,
    value: id,
  }));

  return (
    <PageTransition>
      <Card style={{ margin: "0 auto" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={createProduct}
          initialValues={{
            status: "Draft",
            attributes: [],
          }}
        >
          <Title level={5} style={{ marginBottom: 16 }}>
            Basic Information
          </Title>
          <Divider />
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              { required: true, message: "Please input product name!" },
              { min: 3, message: "Name must be at least 3 characters" },
              {
                max: 100,
                message: "Name must be less than 100 characters",
              },
              {
                pattern: /^[a-zA-Z0-9\s]+$/,
                message: "Name must contain only letters, numbers, and spaces",
              },
            ]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select placeholder="Select status">
              {Object.values(ProductStatus).map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select placeholder="Select category" options={categoryOptions} />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input price!" },
              {
                type: "number",
                min: 0,
                message: "Price must be positive!",
              },
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
                message: "Price must be positive!",
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
            <TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Col span={24}>
            <Title level={5} style={{ marginBottom: 16, marginTop: 24 }}>
              Additional Information
            </Title>
            <Divider />
            <Typography.Paragraph type="secondary">
              Add custom attributes for your product such as size, color,
              material, etc. Use lowercase letters and underscores for attribute
              codes.
            </Typography.Paragraph>

            <Form.List name="attributes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "code"]}
                        rules={[
                          { required: true, message: "Missing code" },
                          {
                            pattern: /^[a-z_]+$/,
                            message:
                              "Use lowercase letters and underscores only",
                          },
                        ]}
                      >
                        <Input placeholder="Attribute Code" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        rules={[{ required: true, message: "Missing value" }]}
                      >
                        <Input placeholder="Value" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      variant="dashed"
                      type="primary"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Attribute
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Form.Item>
            <Flex justify="end">
              <Space>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Create Product
                </Button>
                <Button onClick={() => navigate(RouteMap.products)}>
                  Cancel
                </Button>
              </Space>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </PageTransition>
  );
};

export default ProductAddPage;
