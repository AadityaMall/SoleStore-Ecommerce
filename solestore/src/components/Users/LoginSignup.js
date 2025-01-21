import React, { useState, useEffect } from "react";
import "../Layout/css/LoginSignup.css";
import $ from "jquery";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userActions";
import { toast } from "react-toastify";

const LoginSignup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
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
  const redirect = location.search ? location.search.split("=")[1] : "account";
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [dispatch, error,  navigate, isAuthenticated, redirect]);

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      name: name,
      password: password,
      email: email,
      avatar: avatar,
    };
    dispatch(register(myForm));
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

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
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
  const lightLogo =
    "https://res.cloudinary.com/dqjeist4k/image/upload/v1712325114/soleStoreAvatars/lightmode_logo_z1n9lz.png";

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };

    handleScrollToTop(); // Scroll to top when component mounts

    return () => {
      // Cleanup (not really necessary for scrollTo, but good practice)
      window.removeEventListener("scroll", handleScrollToTop);
    };
  }, []); // Empty dependency array to run once on component mount

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div id="contentHolder" className="container-fluid">
            <div className="content login-frame">
              <div className="row justify-content-center inner-contents">
                <div className="col-md align-logo adjust-padding">
                  <img src={lightLogo} alt="Llogo" className="login-logo" />
                </div>
                <div className="col-md contents adjust-padding">
                  <div className="row justify-content-center inner-contents">
                    <div className="col-md-8">
                      <div className="mb-4">
                        <h3>LOGIN</h3>
                      </div>
                      <form onSubmit={loginSubmit}>
                        <div className="form-group mb-4 justify-content-center">
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
                        <div className="form-group mb-4 justify-content-center">
                          <input
                            type="password"
                            className="form-control"
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
                            <Link
                              to={`/password/forgot`}
                              className="forgot-pass"
                            >
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
                  <img src={lightLogo} alt="Llogo " className="login-logo" />
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
                        <div className="form-group mb-4 justify-content-center">
                          <input
                            autoComplete="on"
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            name="name"
                            value={name}
                            onChange={registerDataChange}
                            required
                          />
                        </div>
                        <div className="form-group mb-4 justify-content-center">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={registerDataChange}
                            placeholder="Email ID"
                            required
                          />
                        </div>
                        <div className="form-group mb-4 justify-content-center">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={registerDataChange}
                            placeholder="Password"
                            minLength="8"
                            required
                            autoComplete="off"
                          />
                        </div>
                        <div className="form-group mb-4 justify-content-center">
                          <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="mb-2"
                          />
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
                          value="Register"
                          className="btn"
                          id="submit-btn"
                          disabled={loading ? true : false}
                        />
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
      )}
    </>
  );
};

export default LoginSignup;
