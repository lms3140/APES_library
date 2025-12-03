import { createSlice } from "@reduxjs/toolkit";
import { addCartItem, getCartItems, clearCart } from "../utils/cartStorage";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getCartItems(),
  },
  reducers: {
    addToCart: (state, action) => {
      addCartItem(action.payload);
      state.items = getCartItems();
    },
    resetCart: (state) => {
      clearCart();     // localStorage 초기화
      state.items = []; // Redux 상태 초기화
    },
  },
});

export const { addToCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
