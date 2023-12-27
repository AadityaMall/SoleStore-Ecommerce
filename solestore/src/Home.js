import React from "react";

const Home = () => {
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
          <div className="carousel-item active" data-bs-interval="2000">
            <img
              src="./images/SoleStore_carousel.png"
              className="d-block w-100"
              alt="Home Carousel 0"
            />
          </div>
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
    </>
  );
};

export default Home;
