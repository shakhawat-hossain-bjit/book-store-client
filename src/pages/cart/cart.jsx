import React, { useEffect, useState } from "react";
import "./cart.style.scss";
import { useSelector } from "react-redux";
import CartItem from "./cartItem/cartItem";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  let { books } = useSelector((x) => x.cart);

  useEffect(() => {
    setCartItems(books);
  }, [books]);

  // console.log("cartItems ", cartItems);

  return (
    <div>
      <div className="container">
        <div class=" cart-container">
          <h1 class="cart-title">Cart</h1>
          <div class="cart-item-container">
            <hr />
            {cartItems?.map((x) => (
              <CartItem props={x} key={x?.book?.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
