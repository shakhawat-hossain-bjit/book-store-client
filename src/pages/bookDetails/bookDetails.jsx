import React, { useEffect, useState } from "react";
import "./bookDetails.style.scss";
import { useParams } from "react-router-dom";
import useBookHook from "../../hooks/book/useBookHook";
import demobook from "../../assets/images/demoBook.png";
import "./bookDetails.style.scss";
import Spinner from "../../components/spinner/spinner";
import RatingStar from "../../components/ratingStart/ratingStar";

const BookDetails = () => {
  const { id } = useParams();
  const { getBookById, book } = useBookHook();
  const [imageState, setImageState] = useState(0);

  useEffect(() => {
    if (id) {
      // console.log(id);
      getBookById(id);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        let url = book?.images?.[0];
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
    if (book?.images?.length) {
      const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;
      const isValidImageUrl = imageUrlRegex.test(book?.images?.[0]);
      if (isValidImageUrl) loadImages();
      else setImageState(-1);
    } else {
      setImageState(-1);
    }
  }, [book?.images]);

  return (
    <div className="container">
      <div className="book-details-container">
        {/* <h2>book details</h2>
        <h2>{id}</h2>
        <h3>{book.title}</h3> */}
        <div class="book-container">
          <div class="book-details">
            <div class="book-image">
              {imageState == 0 ? (
                <div style={{ width: "140px", height: "180px" }}>
                  <Spinner />
                </div>
              ) : (
                <img
                  src={`${imageState == 1 ? book?.images?.[0] : demobook}`}
                  alt="book image"
                  width="140px"
                  height="180px"
                />
              )}
            </div>
            <div class="book-info-container">
              <div class="book-info">
                <small class="company-name">{book?.category?.[0]}</small>
                <h1 className="book-title">
                  {book?.title}
                  <br />
                  {book?.author && book?.author != "Unknown" && (
                    <small>Written by {book?.author}</small>
                  )}
                </h1>
                <p class="book-description">Language : {book.language},</p>
                <div>
                  <RatingStar rating={book?.rating} />
                </div>

                <h3>
                  {book?.discountPercentage ? (
                    <>
                      {book?.newPrice}
                      <small class="discount">
                        - {book?.discountPercentage}%
                      </small>
                    </>
                  ) : (
                    <>{book.price}</>
                  )}
                </h3>

                {book?.discountPercentage ? (
                  <p class="previous-price">{book?.price}</p>
                ) : (
                  <>{"  "}</>
                )}

                <button id="add-to-cart">
                  <svg
                    fill="#fff"
                    width="22"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                      fill-rule="nonzero"
                    ></path>
                  </svg>
                  <p>Add to cart</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
