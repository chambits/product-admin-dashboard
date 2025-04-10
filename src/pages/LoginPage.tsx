import styled from "@emotion/styled";
import { Card } from "antd";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { Login } from "../features/auth/components/Login";

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

const LoginPage = () => {
  return (
    <PageTransition>
      <LoginWrapper>
        <LoginCard>
          <Login />
        </LoginCard>
      </LoginWrapper>
    </PageTransition>
  );
};

export default LoginPage;
