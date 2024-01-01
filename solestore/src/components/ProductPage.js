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
import { Modal } from "react-responsive-modal";
import ReviewBox from "./Layout/ReviewBox";

const ProductPage = (props, { p }) => {
  //Modal Setup
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const alert = useAlert(); // Alert for error
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  //every time page loads, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  });

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
  }

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
                  <div className="detailSection-5">
                    <div className={`detailSection-5-1`}>
                      <select
                        name="size"
                        id="size"
                        className={`color-${
                          props.mode === "light" ? "dark" : "light"
                        }`}
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" disabled>
                          SIZE
                        </option>
                        <option value="1">3 UK</option>
                        <option value="2">4 UK</option>
                        <option value="3">5 UK</option>
                        <option value="4">6 UK</option>
                        <option value="5">7 UK</option>
                        <option value="6">8 UK</option>
                        <option value="7">9 UK</option>
                        <option value="8">10 UK</option>
                        <option value="9">11 UK</option>
                      </select>
                    </div>
                    <div className="detailSection-5-2">
                      <p onClick={onOpenModal}>
                        Size Guide <i className="fa fa-arrow-right"></i>
                      </p>
                    </div>
                  </div>
                  <div className="detailSection-6">
                    <div className={`detailSection-6-1`}>
                      <button
                        className={`mode-${
                          props.mode === "light" ? "dark" : "light"
                        }`}
                      >
                        -
                      </button>
                      <input type="number" defaultValue={1} />
                      <button
                        className={`mode-${
                          props.mode === "light" ? "dark" : "light"
                        }`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      id="addToCart"
                      className={`mode-${
                        props.mode === "light" ? "dark" : "light"
                      }`}
                    >
                      Add to Cart
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
                    {product.reviews && product.reviews.map((review,index) =>
                      <ReviewBox review = {review} key={index}/>
                    )}
                  </div>
                ):(
                  <p id="noReviewText">There are no reviews yet</p>
                )}
              </div>
            </div>
          </div>
          <Modal open={open} onClose={onCloseModal} center id="sizeModal">
            <h4>Size Chart</h4>
            <hr />
            <img src="../images/sizeChart.png" alt="" />
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductPage;
