import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../redux/actions/userActions";
import { toast } from "react-toastify";
import { Row, Col } from "react-bootstrap";

const Login = ({ mode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoginForm, setIsLoginForm] = useState(true);

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
  }, [dispatch, error, navigate, isAuthenticated, redirect]);

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      name,
      password,
      email,
      avatar,
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loader />;

  return (
    <div
      className={`tw:bg-[url(/images/loginpg_bg.png)] tw:bg-cover tw:bg-center tw:min-h-[70vh] tw:pb-12 tw:flex tw:justify-center tw:py-1 tw:px-4 tw:sm:px-6 tw:lg:px-8`}
      data-theme={mode}
    >
      <div className="tw:md:max-w-[60%] tw:min-h-full tw:mt-[50px] tw:w-full tw:space-y-8 tw:bg-[rgba(255,255,255,0.7)] tw:dark:bg-gray-800 tw:p-8 tw:rounded-lg tw:shadow-lg">
        <Row>
          <Col md={6} className="tw:flex tw:justify-center tw:items-center">
            <img
              src={
                mode === "dark"
                  ? "/images/darkmode_logo.png"
                  : "/images/lightmode_logo.png"
              }
              alt="Logo"
              className="tw:w-[60%] tw:h-auto tw:rounded-full"
            />
          </Col>
          <Col md={6}>
            {isLoginForm ? (
              // Login Form
              <div>
                <h2 className="tw:mt-6 tw:text-center tw:text-3xl tw:font-bold tw:text-gray-900">
                  LOGIN
                </h2>

                <form className="tw:mt-8 tw:space-y-6" onSubmit={loginSubmit}>
                  <div className="tw:rounded-md tw:shadow-sm tw:space-y-4">
                    <input
                      type="email"
                      className="tw:appearance-none tw:rounded-md tw:relative tw:block tw:w-full tw:px-3 tw:py-2 
                      tw:border tw:border-gray-300 tw:dark:border-gray-600 
                      tw:placeholder-gray-500 tw:dark:placeholder-gray-400
                      tw:text-gray-900 tw:dark:text-white 
                      tw:bg-white tw:dark:bg-gray-700 
                      focus:tw:outline-none focus:tw:ring-indigo-500 focus:tw:border-indigo-500
                      tw:transition-colors"
                      placeholder="Email ID"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      className="tw:appearance-none tw:rounded-md tw:relative tw:block tw:w-full tw:px-3 tw:py-2 
                      tw:border tw:border-gray-300 tw:dark:border-gray-600 
                      tw:placeholder-gray-500 tw:dark:placeholder-gray-400
                      tw:text-gray-900 tw:dark:text-white 
                      tw:bg-white tw:dark:bg-gray-700 
                      focus:tw:outline-none focus:tw:ring-indigo-500 focus:tw:border-indigo-500
                      tw:transition-colors"
                      placeholder="Password"
                      required
                      minLength="8"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>

                  <div className="tw:flex tw:items-center tw:justify-center">
                    <Link
                      to="/password/forgot"
                      className="tw:text-sm hover:tw:text-indigo-500 
                      tw:transition-colors text-reset tw:no-underline tw:hover:font-bold"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 
                    tw:border tw:border-transparent tw:rounded-md tw:shadow-sm 
                    tw:text-sm tw:font-medium tw:text-white 
                    tw:bg-black tw:hover:bg-transparent tw:hover:border-black tw:hover:text-black 
                    focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-offset-2 focus:tw:ring-indigo-500
                    tw:transition-colors"
                  >
                    Login
                  </button>
                </form>

                <p className="tw:mt-4 tw:text-center tw:text-sm tw:text-gray-600 tw:dark:text-gray-400">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsLoginForm(false)}
                    className="tw:text-sm hover:tw:text-indigo-500 
                      tw:transition-colors text-reset tw:no-underline tw:hover:font-bold"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            ) : (
              // Register Form
              <div>
                <h2 className="tw:mt-6 tw:text-center tw:text-3xl tw:font-bold tw:text-gray-900">
                  SIGN UP
                </h2>
                <form
                  className="tw:mt-8 tw:space-y-6"
                  onSubmit={registerSubmit}
                  encType="multipart/form-data"
                >
                  <div className="tw:rounded-md tw:space-y-4">
                    <input
                      type="text"
                      name="name"
                      className="tw:appearance-none tw:rounded-md tw:relative tw:block tw:w-full tw:px-3 tw:py-2 
                    tw:border tw:border-gray-300 tw:dark:border-gray-600 
                    tw:placeholder-gray-500 tw:dark:placeholder-gray-400
                    tw:text-gray-900 tw:dark:text-white 
                    tw:bg-white tw:dark:bg-gray-700 
                    focus:tw:outline-none focus:tw:ring-indigo-500 focus:tw:border-indigo-500
                    tw:transition-colors"
                      placeholder="Full Name"
                      value={name}
                      onChange={registerDataChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      className="tw:appearance-none tw:rounded-md tw:relative tw:block tw:w-full tw:px-3 tw:py-2 
                    tw:border tw:border-gray-300 tw:dark:border-gray-600 
                    tw:placeholder-gray-500 tw:dark:placeholder-gray-400
                    tw:text-gray-900 tw:dark:text-white 
                    tw:bg-white tw:dark:bg-gray-700 
                    focus:tw:outline-none focus:tw:ring-indigo-500 focus:tw:border-indigo-500
                    tw:transition-colors"
                      placeholder="Email ID"
                      value={email}
                      onChange={registerDataChange}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      className="tw:appearance-none tw:rounded-md tw:relative tw:block tw:w-full tw:px-3 tw:py-2 
                    tw:border tw:border-gray-300 tw:dark:border-gray-600 
                    tw:placeholder-gray-500 tw:dark:placeholder-gray-400
                    tw:text-gray-900 tw:dark:text-white 
                    tw:bg-white tw:dark:bg-gray-700 
                    focus:tw:outline-none focus:tw:ring-indigo-500 focus:tw:border-indigo-500
                    tw:transition-colors"
                      placeholder="Password"
                      value={password}
                      onChange={registerDataChange}
                      minLength="8"
                      required
                    />
                    <div className="tw:flex tw:flex-col tw:items-center tw:space-y-2">
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="tw:w-20 tw:h-20 tw:rounded-full tw:object-cover 
                      tw:border-2 tw:border-gray-200 tw:dark:border-gray-600"
                      />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                        className="tw:block tw:w-full tw:text-sm 
                      tw:text-gray-500 tw:dark:text-gray-400
                      tw:file:mr-4 tw:file:py-2 tw:file:px-4 
                      tw:file:rounded-full tw:file:border-0 
                      tw:file:text-sm tw:file:font-semibold 
                      tw:file:bg-gray-50 tw:file:text-gray-700 
                      tw:hover:file:bg-indigo-100
                      tw:transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 
                    tw:border tw:border-transparent tw:rounded-md tw:shadow-sm 
                    tw:text-sm tw:font-medium tw:text-white 
                    tw:bg-black tw:hover:bg-transparent tw:hover:border-black tw:hover:text-black 
                    focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-offset-2 focus:tw:ring-indigo-500
                    tw:transition-colors"
                    disabled={loading}
                  >
                    Register
                  </button>
                </form>

                <p className="tw:mt-4 tw:text-center tw:text-sm tw:text-gray-600 tw:dark:text-gray-400">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLoginForm(true)}
                    className="tw:text-sm hover:tw:text-indigo-500 
                      tw:transition-colors text-reset tw:no-underline tw:hover:font-bold"
                  >
                    Login
                  </button>
                </p>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
