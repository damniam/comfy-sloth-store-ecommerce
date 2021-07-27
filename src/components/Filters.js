import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: { text, category, colors, min_price, max_price, price, shipping, company },
    handleFilters,
    clearFilters,
    all_products,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const uniqueColors = getUniqueValues(all_products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={handleFilters}
            />
          </div>
          {/* categories */}
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((cat, index) => {
                return (
                  <button
                    key={index}
                    onClick={handleFilters}
                    name="category"
                    type="button"
                    value={category}
                    className={`${
                      cat.toLowerCase() === category ? "active" : ""
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          {/* companies */}
          <div className="form-control">
            <h5>Company</h5>
            <select name="company" value={company} onChange={handleFilters}>
              {companies.map((com, index) => {
                return (
                  <option key={index} value={com}>
                    {com}
                  </option>
                );
              })}
            </select>
          </div>
          {/* colors */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {uniqueColors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="colors"
                      type="button"
                      className={`${
                        colors === "all" ? "active all-btn" : "all-btn"
                      }`}
                      data-color="all"
                      onClick={handleFilters}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="colors"
                    type="button"
                    value={category}
                    style={{ background: c }}
                    className={`${
                      c === colors ? "active color-btn" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={handleFilters}
                  >
                    {colors === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* price  */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <div>
              <input
                type="range"
                name="price"
                min={min_price}
                max={max_price}
                value={price}
                onChange={handleFilters}
              />
            </div>
          </div>
          {/* shipping  */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={handleFilters}
              checked={shipping}
            />
          </div>
          <button type="button" className="clear-btn" onClick={clearFilters}>
            Clear filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
