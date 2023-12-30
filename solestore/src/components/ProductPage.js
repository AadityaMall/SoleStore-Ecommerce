import "./Layout/css/ProductPage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Loader from "./Layout/Loader";
import { useAlert } from "react-alert";

const ProductPage = (props,{}) => {
  const alert = useAlert() // Alert for error 
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if(error){
      return alert.error(error)
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id,error,alert]);

  //every time page loads, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const options = {
    edit: false,
    activeColor: props.modeProd === "light" ? "black" : "white",
    value: product.ratings,
    isHalf: true,
    size: 35,
  };

  return (
    <>
    {loading ? (
        <Loader/>
      ) : (
      <>
        <div className={`text-${props.mode === "light" ? "dark" : "light"}`}>
          <div className="page-title">
            <span>{`Products > ${product.name} >`}</span>
          </div>
          <div className="container p-4">
            <div className="row">
              <div className={`col-md-6 mt-2 prod-carouselShadow-${props.mode === "light" ? "dark" : "light"}`}>
                <Carousel autoPlay={true} infiniteLoop={true}>
                  {product.images &&
                    product.images.map((item, i) => (
                      <div>
                        <img key={item.url} src={item.url} alt={`Slide ${i}`} />
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
                <span>{`₹${product.price}`}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
};

export default ProductPage;
