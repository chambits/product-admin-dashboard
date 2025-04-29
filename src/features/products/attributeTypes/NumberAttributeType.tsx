import { InputNumber } from "antd";
import { ProductAttributeFieldType } from "../types";

export const NumberAttributeType: ProductAttributeFieldType = {
  name: "number",
  label: "Number",
  edit: () => <InputNumber placeholder="Value" style={{ width: 120 }} />,
  show: (value) => Number(value),
  rules: [{ required: true, message: "Please input a number!" }],
};
