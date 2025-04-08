import { Button, Tooltip } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  size?: "small" | "middle" | "large";
}

const CopyButton = ({ text, size = "small" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
      <Button
        type="text"
        size={size}
        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
        onClick={handleCopy}
        style={{ color: copied ? "#52c41a" : undefined }}
      />
    </Tooltip>
  );
};

export default CopyButton;
