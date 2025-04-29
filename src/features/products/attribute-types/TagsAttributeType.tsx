import { Select, Tag } from "antd";
import { ProductAttributeFieldType } from "../types";

export const TagsAttributeType: ProductAttributeFieldType = {
  name: "tags",
  label: "Tags",
  edit: () => (
    <Select
      mode="tags"
      placeholder="Value"
      style={{ width: 200 }}
      tokenSeparators={[","]}
    />
  ),
  show: (value) => {
    if (!value) return "-";

    const tags = Array.isArray(value) ? value : [String(value)];

    return (
      <span>
        {tags.map((tag, index) => (
          <Tag key={index} color="blue">
            {tag}
          </Tag>
        ))}
      </span>
    );
  },
  rules: [{ required: true, message: "Please input tags!" }],
};
