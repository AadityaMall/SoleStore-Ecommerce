import React, { useState } from "react";
import "./css/LoginSignup.css";
import $ from "jquery";
import { Link } from "react-router-dom";
// import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userActions";

const LoginSignup = () => {
  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/defaultProfile.jpg"
  );

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    console.log("Signuo submit");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const loginSubmit = () => {
    console.log("LOGIN");
  };

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
                  <form action="#" onSubmit={loginSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="username"
                        placeholder="Email ID"
                        required
                        autoComplete="on"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
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
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>

                    <div className="d-flex mb-3 align-items-center forgot-link">
                      <span className="ml-auto">
                        <Link to={`/password/forgot`} className="forgot-pass">
                          Forgot Password?
                        </Link>
                      </span>
                    </div>

                    <input
                      type="submit"
                      value="Login"
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
                  <form
                    action="#"
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                  >
                    <div className="form-group mb-4">
                      <input
                        autoComplete="on"
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={name}
                        onChange={registerDataChange}
                        required
                      />
                      <span id="nameError"></span>
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={registerDataChange}
                        placeholder="Email ID"
                        required
                      />
                      <span id="emailError"></span>
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={registerDataChange}
                        placeholder="Password"
                        minLength="8"
                        required
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group mb-4 image-input">
                      
                      <img src={avatarPreview} alt="Avatar Preview" className="mb-2"/>

                      <input
                        type="file"
                        className="form-control"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </div>
                    <input
                      type="submit"
                      value="register"
                      className="btn btn-block signup-button"
                      id="submit-btn"
                      // disabled={loading?true:false}
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
