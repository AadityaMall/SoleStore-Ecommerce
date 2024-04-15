import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, forgotPassword } from "../../actions/userActions";
import Loader from "../Layout/Loader";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
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
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message, isAuthenticated,navigate]);

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
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
                    <h3>Forgot Password</h3>
                  </div>
                  <center>
                    <hr width="75%" />
                  </center>
                  <form
                    action="#"
                    method="post"
                    onSubmit={forgotPasswordSubmit}
                  >
                    <div className="form-group mb-4">
                      <i className="fa fa-envelope"></i>
                      <input
                        type="email"
                        className="form-control updateUser-input"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email ID"
                      />
                    </div>
                    <input
                      type="submit"
                      value="Send Mail"
                      className="btn btn-block signup-button"
                      id="submit-btn"
                      disabled={loading ? true : false}
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

export default ForgotPassword;
