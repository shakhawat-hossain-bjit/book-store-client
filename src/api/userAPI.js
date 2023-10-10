import { useDispatch } from "react-redux";
import { axiosInstance } from "../utils/axiosCreate";
import {
  loadUserInfo,
  loadingFinishedReducer,
  logInReducer,
  signOutReducer,
} from "../store/slices/userReducer";
import { useNavigate } from "react-router";

const userAPI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logInUser = (userInfo) => {
    axiosInstance
      .post(`/auth/log-in`, userInfo)
      .then((res) => res.data)
      .then((data) => {
        // console.log(data?.data);
        navigate("/");
        dispatch(logInReducer(data?.data));
      })
      .catch((e) => {
        console.log(e);
        console.log("Error: ", e?.response?.statusText);
      })
      .finally(() => {
        dispatch(loadingFinishedReducer("isLoadingLogin"));
      });
  };

  const registerUser = async (userInfo) => {
    let data = await axiosInstance
      .post(`/auth/sign-up`, userInfo)
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

  const checkUser = () => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      axiosInstance
        .get(`/auth/check-me/${token}`)
        .then((res) => res.data)
        .then((data) => {
          // user is valid
          // console.log(data?.data);
          dispatch(loadUserInfo(data?.data));
        })
        .catch((e) => {
          console.log(e);
          console.log("Error: ", e?.response?.statusText);
          dispatch(signOutReducer());
        })
        .finally(() => {
          dispatch(loadingFinishedReducer("isLoadingUser"));
        });
    }
  };

  return {
    logInUser,
    registerUser,
    checkUser,
  };
};

export default userAPI;
