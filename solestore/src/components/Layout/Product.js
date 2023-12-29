import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./css/Product.css";

const Product = (props) => {
  const options = {
    edit: false,
    activeColor: props.modeProd === "light" ? "black" : "white",
    value: props.product.ratings,
    isHalf: true,
    size: 25,
  };

  return (
    <>
      <Link
        className={`prod-box prod-boxShadow-${
          props.modeProd === "light" ? "dark" : "light"
        }`}
        to={`/product/${props.product._id}`}
      >
        <img src={props.product.images[0].url} alt={props.product.name} />
        <span
          className={`prod-name col-${
            props.modeProd === "light" ? "light" : "dark"
          }`}
        >
          {props.product.name}
        </span>
        <div className="rating-review-prodBox">
          <ReactStars {...options} />
          <span
            className={`col-${props.modeProd === "light" ? "light" : "dark"}`}
          >
            {`(${props.product.numberOfReview} Reviews)`}
          </span>
        </div>
        <span
          className={`prod-name col-${
            props.modeProd === "light" ? "light" : "dark"
          }`}
        >
          {`₹${props.product.price}`}
        </span>
      </Link>
    </>
  );
};

export default Product;
