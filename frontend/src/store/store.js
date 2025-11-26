import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "./memberSlice";

export const store = configureStore({
  reducer: { member: memberSlice },
  preloadedState: {
    member: {
      isLogin: localStorage.getItem("jwtToken") ? true : false,
    },
  },
});
