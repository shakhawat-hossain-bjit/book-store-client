import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Banner from "./components/banner/banner";
import Footer from "./components/footer/footer";
import PreNavbar from "./components/preNavbar/preNavbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import BestSelling from "./components/bestSelling/bestSelling";
import FeaturedBooks from "./components/featuredBooks/featuredBooks";
import Login from "./pages/logIn/logIn";
import Register from "./pages/register/register";
import NotFound from "./components/notFound/notFound";
import Home from "./pages/home/home";
import Cart from "./pages/cart/cart";
import WishList from "./pages/wishList/wishList";
import AdminRoute from "./pages/authenticate/adminRoute";
import UserRoute from "./pages/authenticate/userRoute";
import Books from "./pages/books/books";
import { useSelector } from "react-redux";
import cartAPI from "./api/cart/cartAPI";
import useCartHook from "./hooks/cart/useCartHook";
import UpdateBook from "./pages/updateBook/updateBook";
import InsertBook from "./pages/insertBook/insertBook";
import Transaction from "./pages/transaction/transaction";
import BookDetails from "./pages/bookDetails/bookDetails";

function App() {
  const { userId } = useSelector((state) => state.user);
  const { showCart } = useCartHook();

  useEffect(() => {
    if (userId) showCart(userId);
  }, [userId]);

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);

  return (
    <>
      <BrowserRouter>
        {/* <PreNavbar /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<WishList />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="book">
              {/* <Route path="transaction" element={<Books />} /> */}
              <Route path="add" element={<InsertBook />} />
              <Route path="update/:bookId" element={<UpdateBook />} />
            </Route>
            <Route path="cart">
              <Route path="transaction" element={<Transaction />} />
            </Route>
            {/* <Route path="/profile" element={<Profile />}>
              <Route path="edit" element={<EditProfile />} />
              <Route path="delete" element={<DeleteProfile />} />
            </Route> */}
          </Route>
          <Route path="/user" element={<UserRoute />}>
            <Route path="cart" element={<Cart />} />
            <Route path="transaction" element={<Transaction />} />
            {/* <Route path="/update-product" element={<UpdateProduct />} />
            <Route path="/delete-product" element={<DeleteProduct />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="edit" element={<EditProfile />} />
              <Route path="delete" element={<DeleteProfile />} />
            </Route> */}
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
