import React from "react";
import { Rating } from "@mui/material";

const ReviewBox = ({ mode, review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
    size: "large",
    sx: { color: mode === "light" ? "black" : "white" }
  };

  return (
    <div className="tw:min-w-[350px] tw:max-w-[390px] tw:m-[5px] tw:p-[10px] tw:flex tw:flex-col tw:dark:shadow-[0px_5px_10px_rgba(255,255,255)] tw:shadow-[0px_5px_10px_rgba(0,0,0)]">
      <div className="tw:flex tw:items-center tw:justify-start tw:p-[10px] tw:w-full">
        <img
          src={review.avatar.url}
          alt="Profile"
          className="tw:w-[60px] tw:aspect-square tw:object-contain tw:rounded-full tw:mr-[10px] tw:border tw:border-black tw:dark:border-white"
        />
        <span className="tw:text-black tw:dark:text-white">{review.email}</span>
      </div>
      
      <hr className="tw:border-gray-300 tw:dark:border-gray-700" />

      <div className="tw:flex tw:flex-col">
        <div className="tw:flex tw:justify-center tw:my-2">
          <Rating {...options} />
        </div>
        <p className="tw:text-black tw:dark:text-white tw:mt-2">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewBox;
