import { useLocation, useNavigate } from "react-router-dom";
import { TokenKey } from "../../../constants";
import { useLoginMutation } from "../authApi";
import { LoginRequest } from "../types";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (values: LoginRequest) => {
    try {
      const response = await login(values);
      if (response.data) {
        localStorage.setItem(TokenKey, response.data.token);
        navigate(from, { replace: true });
        return { success: true };
      } else {
        return {
          success: false,
          error: "Invalid username or password",
        };
      }
    } catch {
      return {
        success: false,
        error: "Unable to login. Please try again.",
      };
    }
  };

  return {
    handleLogin,
    isLoading,
  };
};
