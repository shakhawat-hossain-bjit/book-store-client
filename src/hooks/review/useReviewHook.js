import { useEffect, useState } from "react";
import reviewAPI from "../../api/review/reviewAPI";

const useReviewHook = () => {
  const [mytransaction, setMyTransaction] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const [isLoadingInsert, setIsLoadingInsert] = useState(false);
  const [insertMessage, setInsertMessage] = useState("");
  const [insertSuccess, setInsertSuccess] = useState(false);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { create, update } = reviewAPI();

  const insertReview = (obj) => {
    setIsLoadingInsert(true);
    create(obj)
      .then((data) => {
        setInsertSuccess(false);
        setInsertMessage(data?.message);
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to add review!";
        }
        setInsertSuccess(false);
        setInsertMessage(txt);
      })
      .finally(() => {
        setIsLoadingInsert(false);
      });
  };

  const updateReview = (obj) => {
    setIsLoadingUpdate(true);
    update(obj)
      .then((data) => {
        setUpdateSuccess(true);
        setUpdateMessage(data?.message);
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to add review!";
        }
        setUpdateSuccess(false);
        setUpdateMessage(txt);
      })
      .finally(() => {
        setIsLoadingUpdate(false);
      });
  };

  return {
    isLoadingInsert,
    insertMessage,
    insertSuccess,
    insertReview,

    updateReview,
    isLoadingUpdate,
    updateMessage,
    updateSuccess,
  };
};

export default useReviewHook;
