import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useNavigate , useParams } from "react-router-dom";
import {
  clearErrors,
  resetPassword,
} from "../../actions/userActions";
import Loader from "../Layout/Loader";

const ResetPassword = () => {
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
  const navigate = useNavigate();
  const { success, loading, error } = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();

  const [password, setPassword] = useState();
  const [conirmPassword, setConfirmPassword] = useState();
  const { token } = useParams();
  useEffect(() => {
    
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Password Reset");
      navigate("/login");
    }
  }, [dispatch, error,  navigate, success]);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", conirmPassword);
    dispatch(resetPassword(token,myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div id="contentHolder" className="container-fluid">
            <div className="userProfilePage-card row">
              <div id="userUpdateDivision">
                <div id="userDetailsDisplaySection">
                  <img src={``} alt="" />
                  <div>
                    <h3>New Password</h3>
                  </div>
                  <center>
                    <hr width="75%" />
                  </center>
                  <form action="#" method="post" onSubmit={resetPasswordSubmit}>
                    <div className="form-group mb-4">
                      <i className="fa fa-lock"></i>
                      <input
                        autoComplete="on"
                        type="password"
                        className="form-control updateUser-input"
                        placeholder="New Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <i className="fa fa-lock"></i>
                      <input
                        autoComplete="on"
                        type="password"
                        className="form-control updateUser-input"
                        placeholder="Confirm New Password"
                        name="conirmPassword"
                        value={conirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Reset Password"
                      className="btn btn-block signup-button"
                      id="submit-btn"
                      // disabled={loading ? true : false}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ResetPassword;
