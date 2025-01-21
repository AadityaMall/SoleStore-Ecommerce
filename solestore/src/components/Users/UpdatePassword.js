import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  loadUser,
  clearErrors,
  updatePassword,
} from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import Loader from "../Layout/Loader";

const UpdatePassword = () => {
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
  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [conirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error,  navigate, user, isUpdated]);

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", conirmPassword);
    dispatch(updatePassword(myForm));
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
                  <img src={user.avatar.url} alt="" />
                  <div>
                    <h3>Change Password</h3>
                  </div>
                  <center>
                    <hr width="75%" />
                  </center>
                  <form
                    action="#"
                    method="post"
                    onSubmit={updateSubmit}
                  >
                    <div className="form-group mb-4">
                      <i className="fa fa-lock"></i>
                      <input
                        autoComplete="on"
                        type="password"
                        className="form-control updateUser-input"
                        placeholder="Old Password"
                        name="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <i className="fa fa-lock"></i>
                      <input
                        autoComplete="on"
                        type="password"
                        className="form-control updateUser-input" 
                        placeholder="New Password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                      value="Change Password"
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

export default UpdatePassword;
