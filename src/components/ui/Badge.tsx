import { Tag } from "antd";
interface StatusBadgeProps {
  content: string;
  color: string;
  style?: React.CSSProperties;
}

export const Badge = ({ color, content, style }: StatusBadgeProps) => {
  return (
    <Tag color={color} style={{ ...style, borderRadius: 12 }}>
      {content}
    </Tag>
  );
};
