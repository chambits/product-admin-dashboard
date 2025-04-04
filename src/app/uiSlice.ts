import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./store";

interface UiState {
  siderCollapsed: boolean;
}

const initialState: UiState = {
  siderCollapsed: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSiderCollapsed: (state, action: PayloadAction<boolean>) => {
      state.siderCollapsed = action.payload;
    },
  },
});

export const useUiSlice = () => {
  const dispatch = useDispatch();
  const siderCollapsed = useSelector(
    (state: RootState) => state.ui.siderCollapsed
  );
  return {
    siderCollapsed,
    setSiderCollapsed: (collapsed: boolean) =>
      dispatch(setSiderCollapsed(collapsed)),
  };
};

export const { setSiderCollapsed } = uiSlice.actions;
export default uiSlice.reducer;
