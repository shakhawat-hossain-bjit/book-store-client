import { useEffect, useState } from "react";
import bookAPI from "../../api/book/bookAPI";
import {
  loadAllBookReducer,
  loadBookByRatingDescReducer,
  loadBookReducer,
  loadBooksByPriceAscReducer,
  loadBooksByViewDescReducer,
  lodingFinishedReducer,
  removeBookReducer,
} from "../../store/slices/bookReducer";
import { useDispatch } from "react-redux";

const useBookHook = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [searchedbooks, setSearchedbooks] = useState({});
  const [rateBooks, setRatebooks] = useState([]);
  const [priceBooks, setPricebooks] = useState([]);
  const [viewBooks, setViewbooks] = useState([]);

  const [message, setMessage] = useState("");
  const [isLoadingBook, setIsLoadingBook] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

  const {
    findBook,
    getAllBooks,
    getSearchedBook,
    getBooksByRatingDesc,
    getBooksByPriceAsc,
    getBooksByViewDesc,
    deleteBook,
    updateBook,
    insertBook,
  } = bookAPI();

  const getBookById = (_id) => {
    setIsLoadingBook(true);
    setMessage("");
    findBook()
      .then((data) => {
        // console.log(data?.data?.books);
        setBook(data?.data?.books);
        setMessage(data?.data?.message);
        setSuccess(true);
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setSuccess(false);
        setMessage(message);
      })
      .finally(() => {
        setIsLoadingBook(false);
      });
  };

  const getAll = () => {
    setIsLoadingBook(true);
    setMessage("");
    getAllBooks()
      .then((data) => {
        // console.log(data?.data?.books);
        setBooks(data?.data?.books);
        dispatch(loadAllBookReducer(data?.data?.books));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setMessage(message);
      })
      .finally(() => {
        dispatch(lodingFinishedReducer("isLoadingAllBook"));
        setIsLoadingBook(false);
      });
  };

  const getSearched = (queryParams) => {
    console.log("searched");
    setIsLoadingBook(true);
    setMessage("");

    getSearchedBook(queryParams)
      .then((data) => {
        // console.log("hoooook ", data);
        setSearchedbooks(data?.data);
        dispatch(loadBookReducer(data?.data?.books));
      })
      .catch((e) => {
        // console.log("inside error", e);
        if (e?.response?.status == 404) {
          setSearchedbooks({});
          dispatch(loadBookReducer({}));
        }

        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setMessage(message);
      })
      .finally(() => {
        dispatch(lodingFinishedReducer("isLoadingAllBook"));
        setIsLoadingBook(false);
      });
  };

  const getBooksByRating = () => {
    setIsLoadingBook(true);
    setMessage("");
    getBooksByRatingDesc()
      .then((data) => {
        setRatebooks(data?.data?.books);
        dispatch(loadBookByRatingDescReducer(data?.data?.books));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setMessage(message);
      })
      .finally(() => {
        dispatch(lodingFinishedReducer("isLoadingBooksByRating"));
        setIsLoadingBook(false);
      });
  };

  const getBooksByPrice = () => {
    setIsLoadingBook(true);
    setMessage("");
    getBooksByPriceAsc()
      .then((data) => {
        setPricebooks(data?.data?.books);
        dispatch(loadBooksByPriceAscReducer(data?.data?.books));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setMessage(message);
      })
      .finally(() => {
        dispatch(lodingFinishedReducer("isLoadingBooksByPrice"));
        setIsLoadingBook(false);
      });
  };

  const getBooksByView = () => {
    setIsLoadingBook(true);
    setMessage("");
    getBooksByViewDesc()
      .then((data) => {
        setViewbooks(data?.data?.books);
        dispatch(loadBooksByViewDescReducer(data?.data?.books));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setMessage(message);
      })
      .finally(() => {
        dispatch(lodingFinishedReducer("isLoadingBooksByView"));
        setIsLoadingBook(false);
      });
  };

  const deleteBookById = (bookId) => {
    setIsLoadingBook(true);
    setMessage("");
    deleteBook(bookId)
      .then((data) => {
        console.log(data);
        setMessage(data?.message);
        setIsLoadingBook(false);
        setSuccess(true);
        dispatch(removeBookReducer(bookId));
      })
      .catch((e) => {
        // console.log("error   -- ", e);
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to load!";
        }
        setSuccess(false);
        setMessage(message);
      })
      .finally(() => {
        setIsLoadingBook(false);
        dispatch(lodingFinishedReducer("isLoadingBook"));
      });
  };

  const createBook = (book) => {
    setIsLoadingBook(true);
    setMessage("");
    insertBook(book)
      .then((data) => {
        //  console.log(data);
        setMessage(data?.message);
        setIsLoadingBook(false);
        setSuccess(true);
        // dispatch(removeBookReducer(bookId));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to insert!";
        }
        setSuccess(false);
        setMessage(message);
      })
      .finally(() => {
        setIsLoadingBook(false);
        // dispatch(lodingFinishedReducer("isLoadingBook"));
      });
  };

  const updateBookById = (book) => {
    setIsLoadingBook(true);
    setMessage("");
    updateBook(book)
      .then((data) => {
        console.log(data);
        setMessage(data?.message);
        setIsLoadingBook(false);
        setSuccess(true);
        // dispatch(removeBookReducer(bookId));
      })
      .catch((e) => {
        let message = "";
        if (e?.response?.data?.message) {
          message = e?.response?.data?.message;
        } else {
          message = "Failed to update!";
        }
        setSuccess(false);
        setMessage(message);
      })
      .finally(() => {
        setIsLoadingBook(false);
        // dispatch(lodingFinishedReducer("isLoadingBook"));
      });
  };

  return {
    books,
    searchedbooks,
    rateBooks,
    priceBooks,
    viewBooks,

    isLoadingBook,
    message,
    success,

    getAll,
    getSearched,
    getBooksByRating,
    getBooksByPrice,
    getBooksByView,
    getBookById,

    deleteBookById,
    updateBookById,
    createBook,
  };
};

export default useBookHook;