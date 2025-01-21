import React, { useEffect } from "react";
import "./css/Footer.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkForSubscription,
  ApplyForSubscription,
  unsubscription
} from "../../actions/newsLetterActions";
import { toast } from "react-toastify";
const Footer = (props) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const { subscriptionStatus } = useSelector((state) => state.newsLetter);
  const dispatch = useDispatch();
  const darkLogo =
    "https://res.cloudinary.com/dqjeist4k/image/upload/v1712325115/soleStoreAvatars/darkmode_logo_jzymyp.png";
  const lightLogo =
    "https://res.cloudinary.com/dqjeist4k/image/upload/v1712325114/soleStoreAvatars/lightmode_logo_z1n9lz.png";
  const applyForSubscriptionHandler = () => {
    dispatch(ApplyForSubscription());
    toast.success("Thank you for Subscribing to News Letter");
  };
  const UnsubscribeHandler = () => {
    dispatch(unsubscription());
    toast.success("Unsubscribed to News Letter");
  };
  useEffect(() => {
    dispatch(checkForSubscription());
  }, [dispatch]);

  return (
    <>
      {!loading && isAuthenticated && subscriptionStatus !== undefined && (
        <div className="container-fluid newsLetter">
          <div className="row NewsText">
            <div className="col-md-12">
              <h1>Subscribe to our News Letter</h1>
              <p>
                Get notified about our latest products, exciting deals and
                offers!
              </p>
            </div>
          </div>
          <div className="row input-subscribe">
            {subscriptionStatus ? (
              <div className="d-flex flex-column justify-content-center  align-items-center">
                <span
                  className="subscribed-text"
                >
                  Subscribed to News Letter
                </span>
                <button className="button-subscirbe" onClick={UnsubscribeHandler}>Unsubcribe</button>
              </div>
            ) : (
              <div>
                <button
                  className="button-subscirbe"
                  onClick={applyForSubscriptionHandler}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer
        className={`text-center text-lg-start bg-${props.mode} text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div className="footer-social-icons">
            <a href="https://facebook.com" className="me-4 text-reset">
              <i className="fa fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="me-4 text-reset">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="me-4 text-reset">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" className="me-4 text-reset">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="https://github.com" className="me-4 text-reset">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </section>

        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3  mb-4 footer-logo">
                <h3 className="mb-4 brand">
                  Sole<span className="brand-item-color">Store</span>
                </h3>
                <img
                  src={props.mode === "light" ? lightLogo : darkLogo}
                  className="images"
                  alt="logo"
                />
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Casuals
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Sneakers
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Formals
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <Link to="/home" className="text-reset">
                    Home
                  </Link>
                </p>
                <p>
                  <Link to="/products" className="text-reset">
                    Shop
                  </Link>
                </p>
                <p>
                  <Link to="/cart" className="text-reset">
                    Cart
                  </Link>
                </p>
                <p>
                  <Link to="/wishlist" className="text-reset">
                    Wishlist
                  </Link>
                </p>
                <p>
                  <Link to="/user" className="text-reset">
                    User
                  </Link>
                </p>
                <p>
                  <Link to="/about" className="text-reset">
                    About
                  </Link>
                </p>
                <p>
                  <Link to="/contact" className="text-reset">
                    Contact
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fa fa-home me-3"></i> Mukesh Patel School of
                  Technology,Management and Engineering
                </p>
                <i className="fa fa-envelope me-3"></i>
                aadityarmall@gmail.com
                <p>
                  <i className="fa fa-phone me-3 my-4"></i>+91 9326430750
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4 copyright">
          © 2024 Copyright: Aaditya Rajesh Mall
        </div>
      </footer>
    </>
  );
};

export default Footer;
