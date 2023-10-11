import React, { useEffect, useState } from "react";
import "./bookCard.scss";
import demobook from "../../../assets/images/demoBook.png";
import Spinner from "../../spinner/spinner";
import { SlHeart } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bottomEndToast } from "../../../utils/swalCreate";
import useCartHook from "../../../hooks/cart/useCartHook";

const BookCard = ({ props }) => {
  const [imageState, setImageState] = useState(0);
  const { title, author, price, language, category, _id, images } = props;
  const { email, role, userId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { add, remove, message, success, isLoadingCart } = useCartHook();

  useEffect(() => {
    const loadImages = async () => {
      try {
        let url = images[0];
        const response = await fetch(url);
        // console.log(response);
        if (response.ok) {
          setImageState(1);
        } else {
          //image not loaded
          setImageState(-1);
        }
      } catch (e) {
        // console.error(`Error loading image : ${e}`);
        setImageState(-1);
      }
    };

    //check if image exist
    if (images?.length) {
      const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;
      const isValidImageUrl = imageUrlRegex.test(images[0]);
      if (isValidImageUrl) loadImages();
      else setImageState(-1);
    } else {
      setImageState(-1);
    }
  }, [images]);

  useEffect(() => {
    if (isLoadingCart == false && message) {
      let icon = success ? "success" : "error";
      bottomEndToast.fire({
        icon: icon,
        title: message,
      });
    }
  }, [isLoadingCart, message, success]);

  const favouriteButton = (e) => {
    console.log("favourite button clicked");
    e.stopPropagation();
  };

  const cardClicked = () => {
    console.log("card clicked");
  };

  const bookEditButton = () => {
    e.stopPropagation();
    navigate("/admin/update-book");
  };

  const cartButton = (e) => {
    e.stopPropagation();
    if (userId) {
      const obj = {
        userId: userId,
        bookId: _id,
        amount: 1,
      };
      add(obj);
    } else {
      navigate("/login");
    }
  };

  const bookDeleteButton = () => {};

  // console.log(title, imageState);

  return (
    <div className="book-card-container" onClick={() => cardClicked()}>
      <div className="book-card-img">
        {imageState == 0 ? (
          <div style={{ width: "140px", height: "180px" }}>
            <Spinner />
          </div>
        ) : (
          <img
            src={`${imageState == 1 ? images[0] : demobook}`}
            alt="book image"
            width="140px"
            height="180px"
          />
        )}
      </div>
      <div className="book-card-info-container">
        <div className="book-card-info">
          <p>
            {title?.length > 18 ? title?.substr(0, 18).concat(" ...") : title}
          </p>
          <p>{author}</p>
          <p>{price}</p>
        </div>

        {role == 2 ? (
          <div className="book-card-cart">
            <button
              className="book-card-cart-button"
              onClick={(e) => cartButton(e)}
            >
              Add to Cart
            </button>
            <button
              className="book-card-favourite-button"
              onClick={(e) => favouriteButton(e)}
            >
              <SlHeart />
            </button>
          </div>
        ) : (
          <div className="book-card-cart">
            <button
              className="book-card-cart-button"
              onClick={(e) => bookEditButton(e)}
            >
              Edit Book
            </button>
            <button
              className="book-card-favourite-button"
              onClick={(e) => bookDeleteButton(e)}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
