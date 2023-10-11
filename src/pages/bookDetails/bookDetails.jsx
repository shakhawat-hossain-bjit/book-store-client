import React, { useEffect } from "react";
import "./bookDetails.style.scss";
import { useParams } from "react-router-dom";
import useBookHook from "../../hooks/book/useBookHook";
import "./bookDetails.style.scss";

const BookDetails = () => {
  const { id } = useParams();
  const { getBookById, book } = useBookHook();

  useEffect(() => {
    if (id) {
      console.log(id);
      getBookById(id);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  return (
    <div className="container">
      <div className="book-details-container">
        <h2>book details</h2>
        <h2>{id}</h2>
        <h3>{book.title}</h3>
      </div>
    </div>
  );
};

export default BookDetails;
