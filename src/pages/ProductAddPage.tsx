import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE_MAP } from "../components/Menu";
import PageTransition from "../components/PageTransition";
import { useCreateProduct } from "../features/products/hooks/useCreateProduct";

const { Title } = Typography;

const ProductAddPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { createProduct } = useCreateProduct();

  //   const generateSimpleId = () => {
  //     const timestamp = Date.now().toString().slice(-6);
  //     const random = Math.floor(Math.random() * 1000)
  //       .toString()
  //       .padStart(3, "0");
  //     return `p${timestamp}${random}`;
  //   };

  //   const handleSubmit = async (values: Product) => {
  //     try {
  //       const productWithId = {
  //         ...values,
  //         id: generateSimpleId(),
  //         createdDate: new Date().toISOString(),
  //         modifiedDate: new Date().toISOString(),
  //       };

  //       await addProduct(productWithId);
  //       showNotification("success", "Success", "Product added successfully");
  //       navigate(ROUTE_MAP.products);
  //     } catch (error) {
  //       console.log(error);
  //       showNotification("error", "Error", "Failed to add product");
  //     }
  //   };

  return (
    <PageTransition>
      <Card style={{ width: "100%" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={createProduct}
          initialValues={{
            status: "Draft",
            attributes: [],
          }}
        >
          <Title level={2} style={{ marginBottom: 24 }}>
            <Title level={5} style={{ marginBottom: 16 }}>
              Basic Information
            </Title>
            <Form.Item
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
                  message:
                    "Name must contain only letters, numbers, and spaces",
                },
              ]}
              style={{
                marginBottom: 0,
                display: "inline-block",
                width: "calc(100% - 120px)",
              }}
            >
              <Input size="large" placeholder="Product Name" />
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

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Price"
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
            </Col>
            <Col span={8}>
              <Form.Item
                name="stock"
                label="Stock"
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
            </Col>
            <Col span={8}>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true, message: "Please input category!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ max: 500, message: "Description too long!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Title level={5}>Product Specifications</Title>
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
                          message: "Use lowercase letters and underscores only",
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
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Attribute
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Flex justify="end">
              <Space>
                <Button type="primary" htmlType="submit">
                  Create Product
                </Button>
                <Button onClick={() => navigate(ROUTE_MAP.products)}>
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
