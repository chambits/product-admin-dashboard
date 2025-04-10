import { Flex, Typography } from "antd";
import { Logo } from "../../../components/ui/Logo";
import { LoginForm } from "./LoginForm";

const { Text } = Typography;

export const Login = () => {
  return (
    <>
      <Flex vertical align="center" style={{ marginBottom: 32 }}>
        <Logo color="black" />
        <Text type="secondary">
          Welcome Back! Enter your details to Sign In
        </Text>
      </Flex>
      <LoginForm />
    </>
  );
};
