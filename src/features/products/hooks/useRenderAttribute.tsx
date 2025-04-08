import { Form, Input, InputNumber, Select, Switch, Badge, Tag } from "antd";
import { ProductAttribute } from "../types";

export const useRenderAttribute = (isEditing = false) => {
  const renderAttribute = (attr: ProductAttribute) => {
    if (isEditing) {
      const fieldName = ["attributes", attr.code, "value"];

      if (typeof attr.value === "boolean") {
        return (
          <Form.Item
            name={fieldName}
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        );
      }

      if (Array.isArray(attr.value)) {
        return (
          <Form.Item name={fieldName} style={{ marginBottom: 0 }}>
            <Select mode="tags" style={{ width: "100%" }} />
          </Form.Item>
        );
      }

      if (typeof attr.value === "number") {
        return (
          <Form.Item name={fieldName} style={{ marginBottom: 0 }}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        );
      }

      return (
        <Form.Item name={fieldName} style={{ marginBottom: 0 }}>
          <Input />
        </Form.Item>
      );
    }

    if (typeof attr.value === "boolean") {
      return (
        <Badge
          status={attr.value ? "success" : "error"}
          text={attr.value ? "Yes" : "No"}
        />
      );
    }

    if (Array.isArray(attr.value)) {
      return (
        <span>
          {attr.value.map((tag, index) => (
            <Tag key={index} color="blue" style={{ margin: "2px" }}>
              {tag}
            </Tag>
          ))}
        </span>
      );
    }

    return attr.value;
  };

  return { renderAttribute };
};
