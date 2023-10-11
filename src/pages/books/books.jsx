import React, { useEffect, useState } from "react";
import bookAPI from "../../api/book/bookAPI";
import { useSelector } from "react-redux";
import "./books.style.scss";
import Spinner from "../../components/spinner/spinner";
import BookCard from "../../components/card/bookCard/bookCard";
import PageNumber from "../../components/pageNumber/pageNumber";
import useBookHook from "../../hooks/book/useBookHook";

const Books = () => {
  const [searchedText, setSearchedText] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { searchKeyWord } = useSelector((state) => state.books);
  const { getSearchedBook } = bookAPI();
  const { getSearched, searchedbooks } = useBookHook();

  useEffect(() => {
    setSearchedText(searchKeyWord);
    setCurrentPage(1);
  }, [searchKeyWord]);

  useEffect(() => {
    setIsLoading(true);
    let queryParams = {};
    queryParams.text = searchedText;
    queryParams.page = currentPage;

    getSearched(queryParams);
  }, [currentPage, searchedText]);

  useEffect(() => {
    // console.log("dfsssssssssssss ", searchedbooks);
    setFilteredBooks(searchedbooks?.books);
    setPages(
      Math.ceil(searchedbooks?.filteredBookCount / searchedbooks?.limit)
    );
    setIsLoading(false);
  }, [searchedbooks]);

  const selectPageNumber = (page) => {
    // console.log(" clicked page ", page);
    setCurrentPage(page);
  };

  //   console.log(searchedText, currentPage);
  // console.log(filteredBooks);

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
              {filteredBooks?.length > 0 ? (
                <div className="book-section-cards">
                  {filteredBooks?.map((x, index) => (
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
          {filteredBooks?.length > 0 && (
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
