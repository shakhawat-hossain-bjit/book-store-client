import React, { useEffect, useState } from "react";
import "./bookCard.scss";
import demobook from "../../../assets/images/demoBook.png";
import Spinner from "../../spinner/spinner";
import { SlHeart } from "react-icons/sl";
import cartAPI from "../../../api/cartAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartReducer } from "../../../store/slices/cartReducer";

const BookCard = ({ props }) => {
  const [imageState, setImageState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { title, author, price, language, category, _id, images } = props;
  const { email, role, userId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { addToCart } = cartAPI();
  const dispatch = useDispatch();

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

  const favouriteButton = (e) => {
    // console.log("favourite button clicked");
    e.stopPropagation();
  };

  const cartButton = (e) => {
    e.stopPropagation();
    setIsLoading(true);
    setMessage("");
    // console.log("cart button clicked ", _id);
    if (userId) {
      const obj = {
        userId: userId,
        bookId: _id,
        amount: 1,
      };
      // console.log("first ", obj);
      addToCart(obj)
        .then((data) => {
          // console.log(data?.data);
          setMessage("succssfully added to cart");
          const { _id, author, title, language, rating, stock, images, price } =
            data?.data?.currentBook;
          dispatch(
            addToCartReducer({
              _id,
              author,
              title,
              language,
              rating,
              stock,
              images,
              price,
            })
          );
        })
        .catch((e) => {
          console.log(e);
          // console.log("Error: ", e?.response?.statusText);
          setMessage("Faied to add to cart");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate("/login");
    }
  };

  const cardClicked = () => {
    console.log("card clicked");
  };

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

        <div className="book-card-cart">
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
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
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
