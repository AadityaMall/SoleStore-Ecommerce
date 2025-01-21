import React, { useEffect, useState } from "react";
import "../../Layout/css/NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminUser,
  clearErrors,
  getUserDetail,
} from "../../../actions/userActions";
import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import { VerifiedUser, Person, AlternateEmail } from "@mui/icons-material";
import SideBar from "./SideBar";
import { ADMIN_USER_UPDATE_SUCCESS } from "../../../constants/userConstant";
import Loader from "../../Layout/Loader";
const UpdateUserRole = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const updateUserRoleHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("role", role);
    myForm.set("email", email);
    myForm.set("name", name);

    dispatch(updateAdminUser(id, myForm));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (user && user._id !== id) {
      dispatch(getUserDetail(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: ADMIN_USER_UPDATE_SUCCESS });
    }
  }, [dispatch, error, navigate, isUpdated, id, user, updateError]);

  return (
    <>
      <div className="dashboard row">
        <div className="col-lg-2">
          <SideBar />
        </div>
        <div className="dashboard-mainContainer col-lg-10">
          <h1 className="headings-for-page text-center">Update User Role</h1>
          <div className="new-product-admin">
            {loading ? (
              <Loader />
            ) : (
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={updateUserRoleHandler}
              >
                <div className="form-group mb-4">
                  <Person />
                  <input
                    type="text"
                    className="form-control new-product-input"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <AlternateEmail />
                  <input
                    type="text"
                    className="form-control new-product-input"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <VerifiedUser />
                  <select
                    className="form-control new-product-input"
                    id="selectInput-Admin"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Choose Role</option>
                    {user && user.role === "admin" && (
                      <option value="user">User</option>
                    )}
                    {user && user.role === "user" && (
                      <option value="admin">Admin</option>
                    )}
                  </select>
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="btn"
                  id="submitButtonProduct"
                  disabled={
                     role === "" ? true : false
                  }
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserRole;
