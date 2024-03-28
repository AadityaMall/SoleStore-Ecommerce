import "./Layout/css/ProductPage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Loader from "./Layout/Loader";
import { useAlert } from "react-alert";
import "react-responsive-modal/styles.css";
import ReviewBox from "./Layout/ReviewBox";
import { addToCart } from "../actions/cartAction";
import { addToWishlist } from "../actions/wishlistAction";
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
  const {wishlistItems} = useSelector((state)=>state.wishlist);
  const isInWishlist = wishlistItems.find((i)=>i.product===product._id)?true:false;
  
  const wishlistButtonText = isInWishlist?"Wishlisted":"Wishlist";

  const wishListbuttonStyle = () => {
    if(isInWishlist){
      return {
        backgroundColor:"gray",
        color:"white",
      }
    }
    else{
      return{
        backgroundColor:"black",
        color:"white"
      }
    }
  }

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
    topFunction()
  }, [dispatch, id, error, alert]);

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
    edit: false,
    activeColor: "black",
    value: product.ratings,
    isHalf: true,
    size: 40,
  };

  const submitOptions = {
    activeColor: "black",
    isHalf: true,
    size: 40,
  };
  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity));
    alert.success("Item Added to cart");
  };
  const addToWishlistHandler = () => {
    dispatch(addToWishlist(id));
    alert.success("Item Added to WishList");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={`text-${props.mode === "light" ? "dark" : "light"}`}>
            <div className="page-title">
              <span>{`Products > ${product.name} >`}</span>
            </div>
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
                    <ReactStars {...options} />
                    <span>{`(${product.numberOfReview} Reviews)`}</span>
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
                      }`}
                      onClick={addToCartHandler}
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
                <div className="personal-review-submit">
                  <div id="personDetsSection">
                    <img
                      src="../images/defaultProfile.jpg"
                      alt="Profile"
                      className="user_profileImage"
                    />
                    <span id="user_profileEmail">example@gmail.com</span>
                  </div>
                  <div>
                    <ReactStars {...submitOptions} />
                  </div>
                  <div className="reviewForm">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      placeholder="Your Message"
                      required
                    ></textarea>
                    <button
                      value="submit"
                      className={`mode-${
                        props.mode === "light" ? "dark" : "light"
                      }`}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
                <hr />
                {product.reviews && product.reviews[0] ? (
                  <div className="otherReviews">
                    {product.reviews &&
                      product.reviews.map((review, index) => (
                        <ReviewBox review={review} key={index} />
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
