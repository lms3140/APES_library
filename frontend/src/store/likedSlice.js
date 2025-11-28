import { createSlice } from "@reduxjs/toolkit";

const likedSlice = createSlice({
  name: "liked",
  initialState: {
    likedItems: [],
  },
  reducers: {
    toggleLike: (state, action) => {
      const id = action.payload;
      if (state.likedItems.includes(id)) {
        state.likedItems = state.likedItems.filter((a) => a !== id);
      } else {
        state.likedItems.push(id);
      }
    },
  },
});

export const { toggleLike } = likedSlice.actions;
export default likedSlice.reducer;
