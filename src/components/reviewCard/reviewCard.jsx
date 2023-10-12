import React from "react";
import "./reviewCard.style.scss";
import { SlUser } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import RatingStar from "../ratingStart/ratingStar";
import { useSelector } from "react-redux";

const ReviewCard = ({ props }) => {
  const { content, rating, createdAt, userId: reviewrId } = props;

  const { userId } = useSelector((state) => state.user);

  let convertToPrettier = (time) => {
    const date = new Date(time);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    let arr = formattedDate.split(" ");
    arr.pop();
    return arr;
  };

  const deleteReview = () => {};

  return (
    <div className="review-card-container">
      {userId == reviewrId && (
        <button
          className="delete-button"
          onClick={() => {
            deleteReview;
          }}
        >
          <MdDelete size={20} />
        </button>
      )}

      <div className="review-header">
        <div className="review-img-container">
          <SlUser size={30} />
        </div>
        <div className="name-container">
          <p>Anonymus User</p>
          <small>{convertToPrettier(createdAt)}</small>
        </div>
      </div>
      <div className="review-body">
        <div className="message-container">{content}</div>
        {rating && (
          <div className="rating-container">
            <RatingStar rating={rating} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
