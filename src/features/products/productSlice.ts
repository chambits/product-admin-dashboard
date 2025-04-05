import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";

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
  const dispatch = useDispatch();
  return {
    selectedProduct: useSelector(
      (state: RootState) => state.product.selectedProduct
    ),
    setSelectedProduct: (product: Product | null) =>
      dispatch(setSelectedProduct(product)),
  };
};

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
