import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosCreate";
import { useNavigate } from "react-router";

const cartAPI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartReducer = async (obj) => {
    let data = await axiosInstance
      .post(`/cart/add-book`, obj)
      .then((res) => res.data);
    return data;
    //   .then((data) => {
    //     // console.log(data?.data);
    //     dispatch(logInReducer(data?.data));
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     console.log("Error: ", e?.response?.statusText);
    //   })
    //   .finally(() => {
    //     dispatch(loadingFinishedReducer("isLoadingLogin"));
    //   });
  };

  const RemoveFromCartReducer = async (obj) => {
    let data = await axiosInstance
      .post(`/cart/remove-book`, obj)
      .then((res) => res.data);
    return data;
    //   .then((data) => {
    //     console.log(data?.data);
    //     dispatch(logInReducer(data?.data));
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     console.log("Error: ", e?.response?.statusText);
    //   })
    //   .finally(() => {
    //     dispatch(loadingFinishedReducer("isLoadingSignup"));
    //   });
  };

  // const checkUser = () => {
  //   let token = localStorage.getItem("token");
  //   console.log(token);
  //   if (token) {
  //     axiosInstance
  //       .get(`/auth/check-me/${token}`)
  //       .then((res) => res.data)
  //       .then((data) => {
  //         // user is valid
  //         // console.log(data?.data);
  //         dispatch(loadUserInfo(data?.data));
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         console.log("Error: ", e?.response?.statusText);
  //         dispatch(signOutReducer());
  //       })
  //       .finally(() => {
  //         dispatch(loadingFinishedReducer("isLoadingUser"));
  //       });
  //   }
  // };

  return {
    addToCartReducer,
    RemoveFromCartReducer,
  };
};

export default cartAPI;
