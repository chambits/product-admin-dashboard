import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { TokenKey } from "../../constants";
import { User } from "./types";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem(TokenKey);
    },
  },
});

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);

  const setAuth = (auth: AuthState) => {
    dispatch(authSlice.actions.setAuth(auth));
  };

  const logout = () => {
    dispatch(authSlice.actions.logout());
  };
  return {
    auth,
    setAuth,
    logout,
  };
};
export default authSlice.reducer;
