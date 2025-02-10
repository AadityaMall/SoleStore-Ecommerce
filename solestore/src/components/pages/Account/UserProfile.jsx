import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import Loader from "../../layout/Loader";

const UserProfile = ({ mode }) => {
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  if (loading) return <Loader />;

  return (
    <div className={`tw:min-h-[70vh] tw:py-12 ${mode === "dark" ? "tw:bg-gray-900" : "tw:bg-gray-50"}`}>
      <div className="tw:max-w-7xl tw:mx-auto tw:px-4 tw:sm:px-6 tw:lg:px-8">
        <div className="tw:bg-white tw:dark:bg-gray-800 tw:shadow tw:rounded-lg tw:overflow-hidden">
          <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-8 tw:p-8">
            {/* Left Column - User Details */}
            <div className="tw:flex tw:flex-col tw:items-center tw:space-y-4">
              <img
                src={user.avatar.url}
                alt={user.name}
                className="tw:w-48 tw:h-48 tw:rounded-full tw:object-cover tw:border-4 tw:border-gray-200 tw:dark:border-gray-700"
              />
              <h2 className="tw:text-2xl tw:font-bold tw:text-gray-900 tw:dark:text-white">
                Hello, {user.name}
              </h2>
              <div className="tw:flex tw:items-center tw:space-x-2 tw:text-gray-600 tw:dark:text-gray-300">
                <i className="fa fa-envelope"></i>
                <span>{user.email}</span>
              </div>
              <Link
                to="/me/update"
                className="tw:px-4 tw:py-2 tw:bg-black tw:text-white tw:rounded-md tw:hover:bg-gray-800 tw:transition-colors"
              >
                Update Profile
              </Link>
            </div>

            {/* Right Column - Actions */}
            <div className="tw:flex tw:flex-col tw:space-y-4">
              <Link
                to="/orders/me"
                className="tw:p-4 tw:bg-white tw:dark:bg-gray-700 tw:rounded-lg tw:shadow tw:flex tw:justify-between tw:items-center tw:hover:shadow-md tw:transition-shadow"
              >
                <span className="tw:text-gray-900 tw:dark:text-white">Your Orders</span>
                <i className="fa fa-arrow-right tw:text-gray-600 tw:dark:text-gray-300"></i>
              </Link>

              <Link
                to="/wishlist"
                className="tw:p-4 tw:bg-white tw:dark:bg-gray-700 tw:rounded-lg tw:shadow tw:flex tw:justify-between tw:items-center tw:hover:shadow-md tw:transition-shadow"
              >
                <span className="tw:text-gray-900 tw:dark:text-white">Wishlist</span>
                <i className="fa fa-heart tw:text-gray-600 tw:dark:text-gray-300"></i>
              </Link>

              <Link
                to="/cart"
                className="tw:p-4 tw:bg-white tw:dark:bg-gray-700 tw:rounded-lg tw:shadow tw:flex tw:justify-between tw:items-center tw:hover:shadow-md tw:transition-shadow"
              >
                <span className="tw:text-gray-900 tw:dark:text-white">Your Cart</span>
                <i className="fa fa-shopping-bag tw:text-gray-600 tw:dark:text-gray-300"></i>
              </Link>

              <Link
                to="/password/update"
                className="tw:p-4 tw:bg-white tw:dark:bg-gray-700 tw:rounded-lg tw:shadow tw:flex tw:justify-between tw:items-center tw:hover:shadow-md tw:transition-shadow"
              >
                <span className="tw:text-gray-900 tw:dark:text-white">Change Password</span>
                <i className="fa fa-lock tw:text-gray-600 tw:dark:text-gray-300"></i>
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="tw:p-4 tw:bg-white tw:dark:bg-gray-700 tw:rounded-lg tw:shadow tw:flex tw:justify-between tw:items-center tw:hover:shadow-md tw:transition-shadow"
                >
                  <span className="tw:text-gray-900 tw:dark:text-white">Dashboard</span>
                  <i className="fa fa-dashboard tw:text-gray-600 tw:dark:text-gray-300"></i>
                </Link>
              )}

              <button
                onClick={logoutUser}
                className="tw:w-full tw:p-4 tw:bg-red-600 tw:text-white tw:rounded-lg tw:shadow tw:hover:bg-red-700 tw:transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;