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
            src="../images/aaditya_profile.jpeg"
            alt="Profile"
            className="user_profileImage"
          />
          <span id="user_profileEmail">{`${props.review.name}`}</span>
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
