import React from "react";
import "./FilterSection.style.scss";

const FilterSection = () => {
  const changeSortParam = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="sidebar-container">
      <div class="sidebar">
        <h3 id="sidebar-title">Filter</h3>

        {/* <label class="heading">Price</label>
        <input id="pi_input" type="range" min="0" max="100" value="50" />
        <span>
          <output id="value"></output>%
        </span> */}

        <br />
        <br />

        <div className="sort-parameter-container">
          <p class="heading">Sort Parameter</p>
          <div className="sort-parameter">
            <label for="price">
              <input
                type="checkbox"
                id="price"
                name="sort-parameter"
                value="price"
                onClick={(e) => changeSortParam(e)}
              />
              Price
            </label>

            <label for="rating">
              <input
                type="checkbox"
                id="rating"
                name="sort-parameter"
                value="rating"
                onClick={(e) => changeSortParam(e)}
              />
              Rating
            </label>

            <label for="stock">
              <input
                type="checkbox"
                id="stock"
                name="sort-parameter"
                value="stock"
                onClick={(e) => changeSortParam(e)}
              />
              Stock
            </label>

            <label for="reviewCount">
              <input
                type="checkbox"
                id="reviewCount"
                name="sort-parameter"
                value="reviewCount"
                onClick={(e) => changeSortParam(e)}
              />
              Review
            </label>

            <label for="year">
              <input
                type="checkbox"
                id="year"
                name="sort-parameter"
                value="reviewyearCount"
                onClick={(e) => changeSortParam(e)}
              />
              Publication Year
            </label>
          </div>
        </div>

        <div className="sort-order-container">
          <label class="heading">Sort Order</label>
          <div id="sort-order">
            <label for="asc">
              <input type="checkbox" id="asc" name="sort-order" value="asc" />
              Ascending
            </label>
            <br />

            <label for="desc">
              <input type="checkbox" id="desc" name="sort-order" value="desc" />
              Descending
            </label>
            <br />
          </div>
        </div>

        <div className="catergory-container">
          <label class="heading">Category</label>
          <div className="category">
            <div>
              <input
                type="radio"
                name="radSize"
                id="finction"
                value="finction"
                // checked="checked"
              />
              <label for="finction">Finction</label>
            </div>
            <div>
              <input type="radio" name="radSize" id="Poetry" value="Poetry" />
              <label for="Poetry">Poetry</label>
            </div>
            <div>
              <input
                type="radio"
                name="radSize"
                id="ClassicLiterature"
                value="ClassicLiterature"
              />
              <label for="ClassicLiterature">Classic Literature</label>
            </div>
            <div>
              <input
                type="radio"
                name="radSize"
                id="RenaissanceDrama"
                value="RenaissanceDrama"
              />
              <label for="RenaissanceDrama">Renaissance Drama</label>
            </div>

            <div>
              <input
                type="radio"
                name="radSize"
                id="ContemporaryLiterature"
                value="medium"
              />
              <label for="ContemporaryLiterature">
                Contemporary Literature
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
