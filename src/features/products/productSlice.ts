import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { Product } from "./types";

interface ProductState {
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const useProduct = () => {
  const dispatch = useAppDispatch();
  return {
    selectedProduct: useAppSelector(
      (state: RootState) => state.product.selectedProduct
    ),
    setSelectedProduct: (product: Product | null) =>
      dispatch(setSelectedProduct(product)),
  };
};

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
