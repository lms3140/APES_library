import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  filters: {
    title: false,
    authors: false,
    publisherName: false,
  },
  sortOptions: "인기순",
  limit: 20,
  viewType: "list",
  selectedItems: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setFilters: (state, action) => {
      const { key } = action.payload;
      state.filters[key] = !state.filters[key];
    },
    setSortOptions: (state, action) => {
      state.sortOptions = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setViewType: (state, action) => {
      state.viewType = action.payload;
    },
    toggleSelected: (state, action) => {
      const id = action.payload;
      if (state.selectedItems.includes(id)) {
        state.selectedItems = state.selectedItems.filter((a) => a !== id);
      } else {
        state.selectedItems.push(id);
      }
    },
    clearSelected: (state) => {
      state.selectedItems = [];
    },
  },
});

export const {
  setKeyword,
  setFilters,
  setSortOptions,
  setLimit,
  setViewType,
  toggleSelected,
  clearSelected,
} = searchSlice.actions;

export default searchSlice.reducer;

export const selectFilteredSortedBooks = createSelector(
  [(state) => state.books.books, (state) => state.search],
  (books, search) => {
    const { filters, keyword, sortOptions } = search;
    const kw = keyword.toLowerCase();

    let filtered = books.filter((book) => {
      const noFilter =
        !filters.title && !filters.authors && !filters.publisherName;
      if (noFilter || !kw) return true;

      const title = book.title?.toLowerCase() || "";
      const publisherName = book.publisherName?.toLowerCase() || "";
      const authors = Array.isArray(book.authors) ? book.authors : [];

      const matchTitle = title.includes(kw);
      const mathchAuthor = authors.some((a) =>
        (a?.toLowerCase() || "").includes(kw)
      );
      const matchPublisher = publisherName.includes(kw);

      return (
        (filters.title && matchTitle) ||
        (filters.authors && mathchAuthor) ||
        (filters.publisherName && matchPublisher)
      );
    });

    if (sortOptions === "최신순") {
      filtered = filtered.sort(
        (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
      );
    }
    if (sortOptions === "낮은가격순") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }
    if (sortOptions === "높은가격순") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }
);
