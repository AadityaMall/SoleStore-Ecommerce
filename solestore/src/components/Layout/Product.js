import React from "react";
import { Link } from "react-router-dom";
import "./css/Product.css";
import { Rating } from "@mui/material";

const Product = (props) => {
  
  const options = {
    value: props.product.ratings,
    readOnly:true,
    precision:0.5,
    size: "medium",
    sx:{color:props.modeProd === "light" ? "black" : "white"}
  };

  return (
    <>
      <Link
        className={`prod-box shadow-${
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
          <Rating {...options} />
          <span
            className={`col-${props.modeProd === "light" ? "light" : "dark"} rating-review-prodBox-span`}
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
