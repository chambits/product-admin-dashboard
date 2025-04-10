import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import { useState } from "react";
import { LoginRequest } from "../types";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const { handleLogin, isLoading } = useLogin();

  const onSubmit = async (values: LoginRequest) => {
    setError(null);
    const result = await handleLogin(values);
    if (!result.success) {
      setError(result.error || "An error occurred");
    }
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={onSubmit}
      layout="vertical"
      size="large"
      validateTrigger={["onChange", "onSubmit"]}
    >
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      <Form.Item
        name="username"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 3, message: "Username must be at least 3 characters" },
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: "#9ca3af" }} />}
          placeholder="Username"
          style={{ borderRadius: "6px" }}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
          placeholder="Password"
          style={{ borderRadius: "6px" }}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
          style={{
            borderRadius: "6px",
            fontWeight: 500,
          }}
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};
