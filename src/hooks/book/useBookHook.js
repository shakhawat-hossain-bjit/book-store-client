import { useEffect, useState } from "react";
import bookAPI from "../../api/book/bookAPI";
import {
  loadAllBookReducer,
  loadBookByRatingDescReducer,
  loadBooksByPriceAscReducer,
  loadBooksByViewDescReducer,
  lodingFinishedReducer,
} from "../../store/slices/bookReducer";
import { useDispatch } from "react-redux";

const useBookHook = () => {
  const [books, setBooks] = useState([]);
  const [searchedbooks, setSearchedbooks] = useState([]);
  const [rateBooks, setRatebooks] = useState([]);
  const [priceBooks, setPricebooks] = useState([]);
  const [viewBooks, setViewbooks] = useState([]);

  const [message, setMessage] = useState("");
  const [isLoadingBook, setIsLoadingBook] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

  const {
    getAllBooks,
    getSearchedBook,
    getBooksByRatingDesc,
    getBooksByPriceAsc,
    getBooksByViewDesc,
  } = bookAPI();

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

  const getSearched = () => {
    setIsLoadingBook(true);
    setMessage("");
    getSearchedBook()
      .then((data) => {
        setSearchedbooks(data?.data);
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

  const getProductById = (id) => {
    setIsLoadingBook(true);
    // console.log("begin");
    fetch(`http://localhost:8000/products/find-by-id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("shihab");
        setIsLoadingBook(false);
        if (data?.success == false) {
          alert(data?.message);
        }
        if (data?.data) setProduct(data?.data);
        else setProduct({});
      })
      .finally(() => {
        setIsLoadingBook(false);
      });
  };

  const deleteProduct = (id) => {
    setIsLoadingBook(true);
    fetch(`http://localhost:8000/products/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingBook(false);
        if (data?.success) {
          alert(data?.message);
        } else {
          alert(data?.message);
        }
      })
      .finally(() => {
        setIsLoadingBook(false);
      });
  };

  const insertProduct = (product) => {
    setIsLoadingBook(true);
    fetch(`http://localhost:8000/products/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingBook(false);
        if (data?.success) {
          alert(data?.message);
        } else {
          alert(data?.message);
        }
      })
      .finally(() => {
        setIsLoadingBook(false);
      });
  };

  const updateProduct = (product) => {
    setIsLoadingBook(true);
    const { id, ...other } = product;
    fetch(`http://localhost:8000/products/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(other),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingBook(false);
        if (data?.success) {
          alert(data?.message);
        } else {
          alert(data?.message);
        }
      })
      .finally(() => {
        setIsLoadingBook(false);
      });
  };

  return {
    books,
    rateBooks,
    priceBooks,
    viewBooks,
    isLoadingBook,
    getAll,
    getSearched,
    getBooksByRating,
    getBooksByPrice,
    getBooksByView,

    insertProduct,
    deleteProduct,
    getProductById,
    updateProduct,
  };
};

export default useBookHook;
