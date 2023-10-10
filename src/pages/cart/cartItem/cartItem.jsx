import React, { useEffect, useState } from "react";
import "./cartItem.style.scss";
import Spinner from "../../../components/spinner/spinner";
import demobook from "../../../assets/images/demoBook.png";
import { MdAdd, MdRemove } from "react-icons/md";
import {
  addToCartReducer,
  removeFromCartReducer,
} from "../../../store/slices/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import cartAPI from "../../../api/cartAPI";

const CartItem = ({ props }) => {
  const [imageState, setImageState] = useState(0);
  const { price, quantity } = props;
  const { title, images, author, _id } = props.book;
  const { addToCart, RemoveFromCart } = cartAPI();
  const { email, role, userId } = useSelector((state) => state.user);
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

  const addItem = () => {
    console.log("add ", _id, title);
    if (userId) {
      const obj = {
        userId: userId,
        bookId: _id,
        amount: 1,
      };
      addToCart(obj)
        .then((data) => {
          console.log(data?.data);
          //   setMessage("succssfully added to cart");
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
          //   setMessage("Faied to add to cart");
        });
    } else {
      navigate("/login");
    }
  };

  const removeItem = () => {
    console.log("remove ", _id, title);
    if (userId) {
      const obj = {
        userId: userId,
        bookId: _id,
        amount: 1,
      };
      RemoveFromCart(obj)
        .then((data) => {
          console.log(data?.data);
          dispatch(removeFromCartReducer(_id));
        })
        .catch((e) => {
          console.log(e);
          // console.log("Error: ", e?.response?.statusText);
          //   setMessage("Faied to add to cart");
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="cart-item-info">
      <div className="cart-item-img-container">
        {imageState == 0 ? (
          <div style={{ width: "100px", height: "130px" }}>
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

      <div className="cart-item-title-container">
        <h3 className="cart-item-title">{title}</h3>
        {author && <h5 className="cart-item-author-container">By {author}</h5>}
      </div>
      <div className="cart-item-price-container">
        <p className="cart-item-price">{price}</p>
      </div>

      <div className="cart-button-container">
        <button className="cart-item-decrease-btn" onClick={() => removeItem()}>
          <MdRemove />
        </button>
        <div className="cart-quantity-container">
          <p className="">{quantity}</p>
        </div>
        <button className="cart-item-increase-btn" onClick={() => addItem()}>
          <MdAdd />
        </button>
      </div>

      <div className="cart-item-sub-total-container">
        <p className="cart-item-sub-total">{price * quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;
