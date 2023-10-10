import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  isLoadingCart: false,
  // isLoadingAdd: false,
  // isLoadingRemove: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCartReducer: (state, action) => {
      state.isLoadingCart = true;
      state.books = action.payload;
    },
    addToCartReducer: (state, action) => {
      // state.isLoadingAdd = true;
      state.books.push(action.payload);
    },
    removeFromCartReducer: (state, action) => {
      // state.isLoadingRemove = true;
      state.books.push(action.payload);
      const filteredBooks = state.books.filter(
        (x) => x._id != action?.payload?._id
      );
      state.books = filteredBooks;
    },

    lodingFinishedReducer: (state, action) => {
      state[`${action.payload}`] = false;
    },
  },
});

export const {
  addToCartReducer,
  loadCartReducer,
  removeFromCartReducer,
  lodingFinishedReducer,
} = cartSlice.actions;

export default cartSlice.reducer;
