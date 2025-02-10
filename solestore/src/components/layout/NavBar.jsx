import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = (props) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar
      expanded={expanded}
      expand="md"
      bg={props.mode}
      fixed="top"
      data-theme={props.mode == "light" ? "" : "dark"}
      className="p-2 tw:shadow-[10px_0px_5px_rgba(0,0,0)]"
    >
      <Container fluid>
        <Navbar.Brand
          href="/"
          className="tw:font-brand tw:text-[30px] tw:dark:text-white"
        >
          Sole<span className="tw:text-[#899194]">Store</span>
        </Navbar.Brand>
        <Navbar.Toggle
          className="tw:dark:bg-white tw:dark:text-white"
          onClick={() => setExpanded((prev) => !prev)}
          aria-controls="navbar-nav"
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="tw:md:!mx-[2rem] tw:!flex tw:!justify-evenly tw:md:!w-[40%]">
            <Link
              to="/"
              className={`tw:flex py-2 tw:md:py-0 tw:justify-center tw:text-[18px] tw:dark:text-white text-reset tw:no-underline ${
                isActive("/") ? "tw:font-bold" : "tw:hover:font-semibold"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`tw:flex py-2 tw:md:py-0 tw:justify-center tw:text-[18px] tw:dark:text-white text-reset tw:no-underline ${
                isActive("/products")
                  ? "tw:font-bold"
                  : "tw:hover:font-semibold"
              }`}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={`tw:flex py-2 tw:md:py-0 tw:justify-center tw:text-[18px] tw:dark:text-white text-reset tw:no-underline ${
                isActive("/about") ? "tw:font-bold" : "tw:hover:font-semibold"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`tw:flex py-2 tw:md:py-0 tw:justify-center tw:text-[18px] tw:dark:text-white text-reset tw:no-underline ${
                isActive("/contact") ? "tw:font-bold" : "tw:hover:font-semibold"
              }`}
            >
              Contact
            </Link>
          </Nav>
          <Nav className="ms-auto tw:!flex tw:!justify-evenly tw:md:!w-[40%]">
            <Link
              onClick={props.toggleMode}
              className={`tw:flex py-2 tw:md:py-0 tw:no-underline text-reset tw:justify-center tw:text-[18px] tw:dark:text-white tw:align-center`}
            >
              <i className="tw:flex tw:items-center fa fa-adjust"></i>
            </Link>
            <Link
              to="/wishlist"
              className={`text-reset py-2 tw:md:py-0 tw:no-underline tw:flex tw:justify-center tw:text-[18px] tw:dark:text-white tw:align-center ${
                isActive("/wishlist")
                  ? "tw:font-bold"
                  : "tw:hover:font-semibold"
              }`}
            >
              <i className="tw:flex py-2 tw:md:py-0 tw:items-center fa fa-heart"></i>
            </Link>
            <Link
              to="/cart"
              className={`tw:flex py-2 tw:md:py-0 tw:no-underline text-reset tw:justify-center tw:text-[18px] tw:dark:text-white tw:align-center ${
                isActive("/cart") ? "tw:font-bold" : "tw:hover:font-semibold"
              }`}
            >
              <i className="tw:flex py-2 tw:md:py-0 tw:items-center fa fa-shopping-bag"></i>
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className={`tw:flex py-2 tw:md:py-0 tw:no-underline tw:justify-center tw:text-[18px] tw:dark:text-white text-reset tw:no-underline ${
                    isActive("/account")
                      ? "tw:font-bold"
                      : "tw:hover:font-semibold"
                  }`}
                  
                >
                  <img
                    src={user.avatar.url}
                    className="tw:w-[40px] tw:min-w-[40px] tw:aspect-square tw:object-contain tw:rounded-full"
                    alt="userProfile"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"

                  className={`tw:flex py-2 tw:md:py-0 tw:justify-center tw:text-[18px] tw:dark:text-white tw:border tw:rounded-sm tw:px-[20px] ${
                    isActive("/login")
                      ? "tw:font-bold"
                      : "tw:hover:font-semibold"
                  }`}
                >
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
