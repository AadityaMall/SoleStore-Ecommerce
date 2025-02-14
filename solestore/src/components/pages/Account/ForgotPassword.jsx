import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, forgotPassword } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import Loader from "../Main/Loader";

const ForgotPassword = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { error, message, loading, isAuthenticated } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message, isAuthenticated, navigate]);

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loader />;

  return (
    <div
      className={`tw:bg-[url(/images/loginpg_bg.png)] tw:bg-cover tw:bg-center tw:min-h-[70vh] tw:pb-12 tw:flex tw:justify-center tw:py-1 tw:px-4 tw:sm:px-6 tw:lg:px-8 ${
        mode === "dark" ? "tw:bg-gray-900" : "tw:bg-gray-50"
      }`}
    >
      <div className="tw:max-w-md tw:w-full tw:my-12 tw:space-y-8 tw:bg-[rgba(255,255,255)] tw:dark:bg-gray-800 tw:p-8 tw:rounded-lg tw:shadow-lg">
        <div className="tw:flex tw:justify-center">
          <img
            src={
              mode === "dark"
                ? "/images/darkmode_logo.png"
                : "/images/lightmode_logo.png"
            }
            alt="Logo"
            className="tw:w-[50%] tw:rounded-full"
          />
        </div>

        <div>
          <h2 className="tw:mt-6 tw:text-center tw:text-3xl tw:font-extrabold tw:text-gray-900 tw:dark:text-white">
            Forgot Password
          </h2>
          <form className="tw:mt-8 tw:space-y-6" onSubmit={forgotPasswordSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 