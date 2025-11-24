import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    userId: "",
    name: "",
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload?.userId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementByAmount } = memberSlice.actions;

export default memberSlice.reducer;
