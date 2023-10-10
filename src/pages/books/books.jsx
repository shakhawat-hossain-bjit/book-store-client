import React, { useEffect, useState } from "react";
import bookAPI from "../../api/bookAPI";
import { useSelector } from "react-redux";
import "./books.style.scss";
import Spinner from "../../components/spinner/spinner";
import BookCard from "../../components/card/bookCard/bookCard";
import PageNumber from "../../components/pageNumber/pageNumber";

const Books = () => {
  const [searchedText, setSearchedText] = useState([]);
  const [searchedBook, setSearchedBooks] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { searchKeyWord } = useSelector((state) => state.books);
  const { getSearchedBook } = bookAPI();

  useEffect(() => {
    setSearchedText(searchKeyWord);
    setCurrentPage(1);
  }, [searchKeyWord]);

  useEffect(() => {
    setIsLoading(true);
    getSearchedBook(searchKeyWord, currentPage)
      .then((data) => {
        setSearchedBooks(data?.data?.books);
        // console.log(data?.data?.filteredBookCount, data?.data?.limit);
        setPages(Math.ceil(data?.data?.filteredBookCount / data?.data?.limit));
      })
      .catch((e) => {
        setSearchedBooks([]);
        setPages(1);
        // console.log(e);
        // console.log("Error: ", e?.response?.statusText);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, searchedText]);

  const selectPageNumber = (page) => {
    console.log(" clicked page ", page);
    setCurrentPage(page);
  };

  //   console.log(searchedText, currentPage);
  console.log(searchedBook);

  return (
    <div className="container ">
      <div className="book-section-container">
        <div>
          {isLoading ? (
            <div className="top-bottom-margin three-four-height">
              <Spinner />
            </div>
          ) : (
            <div>
              {searchedBook?.length > 0 ? (
                <div className="book-section-cards">
                  {searchedBook?.map((x, index) => (
                    <BookCard key={x?._id} props={x} />
                  ))}
                </div>
              ) : (
                <h3>No Book Found</h3>
              )}
            </div>
          )}
        </div>
        <div className="book-section-page-container">
          {searchedBook?.length > 0 && (
            <PageNumber
              selectPageNumber={selectPageNumber}
              pages={pages}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
