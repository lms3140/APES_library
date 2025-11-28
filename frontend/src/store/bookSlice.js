import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async (kw) => {
  const response = await fetch(
    `http://localhost:8080/api/search?keyword=${kw}`
  );
  const json = await response.json();
  return json;
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
