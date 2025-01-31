import React, { useState } from "react";
import { useEffect } from "react";
import "../Layout/css/User.css";
import "../Layout/css/UpdateUser.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import {
  loadUser,
  clearErrors,
  updateProfile,
} from "../../actions/userActions";
import { USERUPDATE_RESET } from "../../constants/userConstant";
import Loader from "../Layout/Loader"

const Update = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: USERUPDATE_RESET,
      });
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm =  {
      "name": name,
      "email": email,
      "avatar": avatar
    }
    dispatch(updateProfile(myForm));
  };

  const updateDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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
                    <h3>Update Profile</h3>
                  </div>
                  <center>
                    <hr width="75%" />
                  </center>
                  <form
                    action="#"
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={updateSubmit}
                  >
                    <div className="form-group mb-4">
                      <i className="fa fa-user"></i>
                      <input
                        autoComplete="on"
                        type="text"
                        className="form-control updateUser-input"
                        placeholder="Full Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
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
                    <div className="form-group mb-4 image-input">
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="mb-2"
                      />
                      <input
                        type="file"
                        className="form-control updateUser-input"
                        name="avatar"
                        accept="image/*"
                        onChange={updateDataChange}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Update Profile"
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

export default Update;
