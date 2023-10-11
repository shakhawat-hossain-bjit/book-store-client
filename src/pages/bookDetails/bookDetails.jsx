import React, { useEffect } from "react";
import "./bookDetails.style.scss";
const BookDetails = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="container">
      <div className="book-details-container">
        <h2>book details</h2>
      </div>
    </div>
  );
};

export default BookDetails;
