import { useDispatch } from "react-redux";
import { axiosInstance, axiosInstanceToken } from "../../utils/axiosCreate";
import {
  loadAllBookReducer,
  loadBookByRatingDescReducer,
  loadBooksByPriceAscReducer,
  loadBooksByViewDescReducer,
  lodingFinishedReducer,
} from "../../store/slices/bookReducer";

const bookAPI = () => {
  const deleteBook = async (_id) => {
    let data = await axiosInstanceToken.get(`/books/delete/${_id}`);

    return data;
    //   .then((res) => res.data)
    //   .then((data) => {
    //     // console.log(data?.data?.books);
    //     dispatch(loadAllBookReducer(data?.data?.books));
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     console.log("Error: ", e?.response?.statusText);
    //   })
    //   .finally(() => {
    //     dispatch(lodingFinishedReducer("isLoadingAllBook"));
    //   });
  };

  return {
    deleteBook,
  };
};

export default bookAPI;
