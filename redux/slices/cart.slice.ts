import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartP {
  product_id: string;
  quantity: number;
  title: string;
  image: string;
  desc: string;
}

interface CartState {
  products: CartP[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state: CartState, action: PayloadAction<CartP>) => {
      state.products = [...state.products, action.payload];
    },
    removeProduct: (
      state: CartState,
      action: PayloadAction<{ product_id: string }>
    ) => {
      state.products = state.products.filter(
        (product) => product.product_id !== action.payload.product_id
      );
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
