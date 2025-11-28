import { createSlice } from "@reduxjs/toolkit";
import { addCartItem, getCartItems } from "../utils/cartStorage";

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
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
