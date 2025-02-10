import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const Product = ({ mode, product }) => {
  let options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "medium",
    sx: { color: "black" },
  };

  return (
    <div data-theme={mode}>
      <Link
        className="text-reset tw:no-underline tw:max-w-[350px] tw:w-[350px] tw:p-[10px] tw:text-center tw:flex tw:flex-col tw:justify-evenly tw:items-center tw:m-[20px] tw:transition-transform tw:duration-300 tw:ease-in-out tw:hover:scale-105 tw:dark:shadow-[0px_5px_10px_rgba(255,255,255)] tw:shadow-[0px_5px_10px_rgba(0,0,0)]"
        to={`/product/${product._id}`}
      >
        <img
          src={product.images[0].url}
          alt={product.name}
          className="tw:max-w-[330px] tw:mb-[10px]"
        />
        <span className=" tw:text-[18px] tw:font-bold tw:dark:text-white">
          {product.name}
        </span>
        <div className="tw:flex tw:items-center">
          <Rating {...options} />
          <span className="tw:ml-[10px] tw:dark:text-white">
            {`(${product.numberOfReview} Reviews)`}
          </span>
        </div>
        <span className="tw:text-[18px] tw:font-bold tw:dark:text-white">
          {`₹${product.price}`}
        </span>
      </Link>
    </div>
  );
};

export default Product;
