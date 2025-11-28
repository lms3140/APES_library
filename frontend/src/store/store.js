import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "./memberSlice";
import bookSlice from "./bookSlice";
import searchSlice from "./searchSlice";
import likedSlice from "./likedSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    member: memberSlice,
    books: bookSlice,
    search: searchSlice,
    liked: likedSlice,
    cart: cartSlice,
  },
  preloadedState: {
    member: {
      isLogin: localStorage.getItem("jwtToken") ? true : false,
    },
  },
});
