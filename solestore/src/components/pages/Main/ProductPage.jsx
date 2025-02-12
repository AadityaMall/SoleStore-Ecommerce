import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";

import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../redux/actions/productAction";
import { addToCart } from "../../redux/actions/cartAction";
import { addToWishList } from "../../redux/actions/wishlistAction";
import { NEW_REVIEW_RESET } from "../../redux/constants/productConstants";
import ReviewBox from "../../layout/ReviewBox";
import Loader from "../../layout/Loader";

const ProductPage = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user, loading: userLoad } = useSelector((state) => state.user);
  const { success, error: reviewError } = useSelector((state) => state.newReview);
  const { product, loading, error } = useSelector((state) => state.productDetails);

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review Submitted");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, id, error, reviewError, success]);
  useEffect(() => {
    dispatch(getProductDetails(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);
  const incrementQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "large",
    sx: { color: mode === "light" ? "black" : "white" },
  };

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(addToCart(id, quantity));
    toast.success("Item Added to cart");
  };

  const addToWishlistHandler = () => {
    dispatch(addToWishList(id));
    toast.success("Item Added to WishList");
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
  };

  if (loading || userLoad) return <Loader />;

  return (
    <div data-theme={mode}>
      <div className="tw:min-h-screen tw:py-12 tw:bg-white tw:dark:bg-[#212529]">
        <div className="tw:max-w-7xl tw:mx-auto tw:px-4 tw:sm:px-6 tw:lg:px-8">
        <div className="tw:bg-white tw:dark:bg-[#343a40] tw:shadow-[0px_5px_10px_rgba(0,0,0)] tw:rounded-lg tw:overflow-hidden">
          <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-8 tw:p-8">
            {/* Left Column - Product Images */}
            <div data-theme={mode} className="tw:w-full">
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={true}
                infiniteLoop={true}
                className="tw:w-full"
                thumbWidth={60}
                renderArrowPrev={(clickHandler, hasPrev) => (
                  <button
                    onClick={clickHandler}
                    className={`tw:absolute tw:left-0 tw:top-1/2 tw:-translate-y-1/2 tw:z-10 tw:p-2 tw:bg-black/50 tw:dark:bg-white/50 tw:rounded-r ${
                      !hasPrev && 'tw:hidden'
                    }`}
                  >
                    <i className="fa fa-chevron-left tw:text-white tw:dark:text-black" />
                  </button>
                )}
                renderArrowNext={(clickHandler, hasNext) => (
                  <button
                    onClick={clickHandler}
                    className={`tw:absolute tw:right-0 tw:top-1/2 tw:-translate-y-1/2 tw:z-10 tw:p-2 tw:bg-black/50 tw:dark:bg-white/50 tw:rounded-l ${
                      !hasNext && 'tw:hidden'
                    }`}
                  >
                    <i className="fa fa-chevron-right tw:text-white tw:dark:text-black" />
                  </button>
                )}
                renderThumbs={() =>
                  product.images?.map((item, i) => (
                    <div key={i} className="tw:aspect-square tw:w-full tw:h-full">
                      <img 
                        src={item.url} 
                        alt={`Thumbnail ${i + 1}`}
                        className="tw:w-full tw:h-full tw:object-contain tw:dark:border-white tw:border-black tw:border-2"
                      />
                    </div>
                  ))
                }
              >
                {product.images?.map((item, i) => (
                  <div key={i} className="tw:aspect-square tw:w-full">
                    <img 
                      src={item.url} 
                      alt={`Product ${i + 1}`}
                      className="tw:w-full tw:h-full tw:object-contain" 
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Right Column - Product Details */}
            <div className="tw:space-y-6">
              <div>
                <h1 className="tw:text-2xl tw:font-bold tw:text-gray-900 tw:dark:text-white">
                  {product.name}
                </h1>
                <p className="tw:text-sm tw:text-gray-500 tw:dark:text-gray-400">
                  Product # {product._id}
                </p>
              </div>

              <div className="tw:flex tw:items-center tw:space-x-4">
                <Rating {...options} />
                <span className="tw:text-gray-600 tw:dark:text-gray-300">
                  ({product.numberOfReview} Reviews)
                </span>
              </div>

              <div className="tw:flex tw:items-center tw:space-x-4">
                <span className="tw:text-3xl tw:font-bold tw:text-gray-900 tw:dark:text-white">
                  ₹{product.price}
                </span>
                <span className={`tw:text-sm ${product.stock < 1 ? 'tw:text-red-500' : 'tw:text-green-500'}`}>
                  ({product.stock < 1 ? 'Out of Stock' : 'In Stock'})
                </span>
              </div>

              <p className="tw:text-gray-700 tw:dark:text-gray-300">
                {product.description}
              </p>

              {/* Quantity Controls and Action Buttons */}
              <div className="tw:flex tw:flex-col tw:space-y-4">
                {product.stock >= 1 && (
                  <div className="tw:flex tw:items-center tw:space-x-4">
                    <button
                      onClick={decrementQuantity}
                      className="tw:px-4 tw:py-2 tw:bg-gray-200 tw:dark:bg-gray-700 tw:rounded-l-md"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      readOnly
                      className="tw:w-16 tw:text-center tw:border-0 tw:bg-transparent tw:text-gray-900 tw:dark:text-white"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="tw:px-4 tw:py-2 tw:bg-gray-200 tw:dark:bg-gray-700 tw:rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                )}

                <div className="tw:flex tw:space-x-4">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.stock < 1}
                    className="tw:flex-1 tw:px-6 tw:py-3 tw:bg-black tw:text-white tw:rounded-md tw:hover:bg-gray-800 tw:disabled:bg-gray-400"
                  >
                    Add to Cart
                  </button>
                  
                  {isAuthenticated && (
                    <button
                      onClick={addToWishlistHandler}
                      disabled={user?.wishlist?.find(i => i.productID === product._id)}
                      className="tw:flex-1 tw:px-6 tw:py-3 tw:border tw:border-black tw:text-black tw:dark:border-white tw:dark:text-white tw:rounded-md tw:hover:bg-gray-100 tw:dark:hover:bg-gray-700"
                    >
                      {user?.wishlist?.find(i => i.productID === product._id) ? 'Wishlisted' : 'Add to Wishlist'}
                      <i className="fa fa-heart tw:ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="tw:border-t tw:border-gray-200 tw:dark:border-gray-700 tw:mt-8 tw:p-8">
            <h2 className="tw:text-2xl tw:font-bold tw:text-center tw:text-gray-900 tw:dark:text-white tw:mb-8">
              Reviews
            </h2>

            {isAuthenticated ? (
              <div className="tw:max-w-2xl tw:mx-auto tw:mb-8 tw:p-6 tw:border tw:border-gray-200 tw:dark:border-gray-700 tw:rounded-lg">
                <div className="tw:flex tw:items-center tw:space-x-4 tw:mb-4">
                  <img
                    src={user.avatar.url}
                    alt="Profile"
                    className="tw:w-12 tw:h-12 tw:rounded-full tw:object-contain"
                  />
                  <span className="tw:text-gray-700 tw:dark:text-gray-300">{user.email}</span>
                </div>

                <div className="tw:mb-4">
                  <Rating
                    value={rating}
                    onChange={(e, v) => setRating(v)}
                    size="large"
                    sx={{ color: mode === "light" ? "black" : "white" }}
                  />
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Your review..."
                  className="tw:w-full tw:p-3 tw:border tw:border-gray-300 tw:dark:border-gray-600 tw:rounded-md tw:bg-white tw:dark:bg-gray-700 tw:text-gray-900 tw:dark:text-white"
                  rows="4"
                />

                <button
                  onClick={reviewSubmitHandler}
                  className="tw:mt-4 tw:px-6 tw:py-2 tw:bg-black tw:text-white tw:rounded-md tw:hover:bg-gray-800"
                >
                  Submit Review
                </button>
              </div>
            ) : (
              <div className="tw:text-center tw:mb-8">
                <h3 className="tw:text-xl tw:text-gray-700 tw:dark:text-gray-300">
                  Login to write a review
                </h3>
              </div>
            )}

            <div className="tw:flex tw:overflow-x-auto tw:gap-4 tw:pb-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <ReviewBox key={index} review={review} mode={mode} />
                ))
              ) : (
                <p className="tw:text-center tw:w-full tw:text-gray-700 tw:dark:text-gray-300">
                  No reviews yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductPage;
