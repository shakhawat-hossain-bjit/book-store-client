import { useDispatch } from "react-redux";
import { axiosInstance } from "../../utils/axiosCreate";

const bookAPI = () => {
  const dispatch = useDispatch();

  const getAllBooks = async () => {
    let data = await axiosInstance.get(`/books/all`).then((res) => res.data);
    return data;
  };

  const getSearchedBook = async (search, page) => {
    const data = await axiosInstance
      .get(`/books/all?search=${search}&page=${page}`)
      .then((res) => res.data);
    return data;
  };

  const getBooksByRatingDesc = async () => {
    let data = await axiosInstance
      .get(`/books/all?sortOrder=desc&sortParam=rating`)
      .then((res) => res.data);
    return data;
    // .then((data) => {
    //   // console.log(data?.data?.books);
    //   dispatch(loadBookByRatingDescReducer(data?.data?.books));
    // })
    // .catch((e) => {
    //   console.log(e);
    //   console.log("Error: ", e?.response?.statusText);
    // })
    // .finally(() => {
    //   dispatch(lodingFinishedReducer("isLoadingBooksByRating"));
    // });
  };

  const getBooksByPriceAsc = async () => {
    let data = await axiosInstance
      .get(`/books/all?sortOrder=asc&sortParam=price`)
      .then((res) => res.data);
    return data;
    //  .then((data) => {
    //    // console.log(data?.data?.books);
    //    dispatch(loadBooksByPriceAscReducer(data?.data?.books));
    //  })
    //  .catch((e) => {
    //    console.log("Error: ", e?.response?.statusText);
    //  })
    //  .finally(() => {
    //    dispatch(lodingFinishedReducer("isLoadingBooksByPrice"));
    //  });
  };
  const getBooksByViewDesc = async () => {
    let data = await axiosInstance
      .get(`/books/all?sortOrder=asc&sortParam=views`)
      .then((res) => res.data);
    return data;
    //  .then((data) => {
    //    // console.log(data?.data?.books);
    //    dispatch(loadBooksByViewDescReducer(data?.data?.books));
    //  })
    //  .catch((e) => {
    //    console.log("Error: ", e?.response?.statusText);
    //  })
    //  .finally(() => {
    //    dispatch(lodingFinishedReducer("isLoadingBooksByView"));
    //  });
  };

  return {
    getAllBooks,
    getBooksByRatingDesc,
    getBooksByPriceAsc,
    getBooksByViewDesc,
    getSearchedBook,
  };
};

export default bookAPI;
