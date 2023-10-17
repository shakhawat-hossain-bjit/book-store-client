import { axiosInstanceToken } from "../../utils/axiosCreate";

const fileAPI = () => {
  const uploadImage = async (formData) => {
    let data = await axiosInstanceToken
      .post(`files/upload-image`, formData)
      .then((res) => res.data);
    return data;
  };

  return {
    uploadImage,
  };
};

export default fileAPI;
