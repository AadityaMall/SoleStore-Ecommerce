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
  //every time page loads, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  let {state} = useLocation()
  
  const shopBanner = () => {
    if (window.innerWidth < 500) {
      return "./images/shopWithUs_phone_bg.png";
    } else {
      return "./images/shopWithUs_bg.png";
    }
  };

  const getFilterCategory = () => {
    let selectElement = document.querySelector('#filter');
    setCategory(selectElement.value);
  }

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, resultPerPage, productsCount, filteredProductsCount} =
    useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  const [category,setCategory] =  useState(state?state.homeFilter:"")
  const [ratings,setRatings] =  useState(0)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(currentPage,price,category,ratings));
  }, [dispatch, alert, error, currentPage,price,category,ratings]);

  const setCurrentPageNo = (e, p) => {
    setCurrentPage(p);
  };
  const priceHandler = (e, newP) => {
    setPrice(newP);
  };

  let count = filteredProductsCount;
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
            className={`navbar navbar-expand-lg navbar-${props.mode} text-${
              props.mode === "light" ? "dark" : "light"
            }`}
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
                        onChangeCommitted={priceHandler}
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
                      <option value="">
                        Filter : Category
                      </option>
                      <option value="Sneakers">Sneakers</option>
                      <option value="Formals">Formals</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </li>
                  {/* <li className="nav-item-shop">
                    <select
                      name="sort"
                      id="sort"
                      className={`color-${
                        props.mode === "light" ? "dark" : "light"
                      }`}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT">Sort : Price Range</option>
                      <option value="1">Low to High</option>
                      <option value="-1">High to Low</option>
                    </select>
                  </li> */}
                  <li className="nav-item-shop">
                    <div className="my-slider-price">
                      <span id="priceRangeLabel">Rating :</span>
                      <Slider
                        value={ratings}
                        onChangeCommitted={(e,newRating) =>{
                          setRatings(newRating)
                        }}
                        valueLabelDisplay="on"
                        aria-labelledby="continuous-slider"
                        min={0}
                        max={5}
                        color="secondary"
                      />
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
