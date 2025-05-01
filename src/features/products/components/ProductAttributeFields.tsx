import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
import { attributeTypes, getAttributeType } from "../attribute-types";

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
                  options={attributeTypes.map((type) => ({
                    label: type.label,
                    value: type.name,
                  }))}
                />
              </Form.Item>

              <Form.Item noStyle shouldUpdate>
                {({ getFieldValue }) => {
                  const typeValue = getFieldValue(["attributes", name, "type"]);
                  const attributeType = getAttributeType(typeValue);

                  if (!attributeType) {
                    return null;
                  }

                  return (
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={attributeType.rules}
                    >
                      {attributeType.edit(`${name}`)}
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
