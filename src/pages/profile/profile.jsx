import React, { useEffect, useState } from "react";
import "./profile.style.scss";
import { useSelector } from "react-redux";
import { axiosInstance, axiosInstanceToken } from "../../utils/axiosCreate";
import useUserHook from "../../hooks/user/useUserHook";
const Profile = () => {
  const { userId } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({});
  let token = localStorage.getItem("token");
  const { getUserById, user } = useUserHook();

  useEffect(() => {
    //   console.log(token);
    if (userId) {
      getUserById(userId);
    }
  }, [userId]);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  return (
    <div className="user-information-container">
      <div className="user-information ">
        <h2>My Profile</h2>
        <h2>{userInfo?.userName}</h2>
        <h3>{userInfo?.email}</h3>
        <h3>{userInfo?.phone}</h3>
        <h3>{userInfo?.wallet?.balance}</h3>
      </div>
    </div>
  );
};

export default Profile;
