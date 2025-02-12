import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Footer = (props) => {

  const location = useLocation();
  if(location.pathname.startsWith("/admin")){
    return null;
  }

  return (
    <div data-theme={props.mode}>
      <footer className="tw:bg-gray-100 tw:dark:bg-[#212529] tw:py-2 tw:px-3 tw:dark:text-white">
        <section className="tw:flex tw:justify-center tw:md:justify-between p-4 border-bottom">
          <div className="d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div className="">
            <a
              href="https://facebook.com"
              className="me-4 text-reset tw:text-2xl"
            >
              <i className="fa fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              className="me-4 text-reset tw:text-2xl"
            >
              <i className="fa fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              className="me-4 text-reset tw:text-2xl"
            >
              <i className="fa fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              className="me-4 text-reset tw:text-2xl"
            >
              <i className="fa fa-linkedin"></i>
            </a>
            <a
              href="https://github.com"
              className="me-4 text-reset tw:text-2xl"
            >
              <i className="fa fa-github"></i>
            </a>
          </div>
        </section>
        <Container>
          <Row className="mt-4">
            <Col
              md={3}
              className="tw:md:block tw:flex tw:flex-col"
            >
              <div className="tw:flex tw:flex-col tw:justify-items-start tw:items-center">
                <span
                  href="/"
                  className="tw:font-brand tw:text-[30px] tw:dark:text-white"
                >
                  Sole<span className="tw:text-[#899194]">Store</span>
                </span>
                <img
                  src={
                    props.mode === "light"
                      ? "/images/lightmode_logo.png"
                      : "/images/darkmode_logo.png"
                  }
                  className="tw:max-w-[150px] tw:w-full tw:h-auto mt-3 tw:rounded-full"
                  alt="logo"
                />
              </div>
            </Col>
            <Col
              md={3}
              className="tw:md:block tw:flex tw:flex-col"
            >
              <div className="tw:flex tw:flex-col tw:justify-items-start tw:md:items-center tw:items-center">
                <h6 className="tw:text-xl pt-3">Products</h6>
                <div className="tw:flex tw:flex-col tw:justify-items-start">
                  <Link
                    className="tw:py-3 text-reset tw:no-underline tw:text-[16px]"
                    to={`/products`}
                  >
                    Sneakers
                  </Link>
                  <Link
                    className="tw:py-3 text-reset tw:no-underline tw:text-[16px]"
                    to={`/products`}
                  >
                    Formals
                  </Link>
                  <Link
                    className="tw:py-3 text-reset tw:no-underline tw:text-[16px]"
                    to={`/products`}
                  >
                    Sports
                  </Link>
                </div>
              </div>
            </Col>
            <Col
              md={3}
              className="tw:md:block tw:flex tw:flex-col"
            >
              <div className="tw:flex tw:flex-col tw:justify-items-start tw:md:items-center tw:items-center">
                <h6 className="tw:text-xl pt-3">Useful Links</h6>
                <div className="tw:flex tw:flex-col tw:justify-items-start">
                  <Link
                    className="tw:py-3 text-reset tw:no-underline tw:text-[16px]"
                    to={`/`}
                  >
                    Home
                  </Link>
                  <Link
                    className="tw:py-3 text-reset tw:no-underline tw:text-[16px]"
                    to={`/products`}
                  >
                    Shop
                  </Link>
                  <Link
                    className="tw:py-3 text-reset tw:no-underline tw:text-[16px]"
                    to={`/cart`}
                  >
                    Cart
                  </Link>
                  <Link
                    className="tw:py-3 text-reset tw:no-underline tw:text-[16px]"
                    to={`/wishlist`}
                  >
                    Wishlist
                  </Link>
                  <Link
                    className="tw:py-3 text-reset tw:no-underline tw:text-[16px]"
                    to={`/account`}
                  >
                    User
                  </Link>
                  <Link
                    className="tw:py-3 text-reset tw:no-underline tw:text-[16px]"
                    to={`/contact`}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </Col>
            <Col
              md={3}
              className="tw:md:block tw:flex tw:flex-col"
            >
              <div className="tw:flex tw:flex-col tw:justify-items-start tw:md:items-center tw:items-center">
                <h6 className="tw:text-xl pt-3">Contact</h6>
                <div className="tw:flex tw:flex-col tw:justify-items-center tw:items-center mt-3">
                  <p>
                    <i className="fa fa-envelope me-3"></i>
                    aadityarmall@gmail.com
                  </p>
                  <p>
                    <i className="fa fa-phone me-3 my-4"></i>+91 9326430750
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="text-center tw:w-full tw:dark:bg-[#343a40] p-4 copyright">
          © 2024 Copyright: Aaditya Rajesh Mall
        </div>
      </footer>
    </div>
  );
};
export default Footer;
