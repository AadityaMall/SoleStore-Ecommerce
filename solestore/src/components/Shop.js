import React, { useState } from "react";
import { useEffect } from "react";
import { clearErrors, getProduct } from "../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Layout/Loader.js";
import { useAlert } from "react-alert";
import Product from "./Layout/Product.js";
import "./Layout/css/Shop.css";
import Pagination from "@mui/material/Pagination";
import { Slider } from "@mui/material";
import { useLocation } from "react-router-dom";

const Shop = (props) => {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const filterNav = document.getElementById("filterNav");

      if (filterNav) {
        setIsNavbarFixed(scrollTop >= 200);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //every time page loads, scroll to top

  let { state } = useLocation();
  const shopBanner = () => {
    if (window.innerWidth < 500) {
      return "./images/shopWithUs_phone_bg.png";
    } else {
      return "./images/shopWithUs_bg.png";
    }
  };

  const getFilterCategory = () => {
    let selectElement = document.querySelector("#filter");
    setCategory(selectElement.value);
  };
  const getSortValue = () => {
    let selectElement = document.querySelector("#sort");
    setSort(selectElement.value);
  };
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    resultPerPage,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState(state ? state.homeFilter : "");
  const [sort, setSort] = useState();
  const [ratings, setRatings] = useState(0);
  
  const homeFilterAvailable = state ? state.homeFilter : ""

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    const dispatcher = () => {
      dispatch(getProduct(1, [0,30000], homeFilterAvailable, 0));
    }
    dispatcher();
  }, [dispatch, alert, error, homeFilterAvailable]);

  const applyFilters = () => {
    dispatch(getProduct(currentPage, price, category, ratings, sort));
    
  }
  const setCurrentPageNo = (e, p) => {
    setCurrentPage(p);
  };
  const priceHandler = (e, newP) => {
    setPrice(newP);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };

    handleScrollToTop(); // Scroll to top when component mounts

    return () => {
      // Cleanup (not really necessary for scrollTo, but good practice)
      window.removeEventListener("scroll", handleScrollToTop);
    };
  }, []); // Empty dependency array to run once on component mount

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <img src={shopBanner()} alt="" width="100%" />
          </div>
          <div
            className={`page-header text-${
              props.mode === "light" ? "dark" : "light"
            } mt-4`}
          >
            <h1>Products</h1>
            <center>
              <hr width={"70%"} />
            </center>
          </div>
          <nav
            className={`navbar navbar-expand-lg navbar-${props.mode} bg-${
              props.mode
            } text-${props.mode === "light" ? "dark" : "light"} filter-navbar`}
            id="filterNav"
            style={{
              borderTop: `1px solid ${
                props.mode === "light" ? "black" : "white"
              }`,
              position: isNavbarFixed ? "fixed" : "relative",
              top: isNavbarFixed ? 60 : 0,
              paddingTop:isNavbarFixed && window.innerWidth>900?50:10
            }}
          >
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupporteddContent"
                aria-controls="navbarSupporteddContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span>Filters</span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupporteddContent"
              >
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 shop-filters">
                  <li className="nav-item-shop">
                    <div className="my-slider-price">
                      <span id="priceRangeLabel">Price Range :</span>
                      <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                        min={0}
                        max={30000}
                        color="secondary"
                      />
                    </div>
                  </li>
                  <li className="nav-item-shop">
                    <select
                      value={category}
                      onChange={getFilterCategory}
                      name="filter"
                      id="filter"
                      className={`color-${
                        props.mode === "light" ? "dark" : "light"
                      }`}
                    >
                      <option value="">Filter : Category</option>
                      <option value="Sneakers">Sneakers</option>
                      <option value="Formals">Formals</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </li>
                  <li className="nav-item-shop">
                    <select
                      value={sort}
                      onChange={getSortValue}
                      name="sort"
                      id="sort"
                      className={`color-${
                        props.mode === "light" ? "dark" : "light"
                      }`}
                    >
                      <option value="DEFAULT">Sort : Price Range</option>
                      <option value="price">Low to High</option>
                      <option value="-price">High to Low</option>
                    </select>
                  </li>
                  <li className="nav-item-shop">
                    <div className="my-slider-price">
                      <span id="priceRangeLabel">Rating :</span>
                      <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                          setRatings(newRating);
                        }}
                        valueLabelDisplay="on"
                        aria-labelledby="continuous-slider"
                        min={0}
                        max={5}
                        color="secondary"
                      />
                    </div>
                  </li>
                  <li className="nav-item-shop">
                    <div className="apply-filter">
                        <button className="btn-apply-filter btn" onClick={applyFilters}>Apply</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="products">
            {products &&
              products.map((product, index) => (
                <Product key={index} product={product} modeProd={props.mode} />
              ))}
          </div>
          {resultPerPage < count && (
            <div className="pagination mt-5 mb-5">
              <Pagination
                count={Math.ceil(productsCount / resultPerPage)}
                onChange={setCurrentPageNo}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Shop;
