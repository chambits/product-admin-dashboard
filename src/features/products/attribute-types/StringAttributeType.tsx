import { Form, Input } from "antd";
import { ProductAttributeFieldType } from "../types";

export const StringAttributeType: ProductAttributeFieldType = {
  name: "string",
  label: "Text",
  edit: (name) => (
    <Form.Item name={[name, "value"]}>
      <Input placeholder="Value" style={{ width: 120 }} />
    </Form.Item>
  ),
  show: (value) => String(value),
  rules: [{ required: true, message: "Please input a value!" }],
};
