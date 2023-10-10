import React, { useContext, useEffect, useState } from "react";
import "./navbar.style.scss";
import BookWormLogo from "../bookWormLogo/bookWormLogo";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { SlHeart, SlHandbag, SlUser } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { signOutReducer } from "../../store/slices/userReducer";
import userAPI from "../../api/userAPI";
import { searchBookKeywordReducer } from "../../store/slices/bookReducer";

const Navbar = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [search, setSearch] = useState("");
  const [cartLength, setCartLength] = useState("");
  const reduxState = useSelector((state) => state);
  const { email, role, userName } = reduxState.user;
  const { books } = reduxState.cart;
  const { checkUser } = userAPI();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserInfo({ email, role, userInfo });
  }, [email, role, userName]);

  useEffect(() => {
    checkUser();
  }, []);

  const logOutUser = () => {
    dispatch(signOutReducer());
  };

  useEffect(() => {
    // console.log(search, location);
    if (search || location?.pathname == "/books") {
      const timeOutFunc = setTimeout(() => {
        dispatch(searchBookKeywordReducer(search));
        navigate(`/books`);
      }, 1500);
      return () => clearTimeout(timeOutFunc);
    }
  }, [search]);

  useEffect(() => {
    setCartLength(books?.length);
  }, [books]);

  useEffect(() => {
    // console.log("location ", location);
    if ((location.pathname = "/cart")) {
      const timer = setTimeout(() => {
        console.log("fetching cart.......................................");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <nav className="nav-container">
      <ul className=" container">
        <div className="nav-logo">
          <Link to="/home">
            <BookWormLogo />
          </Link>
        </div>

        <div className="navbar-optinos">
          <div className="nav-search-container">
            <input
              type="text"
              placeholder="Search a book"
              onKeyUp={(e) => setSearch(e?.target?.value)}
            />
          </div>
          {/* <li>
            <Link to="/home">Home</Link>
          </li> */}
          {/* <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/shops">Shops</Link>
          </li> */}
          <li>
            <Link to="/wishlist">
              <SlHeart className="icon" size={24} />
            </Link>
          </li>
          <li>
            <div>
              <Link to="/cart" className="navbar-cart">
                <p>{cartLength}</p>
                <SlHandbag className="icon" size={24} />
              </Link>
            </div>
          </li>
          {/* <li>
            <Link href="/others">Others</Link>
          </li> */}
          {userInfo?.email ? (
            <li>
              <button
                className="logout-btn"
                onClick={() => {
                  logOutUser();
                }}
              >
                Log Out
              </button>
            </li>
          ) : (
            <li>
              <div className="">
                <Link to="/login">
                  <SlUser className="icon" size={24} />
                </Link>
              </div>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;