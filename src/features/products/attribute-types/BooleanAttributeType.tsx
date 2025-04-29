import { Select } from "antd";
import { ProductAttributeFieldType } from "../types";

export const BooleanAttributeType: ProductAttributeFieldType = {
  name: "boolean",
  label: "Yes/No",
  edit: () => (
    <Select placeholder="Value" style={{ width: 120 }}>
      <Select.Option value={true}>Yes</Select.Option>
      <Select.Option value={false}>No</Select.Option>
    </Select>
  ),
  show: (value) => (value ? "Yes" : "No"),
  rules: [{ required: true, message: "Please select a value!" }],
};
