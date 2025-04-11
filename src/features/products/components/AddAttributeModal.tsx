import { Form, Input, Modal, Select, FormInstance } from "antd";
import { ProductAttribute } from "../types";

interface AddAttributeModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: FormInstance;
  existingAttributes: ProductAttribute[];
}

export const AddAttributeModal: React.FC<AddAttributeModalProps> = ({
  open,
  onCancel,
  onOk,
  form,
  existingAttributes,
}: AddAttributeModalProps) => {
  return (
    <Modal
      title="Add New Attribute"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="code"
          label="Attribute Code"
          rules={[
            { required: true, message: "Please input attribute name!" },
            {
              validator: (_, value) => {
                const existingCodes = existingAttributes.map(
                  (attr) => attr.code
                );
                if (existingCodes.includes(value)) {
                  return Promise.reject("Attribute name already exists!");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="e.g., color, size, weight" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Value Type"
          rules={[{ required: true, message: "Please select value type!" }]}
        >
          <Select>
            <Select.Option value="string">Text</Select.Option>
            <Select.Option value="number">Number</Select.Option>
            <Select.Option value="boolean">Yes/No</Select.Option>
            <Select.Option value="array">Tags</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prev, curr) => prev?.type !== curr?.type}
        >
          {({ getFieldValue }) => {
            const type = getFieldValue("type");
            return (
              <Form.Item
                name="value"
                label="Value"
                rules={[{ required: true, message: "Please input value!" }]}
              >
                {type === "boolean" ? (
                  <Select>
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                  </Select>
                ) : type === "number" ? (
                  <Input type="number" />
                ) : type === "array" ? (
                  <Select mode="tags" />
                ) : (
                  <Input />
                )}
              </Form.Item>
            );
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};
