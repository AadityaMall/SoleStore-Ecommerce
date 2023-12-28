import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./css/Product.css";

  const Product = (props) => {

    const prodBoxTheme = () => {
        if (props.modeProd === "light") {
          return {
            color: "black",
          };
        } else {
          return {
            color: "white",
          };
        }
      };

    const options = {
      edit: false,
      activeColor:` ${props.modeProd === "light" ? "black" : "white"}`,
      value: 2.5,
      isHalf: true,
      size: 25,
    };

  return (
    <>
      <Link
        className={`prod-box-${props.modeProd === "light" ? "dark" : "light"}`}
        to={props.product._id}
      >
        <img src={props.product.images[0].url} alt={props.product.name} />
        <span className="product-name" style={prodBoxTheme()}>
          {props.product.name}
        </span>
        <div className="rating-review-prodBox">
          <ReactStars {...options} />
          <span style={prodBoxTheme()}>(10 Reviews)</span>
        </div>
        <span className="prod-price" style={prodBoxTheme()}>
          {props.product.price}
        </span>
      </Link>
    </>
  );
};

export default Product;
