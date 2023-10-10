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
      // state.books.push(action.payload);
      console.log("reducer ", action?.payload);
      const obj = {};
      let isExist = false;
      const mappedBooks = state?.books?.map((x) => {
        if (x.book._id == action?.payload?._id) {
          console.log("found");
          obj.book = action.payload;
          obj.quantity = x.quantity + 1;
          obj.price = x.price;
          isExist = true;
          return obj;
        }
        return x;
      });

      if (!isExist) {
        obj.quantity = 1;
        obj.price = action.payload.price;
        delete action?.payload?.price;
        obj.book = action.payload;
        mappedBooks.push(obj);
      }

      console.log("mappedBooks ", mappedBooks);

      state.books = mappedBooks;
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
