import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Card, Form, Input, notification, Typography } from "antd";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import PageTransition from "../components/PageTransition";
import { useNotification } from "../providers/NotificationProvider";

const { Text } = Typography;

interface LoginForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useNotification();
  const from = location.state?.from?.pathname || "/";

  const LoginWrapper = styled(motion.div)`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f2f5;
  `;

  const LoginCard = styled(Card)`
    width: 100%;
    max-width: 420px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  `;

  const LoginHeader = styled.div`
    text-align: center;
    margin-bottom: 32px;
  `;

  const onFinish = async (values: LoginForm) => {
    if (values.username === "admin" && values.password === "password") {
      //   const response = await login(values).unwrap();
      localStorage.setItem("token", "1234567890");
      navigate(from, { replace: true });
    } else {
      showNotification("error", "Invalid credentials");
    }
  };

  return (
    <PageTransition>
      <LoginWrapper>
        <LoginCard>
          <LoginHeader>
            <Logo style={{ color: "#1f2937" }} />
            <Text type="secondary">
              Welcome Back! Enter your details to Sign In
            </Text>
          </LoginHeader>

          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
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
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
                placeholder="Password"
                style={{ borderRadius: "6px" }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </LoginCard>
      </LoginWrapper>
    </PageTransition>
  );
};

export default LoginPage;
