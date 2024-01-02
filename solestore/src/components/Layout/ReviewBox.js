import React from "react";
import "./css/ReviewBox.css";
import ReactStars from "react-rating-stars-component";
const ReviewBox = (props) => {
  const options = {
    edit: false,
    activeColor: "black",
    value: props.review.rating,
    isHalf: true,
    size: 30,
  };
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
              <ReactStars {...options} />
            </div>
          </center>
          <p>{props.review.comment}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewBox;
