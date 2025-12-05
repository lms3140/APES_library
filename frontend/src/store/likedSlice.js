import { createSlice } from "@reduxjs/toolkit";

const likedSlice = createSlice({
  name: "liked",
  initialState: {
    likedItems: [],
  },
  reducers: {
    toggleLike: (state, action) => {
      const id = action.payload;

      if (state.likedItems.some((item) => item.bookId === id)) {
        state.likedItems = state.likedItems.filter(
          (item) => item.bookId !== id
        );
      } else {
        state.likedItems.push({ bookId: id });
      }
    },
    setItems: (state, action) => {
      state.likedItems = action.payload;
    },
    addMultipleLikes: (state, action) => {
      const ids = action.payload; // [1, 2, 4] 같은 배열

      // 중복 제거 merge
      const set = new Set([...state.likedItems, ...ids]);
      state.likedItems = Array.from(set);
    },
  },
});

export const { toggleLike, setItems, addMultipleLikes } = likedSlice.actions;
export default likedSlice.reducer;
