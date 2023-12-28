import React from "react";
import { useEffect } from "react";
import './components/css/Home.css'
import Product from "./components/Product.js"
import { Link } from "react-router-dom";

const Home = (props) => {
  //every time page loads, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  const product = {
    name:"Adidas Air Force 1",
    price:"₹10000",
    _id:"Prod Id",
    images:[{url:"https://i.ibb.co/VqHSSvH/image1.jpg"}]
  };

  return (
    <>
      {/* Carusel Code Start */}
      <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <Link className="carousel-item active" data-bs-interval="2000">
            <img
              src="./images/SoleStore_carousel.png"
              className="d-block w-100"
              alt="Home Carousel 0"
            />
          </Link>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="./images/formalshoes_carousel.png"
              className="d-block w-100"
              alt="Home Carousel 1"
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="./images/sneakers_carousel.png"
              className="d-block w-100"
              alt="Home Carousel 2"
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="./images/sportsShoes_carousel.png"
              className="d-block w-100"
              alt="Home Carousel 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Caraousel Code End */}

      {/* Remaining Content */}
      <div className={`text-${props.mode === "light" ? "dark" : "light"}`}>
        <div className="row m-5">
          <div className="col-lg text-center mt-5 mb-5">
            <h1 id="shopByCategoryHead">Shop By Category</h1>
          </div>
          <div className="row text-center mb-5 mt-3">
            <Link className="col-md-4 mb-5" >
              <img
                src="../images/sneakers_circle.png"
                alt=""
                className={`images category-shop-button-${props.mode === "light" ? "dark" : "light"}`}
              />
            </Link>
            <Link className="col-md-4 mb-5" >
              <img
                src="../images/formal_circle.png"
                alt=""
                className={`images category-shop-button-${props.mode === "light" ? "dark" : "light"}`}
              />
            </Link>
            <Link className="col-md-4 mb-5" >
              <img
                src="../images/sports_circle.png"
                alt=""
                className={`images category-shop-button-${props.mode === "light" ? "dark" : "light"}`}
              />
            </Link>
          </div>

          <div>
            <div className="text-center mt-5 mb-5">
              <h1 id="bestSellingProductsHead">Our Featured Products!</h1>
            </div>
          </div>
          <div className="best-sellers" id="bestSeller">
            <Product product = {product} modeProd = {props.mode}/>
            <Product product = {product} modeProd = {props.mode}/>
            <Product product = {product} modeProd = {props.mode}/>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
