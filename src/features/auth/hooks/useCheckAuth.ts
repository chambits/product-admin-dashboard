import { useState } from "react";
import { TokenKey } from "../../../constants";
import { useAuth } from "../authSlice";
import { jwtDecode } from "jwt-decode";
import { User } from "../types";

export const useCheckAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem(TokenKey);
      if (token) {
        const decodedToken = jwtDecode<User>(token);
        setAuth({
          isAuthenticated: true,
          user: {
            id: decodedToken.id,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            email: decodedToken.email,
          },
        });
      }
    } catch {
      console.error("Authentication check failed");
      localStorage.removeItem(TokenKey);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkAuth,
    isAuthenticated: auth.isAuthenticated,
    isLoading,
  };
};
