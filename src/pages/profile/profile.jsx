import React, { useEffect, useRef, useState } from "react";
import "./profile.style.scss";
import { useSelector } from "react-redux";
import { axiosInstance, axiosInstanceToken } from "../../utils/axiosCreate";
import { SlUser, SlPencil } from "react-icons/sl";
import useUserHook from "../../hooks/user/useUserHook";
import profileImg from "../../assets/images/profile.png";
import fileAPI from "../../api/file/fileAPI";
import { bottomEndToast } from "../../utils/swalCreate";
import userAPI from "../../api/userAPI/userAPI";
import Spinner from "../../components/spinner/spinner";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgObj, setImgObj] = useState({});
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const { userId } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({});
  const { getUserById, user } = useUserHook();

  const { uploadImage } = fileAPI();
  const { update } = userAPI();

  useEffect(() => {
    //   console.log(token);
    if (userId) {
      getUserById(userId);
    }
  }, [userId]);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const fileObject = e.target.files && e.target.files[0];
    if (!fileObject) {
      return;
    }
    console.log("fileObject is", fileObject);
    setImgObj(fileObject);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const uploadFile = () => {
    if (imgObj?.name) {
      const formData = new FormData();
      formData.append("image", imgObj);
      console.log("form data ", formData);
      setIsLoading(true);

      /*uploading image*/
      uploadImage(formData)
        .then((data) => {
          console.log(data);
          // setImgObj({});
          /* updating user info*/
          update({ id: userId, image: data?.data?.filename })
            .then((data) => {
              console.log(data);
              setImgObj({});
              getUserById(userId);
              bottomEndToast.fire({ icon: "success", title: data?.message });
            })
            .catch((e) => {
              let message = "";
              if (e?.response?.data?.message) {
                message = e?.response?.data?.message;
              } else {
                message = "Failed to upload Image";
              }
              bottomEndToast.fire({ icon: "error", title: message });
            })
            .finally(() => {
              console.log("222222");
              setIsLoading(false);
            });
        })
        .catch((e) => {
          console.log(e);
          let message = "";
          if (e?.response?.data?.message) {
            message = e?.response?.data?.message;
          } else {
            message = "Failed to upload Image";
          }
          bottomEndToast.fire({ icon: "error", title: message });
        })
        .finally(() => {
          console.log("1111111");
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="user-information-container">
      <h1>My Profile</h1>
      <div className="user-information ">
        <div className="image-section">
          <div className="img-container">
            <div className="image-edit-btn" onClick={handleClick}>
              <SlPencil size={22} />
            </div>
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              name="profilePicture"
              onChange={(e) => handleFileChange(e)}
            />
            {isLoading ? (
              <Spinner />
            ) : (
              <img
                src={
                  imgObj?.name
                    ? image
                    : user?.user?.image
                    ? `${import.meta.env.VITE_BACKEND}/files/get/${
                        user?.user?.image
                      }`
                    : profileImg
                }
                alt="profile img"
                width="100%"
                height="100%"
              />
            )}
          </div>
          <div>
            {imgObj?.name && (
              <button
                onClick={() => uploadFile()}
                className="upload-btn"
                disabled={isLoading ? true : false}
              >
                Save Image
              </button>
            )}
          </div>
        </div>

        <div>
          <h2 style={{ textTransform: "capitalize" }}>{userInfo?.userName}</h2>
          <h3>{userInfo?.email}</h3>
          <h3>{userInfo?.phone}</h3>
          <h3>{userInfo?.wallet?.balance}</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
