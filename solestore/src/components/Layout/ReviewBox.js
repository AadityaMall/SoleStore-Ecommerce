import React from "react";
import "./css/ReviewBox.css";
import { Rating } from "@mui/material";
const ReviewBox = (props) => {
  const options = {
    value: props.review.rating,
    readOnly:true,
    precision:0.5,
    size: "large",
    sx:{color:props.mode === "light" ? "black" : "white"}
  };
console.log(props.review)
  return (
    <>
      <div className="review-card">
        <div id="userDetsSection">
          <img
            src={props.review.avatar.url}
            alt="Profile"
            className="user_profileImage"
          />
          <span id="user_profileEmail">{`${props.review.email}`}</span>
        </div>
        <hr />

        <div className="user_review">
          <center>
            <div className="rating-review">
              <Rating {...options} />
            </div>
          </center>
          <p>{props.review.comment}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewBox;
