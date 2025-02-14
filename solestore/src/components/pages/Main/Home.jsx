import React, { useEffect } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import { toast } from "react-toastify";
import ProductBox from "../../layout/ProductBox";
import Loader from "./Loader";
const Home = (props) => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      <Carousel interval={2000} id="homeCarousel">
        {/* First Slide (With Link) */}
        <Carousel.Item>
          <Link to="/products">
            <img
              className="d-block w-100"
              src="/images/SoleStore_carousel.png"
              alt="Home Carousel 0"
            />
          </Link>
        </Carousel.Item>

        {/* Second Slide */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/formalshoes_carousel.png"
            alt="Home Carousel 1"
          />
        </Carousel.Item>

        {/* Third Slide */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/sneakers_carousel.png"
            alt="Home Carousel 2"
          />
        </Carousel.Item>

        {/* Fourth Slide */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/sportsShoes_carousel.png"
            alt="Home Carousel 3"
          />
        </Carousel.Item>
      </Carousel>

      <Container
        data-theme={props.mode == "light" ? "" : "dark"}
        className="mt-5 tw:dark:text-white"
      >
        <div>
          <Row>
            <h1 className="tw:font-brand tw:text-center">Shop By Category</h1>
            <Row className="mt-5">
              <Col md={4} className="tw:flex tw:justify-center tw:items-center">
                <Link
                  className=""
                  to={`/products`}
                  state={{ homeFilter: "Sneakers" }}
                >
                  <img
                    src="../images/sneakers_circle.png"
                    alt=""
                    className={`tw:max-w-[150px] tw:w-full tw:h-auto tw:my-[20px] tw:hover:shadow-[0px_5px_10px_rgba(0,0,0)] tw:dark:hover:shadow-[0px_5px_10px_rgba(255,255,255)] tw:rounded-full`}
                  />
                </Link>
              </Col>
              <Col md={4} className="tw:flex tw:justify-center tw:items-center">
                <Link
                  className=""
                  to={`/products`}
                  state={{ homeFilter: "Formals" }}
                >
                  <img
                    src="../images/formal_circle.png"
                    alt=""
                    className={`tw:max-w-[150px] tw:w-full tw:h-auto tw:my-[20px] tw:hover:shadow-[0px_5px_10px_rgba(0,0,0)] tw:dark:hover:shadow-[0px_5px_10px_rgba(255,255,255)] tw:rounded-full `}
                  />
                </Link>
              </Col>
              <Col md={4} className="tw:flex tw:justify-center tw:items-center">
                <Link
                  className=""
                  to={`/products`}
                  state={{ homeFilter: "Sports" }}
                >
                  <img
                    src="../images/sports_circle.png"
                    alt=""
                    className={`tw:max-w-[150px] tw:w-full tw:h-auto tw:my-[20px] tw:hover:shadow-[0px_5px_10px_rgba(0,0,0)] tw:dark:hover:shadow-[0px_5px_10px_rgba(255,255,255)] tw:rounded-full`}
                  />
                </Link>
              </Col>
            </Row>
          </Row>
          <Row className="tw:mt-[70px]">
            <h1 className="tw:font-brand tw:text-center">
              Our Featured Products
            </h1>
            {loading ? (
              <Loader />
            ) : (
              <Row className="mt-5">
              {products &&
                products.slice(0, 3).map((product, index) => (
                  <>
                    <Col md={4} className="tw:flex tw:justify-center tw:items-center" key={index}>
                      <ProductBox
                        product={product}
                        modeProd={props.mode}
                      />
                    </Col>
                  </>
                ))}
              </Row>
            )}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Home;
