import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartP {
  product_id: string;
  quantity: number;
  title: string;
  image: string;
  desc: string;
  price: number;
}

interface CartState {
  products: CartP[];
  id: string;
}

const initialState: CartState = {
  products: [],
  id: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state: CartState, action: PayloadAction<CartP>) => {
      const existingProduct = state.products.find(
        (product) => product.product_id === action.payload.product_id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products = [...state.products, action.payload];
      }
    },
    removeProduct: (
      state: CartState,
      action: PayloadAction<{ product_id: string }>
    ) => {
      state.products = state.products.filter(
        (product) => product.product_id !== action.payload.product_id
      );
    },
    setCart: (
      state: CartState,
      action: PayloadAction<{ product_id: string }>
    ) => {
      state.id = action.payload.product_id;
    },
    clearCart: (state: CartState) => {
      return (state = initialState);
    },
  },
});

export const { addProduct, removeProduct, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
