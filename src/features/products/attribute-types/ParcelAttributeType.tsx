import { Form, InputNumber, Space } from "antd";
import { ProductAttributeFieldType } from "../types";

export const ParcelAttributeType: ProductAttributeFieldType = {
  name: "parcel",
  label: "Parcel",
  edit: (name) => (
    <Form.List name={[name, "value"]} initialValue={[{}]}>
      {(fields) => (
        <>
          {fields.map(({ key, name: fieldName, ...restField }) => (
            <Space key={key}>
              <Form.Item
                {...restField}
                name={[fieldName, "width"]}
                rules={[{ required: true, message: "Width required" }]}
              >
                <InputNumber
                  placeholder="Width"
                  style={{ width: 120 }}
                  min={0}
                />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[fieldName, "height"]}
                rules={[{ required: true, message: "Height required" }]}
              >
                <InputNumber
                  placeholder="Height"
                  style={{ width: 120 }}
                  min={0}
                />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[fieldName, "length"]}
                rules={[{ required: true, message: "Length required" }]}
              >
                <InputNumber
                  placeholder="Length"
                  style={{ width: 120 }}
                  min={0}
                />
              </Form.Item>
            </Space>
          ))}
        </>
      )}
    </Form.List>
  ),
  show: (value) => {
    try {
      const dimensions =
        Array.isArray(value) && value.length > 0
          ? value[0]
          : typeof value === "string"
          ? JSON.parse(value)
          : value;

      return `Width: ${dimensions?.width || "-"}, Height: ${
        dimensions?.height || "-"
      }, Length: ${dimensions?.length || "-"}`;
    } catch {
      return String(value);
    }
  },
};
