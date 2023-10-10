import React, { useEffect, useState } from "react";
import NavSections from "../navSections/navSections";
import "./featuredBooks.style.scss";
import BookCard from "../card/bookCard/bookCard";
import bookGetAPI from "../../api/book/bookGetAPI";
import { useSelector } from "react-redux";
import Spinner from "../spinner/spinner";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState(0);
  const { getBooksByPriceAsc, getBooksByRatingDesc, getBooksByViewDesc } =
    bookGetAPI();
  const sectionName = ["featured", "on sale", "most viewed"];
  const userSelectedSection = (index) => {
    setSelectedSection(index);
  };
  // console.log(selectedSection);

  let {
    booksByRatingDesc,
    booksByPriceAsc,
    booksByViewsDesc,
    isLoadingBooksByRating,
    isLoadingBooksByPrice,
    isLoadingBooksByView,
  } = useSelector((state) => state.books);

  useEffect(() => {
    if (selectedSection == 0) {
      setBooks(booksByRatingDesc);
    } else if (selectedSection == 1) {
      setBooks(booksByPriceAsc);
    } else if (selectedSection == 2) {
      setBooks(booksByViewsDesc);
    }
  }, [booksByRatingDesc, booksByPriceAsc, booksByViewsDesc]);

  useEffect(() => {
    if (selectedSection == 0) {
      // console.log("isLoadingBooksByRating ", isLoadingBooksByRating);
      setIsLoading(isLoadingBooksByRating);
    } else if (selectedSection == 1) {
      // console.log("isLoadingBooksByPrice ", isLoadingBooksByPrice);
      setIsLoading(isLoadingBooksByPrice);
    } else if (selectedSection == 2) {
      // console.log("isLoadingBooksByView ", isLoadingBooksByView);
      setIsLoading(isLoadingBooksByView);
    }
  }, [isLoadingBooksByPrice, isLoadingBooksByRating, isLoadingBooksByView]);

  useEffect(() => {
    if (selectedSection == 0) {
      getBooksByRatingDesc();
    } else if (selectedSection == 1) {
      getBooksByPriceAsc();
    } else if (selectedSection == 2) {
      getBooksByViewDesc();
    }
  }, [selectedSection]);

  // console.log(isLoading);

  return (
    <div className="container ">
      <div className="featured-section-container">
        <div className="featured-section-title">
          <h2>Featured Books</h2>
        </div>
        <div className="featured-section-nav-contianer">
          <NavSections
            activeOption={selectedSection}
            options={sectionName}
            userSelectedSection={userSelectedSection}
          />
        </div>

        {isLoading ? (
          <div className="top-bottom-margin">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="featured-books-cards">
              {books?.map((x, index) => (
                <BookCard key={x?._id} props={x} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedBooks;
