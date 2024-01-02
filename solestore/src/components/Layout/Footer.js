import React from "react";
import "./css/Footer.css";
import { Link } from "react-router-dom";
const Footer = (props) => {
  const darkLogo = "https://i.ibb.co/qYRd6qN/darkmode-logo.png";
  const lightLogo = "https://i.ibb.co/0MyCLvg/lightmode-logo.png"
  return (
    <>

      <div className="container-fluid newsLetter">
        <div className="row NewsText">
          <div className="col-md-12">
            <h1>Subscribe to our News Letter</h1>
            <p>Get notified about our latest products, exciting deals and offers!</p>
          </div>
        </div>
        <div className="row input-subscribe">
          <div className="col-md-8 col1" style={{textAlign:"right"}}>
            <input type="text" name="NewsLetter" id="NewsLetter" placeholder="Enter valid Email"/>
          </div>
          <div className="col-md-4 col2" style={{textAlign:"left"}}>
            <button className="button-subscirbe">SUBMIT</button>
          </div>
        </div>
      </div>

      <footer className={`text-center text-lg-start bg-${props.mode} text-${props.mode==='light'?'dark':'light'}`}>
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
                  src = {props.mode==='light'?lightLogo:darkLogo}
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
          
            © 2023 Copyright: C002 Aaditya Mall, C006 Manya Gor, C017 Shivam
            Kulkarni
          
        </div>
      </footer>
    </>
  );
};

export default Footer;
