import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategory: number | null;
  expandedKeys: number[];
}

const initialState: CategoryState = {
  selectedCategory: null,
  expandedKeys: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload;
    },
    setExpandedKeys: (state, action: PayloadAction<number[]>) => {
      state.expandedKeys = action.payload;
    },
  },
});

export const { setSelectedCategory, setExpandedKeys } = categorySlice.actions;
export default categorySlice.reducer;
