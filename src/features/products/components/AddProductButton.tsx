import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RouteMap } from "../../../constants";

const AddProductButton: React.FC = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      size="large"
      onClick={() => navigate(RouteMap.productAdd)}
    >
      Add Product
    </Button>
  );
});

export default AddProductButton;
