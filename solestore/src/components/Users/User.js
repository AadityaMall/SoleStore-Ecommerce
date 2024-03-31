import React, { useEffect } from "react";
import "../Layout/css/User.css";
import { useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../Layout/Loader";  

const User = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = () => {
    navigate("/home");
    dispatch(logout());
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div id="contentHolder" className="container-fluid">
          <div className="userProfilePage-card row">
            <div id="userDetailsDisplaySection" className="col-md-6">
              <img src={user.avatar.url} alt="" />
              <div>
                <h3 id="UserNameExtract" className="headings-for-page">
                  Hello, {user.name}
                </h3>
              </div>
              <div id="personalDets" className="mt-4">
                <div id="details">
                  <div id="emailDetail" className="mt-2 mb-2">
                    <span className="headings-for-page">
                      <i className="fa fa-envelope"></i>
                      <span> {user.email}</span>
                    </span>
                  </div>
                  <div>
                    <Link to={`/me/update`}>
                      <span className="btn mt-4">Update Profile</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div id="userWebsiteDataDets" className="col-md-6">
              <div id="allOrders">
                <Link to={`/orders/me`} className="text-reset">
                  <span className="headings-for-page">
                    Your Orders <i className="fa fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
              <div id="wishlistButtonUserPage">
                <Link to={`/wishlist`} className="text-reset">
                  <span className="headings-for-page">
                    Wishlist <i className="fa fa-heart"></i>
                  </span>
                </Link>
              </div>
              <div>
                <span className="headings-for-page">
                  <Link to={`/cart`} className="text-reset">
                    Your Cart <i className="fa fa-shopping-bag"></i>
                  </Link>
                </span>
              </div>
              <div id="password">
                <Link to={`/password/update`} className="text-reset">
                  <span className="headings-for-page">
                    <i className="fa fa-lock"></i>
                    <span> Change Password</span>
                  </span>
                </Link>
              </div>
              {user.role === "admin" && (
                <div id="dashboard">
                  <Link to={`/admin/dashboard`} className="text-reset">
                    <span className="headings-for-page">
                      Dashboard <i className="fa fa-dashboard"></i>
                    </span>
                  </Link>
                </div>
              )}

              <button className="btn" onClick={logoutUser}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
      <></>
    </>
  );
};

export default User;
