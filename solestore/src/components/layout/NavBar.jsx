import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = (props) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation(); // Get current route
  //   const { isAuthenticated, user } = useSelector((state) => state.user);

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
        <Navbar.Brand href="/" className="tw:font-brand tw:text-[30px] tw:dark:text-white">
          Sole<span className="tw:text-[#899194]">Store</span>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded((prev) => !prev)}
          aria-controls="navbar-nav"
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="tw:md:!mx-[2rem] tw:!flex tw:!justify-evenly tw:md:!w-[40%]">
            <Nav.Link
              href="/"
              className={`tw:flex tw:justify-center tw:text-[18px] tw:dark:text-white ${
                isActive("/") ? "tw:font-bold" : "tw:hover:font-semibold"
              }`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/products"
              className={`tw:flex tw:justify-center tw:text-[18px] tw:dark:text-white ${
                isActive("/products")
                  ? "tw:font-bold"
                  : "tw:hover:font-semibold"
              }`}
            >
              Shop
            </Nav.Link>
            <Nav.Link
              href="/about"
              className={`tw:flex tw:justify-center tw:text-[18px] tw:dark:text-white ${
                isActive("/about") ? "tw:font-bold" : "tw:hover:font-semibold"
              }`}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className={`tw:flex tw:justify-center tw:text-[18px] tw:dark:text-white ${
                isActive("/contact") ? "tw:font-bold" : "tw:hover:font-semibold"
              }`}
            >
              Contact
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto tw:!flex tw:!justify-evenly tw:md:!w-[40%]">
            <Nav.Link
              onClick={props.toggleMode}
              className={`tw:flex tw:justify-center tw:text-[18px] tw:dark:text-white tw:align-center`}
            >
              <i className="tw:flex tw:items-center fa fa-adjust"></i>
            </Nav.Link>
            <Nav.Link
              href="/wishlist"
              className={`tw:flex tw:justify-center tw:text-[18px] tw:dark:text-white tw:align-center ${
                isActive("/wishlist")
                  ? "tw:font-bold"
                  : "tw:hover:font-semibold"
              }`}
            >
              <i className="tw:flex tw:items-center fa fa-heart"></i>
            </Nav.Link>
            <Nav.Link
              href="/cart"
              className={`tw:flex tw:justify-center tw:text-[18px] tw:dark:text-white tw:align-center ${
                isActive("/cart") ? "tw:font-bold" : "tw:hover:font-semibold"
              }`}
            >
              <i className="tw:flex tw:items-center fa fa-shopping-bag"></i>
            </Nav.Link>
            {false ? (
              <>
                <Nav.Link
                  href="/account"
                  className={`tw:flex tw:justify-center tw:text-[18px] tw:dark:text-white ${
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
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  href="/login"
                  className={`tw:flex tw:justify-center tw:text-[18px] tw:dark:text-white tw:border tw:rounded-sm tw:px-[20px] ${
                    isActive("/login")
                      ? "tw:font-bold"
                      : "tw:hover:font-semibold"
                  }`}
                >
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
