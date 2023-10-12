import React, { useEffect, useState } from "react";
import "./profile.style.scss";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../utils/axiosCreate";
const Profile = () => {
  const [user, setUser] = useState({});
  let token = localStorage.getItem("token");

  useEffect(() => {
    //   console.log(token);
    if (token) {
      axiosInstance
        .get(`/auth/check-me/${token}`)
        .then((res) => res.data)
        .then((data) => {
          // user is valid
          // console.log(data?.data);
          // dispatch(loadUserInfo(data?.data));
          setUser(data?.data);
        })
        .catch((e) => {
          console.log(e);
          console.log("Error: ", e?.response?.statusText);
          // dispatch(signOutReducer());
        })
        .finally(() => {
          // dispatch(loadingFinishedReducer("isLoadingUser"));
        });
    }
  }, [token]);
  return (
    <div className="user-information-container">
      <div className="user-information ">
        <h2>My Profile</h2>
        <h2>{user?.userName}</h2>
      </div>
    </div>
  );
};

export default Profile;
