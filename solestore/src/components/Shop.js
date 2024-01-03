import React, { useState } from "react";
import { useEffect } from "react";
import { clearErrors, getProduct } from "../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Layout/Loader.js";
import { useAlert } from "react-alert";
import Product from "./Layout/Product.js";
import "./Layout/css/Shop.css";
import Pagination from "@mui/material/Pagination";
import { Slider, circularProgressClasses } from "@mui/material";
const Shop = (props) => {
  //every time page loads, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, resultPerPage, productsCount } =
    useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(currentPage));
  }, [dispatch, alert, error, currentPage]);
  const setCurrentPageNo = (e, p) => {
    setCurrentPage(p);
  };
  const priceHandler = (e, newP) => {
    setPrice(newP);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
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
            className={`navbar navbar-expand-md navbar-${props.mode} bg-${props.mode}`}
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
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                    <div className="my-slider-price">
                      <span id="priceRangeLabel">Price Range :</span>
                      <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={30000}
                      />
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-item"> hellooo</div>
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
          {resultPerPage < productsCount && (
            <div className="pagination mt-5 mb-5">
              <Pagination count={Math.ceil(productsCount/resultPerPage)} onChange={setCurrentPageNo} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Shop;
