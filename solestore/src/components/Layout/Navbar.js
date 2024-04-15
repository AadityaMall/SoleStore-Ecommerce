import React,  {useRef} from "react";
import "./css/Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = (props) => {

  const navButton = useRef(null);
  const linksContainerRef = useRef(null);

  function collapseNav() {
    navButton.current.classList.add("collapsed");
    linksContainerRef.current.classList.remove("show");
  }

  const { isAuthenticated, user } = useSelector((state) => state.user);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <>
      <nav
        className={`navbar navbar-main navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid">
          <Link to={`/`}>
            <span className="navbar-brand brand" onClick={topFunction}>
              {props.mainTitle}
              <span className="brand-item-color">{props.brandTitle}</span>
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            ref={navButton}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={linksContainerRef}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-items">
              <li className="nav-item-main">
                <NavLink className="nav-link" aria-current="page" to="" onClick={collapseNav}>
                  HOME
                </NavLink>
              </li>
              <li className="nav-item-main" >
                <NavLink className="nav-link" to="/products" onClick={collapseNav}>
                  SHOP
                </NavLink>
              </li>
              <li className="nav-item-main">
                <NavLink className="nav-link" to="/about" onClick={collapseNav}>
                  ABOUT US
                </NavLink>
              </li>
              <li className="nav-item-main" onClick={collapseNav}>
                <NavLink className="nav-link" to="/contact">
                  CONTACT US
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-align-item nav-icons">
              <li className="nav-item">
                <i
                  className="fa fa-adjust nav-link"
                  aria-hidden="true"
                  onClick={props.toggleMode}
                ></i>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  aria-current="page"
                  to="/wishlist"
                  onClick={collapseNav}
                >
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart" onClick={collapseNav}>
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                </NavLink>
              </li>
              {isAuthenticated ? (
                <li className="nav-item user-element">
                  <NavLink className="nav-link" to="/account" onClick={collapseNav}>
                    <img src={user.avatar.url} alt="userProfile" />
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item login-element">
                  <NavLink className="nav-link" to="/login" onClick={collapseNav}>
                    LOGIN
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
