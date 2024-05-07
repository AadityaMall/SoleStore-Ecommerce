import "./Layout/css/ProductPage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "./Layout/Loader";
import { useAlert } from "react-alert";
import "react-responsive-modal/styles.css";
import ReviewBox from "./Layout/ReviewBox";
import { addToCart } from "../actions/cartAction";
import { addToWishlist } from "../actions/wishlistAction";
import { Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from "../constants/productConstants";
const ProductPage = (props, { p }) => {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  const alert = useAlert(); // Alert for error
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const isInWishlist = wishlistItems.find((i) => i.product === product._id)
    ? true
    : false;

  const wishlistButtonText = isInWishlist ? "Wishlisted" : "Wishlist";

  const wishListbuttonStyle = () => {
    if (isInWishlist) {
      return {
        backgroundColor: "gray",
        color: "white",
      };
    } else {
      return {
        backgroundColor: "black",
        color: "white",
      };
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [rating, setrating] = useState(1);
  const [comment, setcomment] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
    topFunction();
  }, [dispatch, id, error, alert, reviewError, success]);

  //every time page loads, scroll to top

  const incrementQunatity = () => {
    if (quantity >= product.stock) return;
    let qty = quantity + 1;
    setQuantity(qty);
  };
  const decrementQunatity = () => {
    if (quantity <= 1) return;
    let qty = quantity - 1;
    setQuantity(qty);
  };

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "large",
    sx: { color: props.mode === "light" ? "black" : "white" },
  };

  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity));
    alert.success("Item Added to cart");
  };
  const addToWishlistHandler = () => {
    dispatch(addToWishlist(id));
    alert.success("Item Added to WishList");
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={`text-${props.mode === "light" ? "dark" : "light"}`}>
            <div
              className={`container p-4 prod-detsShadow-${
                props.mode === "light" ? "dark" : "light"
              } mt-4 mb-5`}
            >
              <div className="row">
                <div className={`col-md-6 mt-2`}>
                  <Carousel autoPlay={true} infiniteLoop={true}>
                    {product.images &&
                      product.images.map((item, i) => (
                        <div key={i}>
                          <img src={item.url} alt={`Slide`} />
                        </div>
                      ))}
                  </Carousel>
                </div>
                <div className="col-md-6 details">
                  <div className="detailSection-1">
                    <h1>{product.name}</h1>
                    <p>{`Product # ${product._id}`}</p>
                  </div>
                  <div className="detailSection-2">
                    <Rating {...options} />
                    <span className="detailSection-2-span">{`(${product.numberOfReview} Reviews)`}</span>
                  </div>
                  <div className="detailSection-3">
                    <span>{`₹${product.price}`}</span>
                    <b
                      className={`stock-status ${
                        product.stock < 1 ? "text-danger" : "text-success"
                      }`}
                    >
                      ({product.stock < 1 ? "Out of Stock" : "In Stock"})
                    </b>
                  </div>
                  <div className="detailSection-4">
                    <p>{product.description}</p>
                  </div>
                  <div className="detailSection-6">
                    <div className={`detailSection-6-1`}>
                      <button
                        className={`mode-${
                          props.mode === "light" ? "dark" : "light"
                        }`}
                        onClick={decrementQunatity}
                      >
                        -
                      </button>
                      <input type="number" value={quantity} readOnly />
                      <button
                        className={`mode-${
                          props.mode === "light" ? "dark" : "light"
                        }`}
                        onClick={incrementQunatity}
                      >
                        +
                      </button>
                    </div>
                    <button
                      id="addToCart"
                      className={`mode-${
                        props.mode === "light" ? "dark" : "light"
                      } ${
                        product.stock < 1 ? "disabled-true" : "disabled-false"
                      }`}
                      onClick={addToCartHandler}
                      disabled={product.stock < 1 ? true : false}
                    >
                      Add to Cart
                    </button>
                    <button
                      id="addToWishList"
                      className={`mode-${
                        props.mode === "light" ? "dark" : "light"
                      }`}
                      onClick={addToWishlistHandler}
                      disabled={isInWishlist}
                      style={wishListbuttonStyle()}
                    >
                      {wishlistButtonText} <i className="fa fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <center>
                  <h1>Reviews</h1>
                </center>
                {isAuthenticated ? (
                  <div className="personal-review-submit">
                    <div id="personDetsSection">
                      <img
                        src={user.avatar.url}
                        alt="Profile"
                        className="user_profileImage"
                      />
                      <span id="user_profileEmail">{user.email}</span>
                    </div>
                    <div>
                      <Rating
                        value={rating}
                        onChange={(e, v) => setrating(v)}
                        size="large"
                        sx={{
                          color: props.mode === "light" ? "black" : "white",
                        }}
                      />
                    </div>
                    <div className="reviewForm">
                      <textarea
                        cols="30"
                        rows="5"
                        placeholder="Your Message"
                        required
                        value={comment}
                        onChange={(e) => setcomment(e.target.value)}
                      ></textarea>
                      {console.log(comment)}
                      <button
                        value="submit"
                        className={`mode-${
                          props.mode === "light" ? "dark" : "light"
                        }`}
                        onClick={reviewSubmitHandler}
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="loginValidation">
                    <center>
                      <h3>Login to give review</h3>
                    </center>
                  </div>
                )}

                {product && product.reviews ? (
                  <div className="otherReviews">
                    {product.reviews &&
                      product.reviews.map((item, index) => (
                        <ReviewBox
                          review={item}
                          key={index}
                          mode={props.mode}
                        />
                      ))}
                  </div>
                ) : (
                  <p id="noReviewText">There are no reviews yet</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
