import React from "react";
import "./css/Navbar.css";
import { NavLink } from "react-router-dom";
const Navbar = (props) => {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          <span className="navbar-brand brand" onClick={topFunction} >
            {props.mainTitle}<span className="brand-item-color">{props.brandTitle}</span>
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-items">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="">
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shop">
                  SHOP
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  ABOUT US
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  CONTACT US
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-align-item nav-icons">
              <li className="nav-item">
                <i className="fa fa-adjust nav-link" aria-hidden="true" onClick={props.toggleMode}></i>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/wishlist">
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/user">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
