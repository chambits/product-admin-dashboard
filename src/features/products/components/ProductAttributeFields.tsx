import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";

interface AttributeType {
  value: string;
  label: string;
}

const attributeTypes: AttributeType[] = [
  { value: "string", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Yes/No" },
  { value: "array", label: "Tags" },
];

const renderValueInput = (type: string | undefined) => {
  switch (type) {
    case "boolean":
      return (
        <Select placeholder="Value" style={{ width: 120 }}>
          <Select.Option value={true}>Yes</Select.Option>
          <Select.Option value={false}>No</Select.Option>
        </Select>
      );
    case "number":
      return <InputNumber placeholder="Value" style={{ width: 120 }} />;
    case "array":
      return (
        <Select
          mode="tags"
          placeholder="Value"
          style={{ width: 200 }}
          tokenSeparators={[","]}
        />
      );
    default:
      return <Input placeholder="Value" style={{ width: 120 }} />;
  }
};

export const ProductAttributeFields = () => {
  return (
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
                  {
                    required: true,
                    message: "Please input attribute name!",
                  },
                  {
                    validator: (_, value) => {
                      if (value && value.length > 30) {
                        return Promise.reject(
                          "Attribute name too long (max 30 characters)"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Attribute Name" style={{ width: 200 }} />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, "type"]}
                rules={[
                  {
                    required: true,
                    message: "Please select type!",
                  },
                ]}
              >
                <Select
                  placeholder="Type"
                  style={{ width: 120 }}
                  options={attributeTypes}
                />
              </Form.Item>

              <Form.Item noStyle shouldUpdate>
                {({ getFieldValue }) => {
                  const type = getFieldValue(["attributes", name, "type"]);
                  return (
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input value!",
                        },
                        {
                          validator: (_, value) => {
                            const type = getFieldValue([
                              "attributes",
                              name,
                              "type",
                            ]);
                            if (type === "number" && isNaN(value)) {
                              return Promise.reject(
                                "Please enter a valid number"
                              );
                            }
                            if (
                              type === "array" &&
                              Array.isArray(value) &&
                              value.length > 10
                            ) {
                              return Promise.reject("Maximum 10 tags allowed");
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      {renderValueInput(type)}
                    </Form.Item>
                  );
                }}
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
  );
};
