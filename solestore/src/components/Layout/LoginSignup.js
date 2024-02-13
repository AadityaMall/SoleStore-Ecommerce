import React from "react";
import "./css/LoginSignup.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Loader from "./Loader";
const LoginSignup = () => {

  $(document).ready(function () {
    $(".signup-link").click(function () {
      $(".login-frame").hide();
      $(".signup-frame").show();
    });

    $(".login-link").click(function () {
      $(".signup-frame").hide();
      $(".login-frame").show();
    });
  });
  
  return (
    <>
      <div id="contentHolder" className="container-fluid">
        <div className="content login-frame">
          <div className="row justify-content-center inner-contents">
            <div className="col-md align-logo adjust-padding">
              <img
                src="https://i.ibb.co/0MyCLvg/lightmode-logo.png"
                alt="Llogo"
                className="login-logo"
              />
            </div>
            <div className="col-md contents adjust-padding">
              <div className="row justify-content-center inner-contents">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>LOGIN</h3>
                  </div>
                  <form action="#">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="username"
                        placeholder="Email ID"
                        required
                        autoComplete="on"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="logpassword"
                        placeholder="Password"
                        required
                        minLength="8"
                        autoComplete="on"
                      />
                    </div>

                    <div className="d-flex mb-3 align-items-center forgot-link">
                      <div>
                        <input type="checkbox" />
                        <label className="mb-0">
                          <span className="caption">Remember me</span>
                        </label>
                      </div>
                      <span className="ml-auto">
                        <Link className="forgot-pass">Forgot Password?</Link>
                      </span>
                    </div>

                    <input
                      type="submit"
                      value="Log In"
                      className="btn btn-block login-button"
                    />

                    <div className="d-flex mt-4 justify-content-center">
                      <span>
                        Don't have an account?
                        <span className="signup-link">Sign Up</span>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content signup-frame">
          <div className="row justify-content-center inner-contents">
            <div className="col-md align-logo adjust-padding">
              <img
                src="https://i.ibb.co/0MyCLvg/lightmode-logo.png"
                alt="Llogo "
                className="login-logo"
              />
            </div>
            <div className="col-md contents adjust-padding">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>SIGN UP</h3>
                  </div>
                  <form action="#" method="post">
                    <div className="form-group mb-4">
                      <input
                        autoComplete="on"
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Full Name"
                        required
                      />
                      <span id="nameError"></span>
                    </div>
                    <div className="form-group  mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="number"
                        placeholder="Number"
                        required
                        minLength="10"
                        autoComplete="on"
                      />
                      <span id="numberError"></span>
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email ID"
                        required
                      />
                      <span id="emailError"></span>
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        minLength="8"
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        minLength="8"
                        required
                        autoComplete="off"
                      />
                      <span id="confirmPasswordError"></span>
                    </div>
                    <div className="d-flex mb-3">
                      <span>
                        <input
                          type="checkbox"
                          name="terms-and-conditions"
                          id="termsAndConditions"
                        />
                        <label htmlFor="termsAndConditions">
                          <Link>
                            <p id="terms-label">
                              ACCEPT TERMS AND CONDITIONS{" "}
                              <i className="fa fa-external-link"></i>
                            </p>
                          </Link>
                        </label>
                      </span>
                    </div>
                    <input
                      type="submit"
                      value="Signup"
                      className="btn btn-block signup-button"
                      id="submit-btn"
                      disabled
                    />
                    <span id="submitError"></span>
                    <div className="d-flex mt-4 justify-content-center">
                      <span>
                        Already have an account?{" "}
                        <span className="login-link">Login</span>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
