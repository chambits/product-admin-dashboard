import { useEffect, useState } from "react";
import { selectAuth, setAuth } from "../authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Verify token with backend
          // const user = await verifyToken(token);
          dispatch(
            setAuth({
              isAuthenticated: true,
              user: {
                id: "1",
                username: "John Doe",
                email: "john.doe@example.com",
              },
            })
          );
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        dispatch(setAuth({ isAuthenticated: false, user: null }));
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    isLoading,
  };
};
