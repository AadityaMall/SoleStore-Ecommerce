import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminUser,
  clearErrors,
  getUserDetail,
} from "../../redux/actions/userActions";
import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import { VerifiedUser, Person, AlternateEmail } from "@mui/icons-material";
import { ADMIN_USER_UPDATE_SUCCESS } from "../../redux/constants/userConstant";
import Loader from "../Main/Loader";
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
      <div className="row">
       
          <h1 className="tw:font-brand tw:font-bold text-center">Update User Role</h1>
          <div className="tw:w-full tw:flex tw:justify-center">
            {loading ? (
              <Loader />
            ) : (
              <form
                className="tw:my-12"
                encType="multipart/form-data"
                onSubmit={updateUserRoleHandler}
              >
                <div className="form-group mb-4 tw:relative">
                  <Person className="tw:absolute tw:left-[5px] tw:top-[8px]"/>
                  <input
                    type="text"
                    className="form-control tw:py-2 tw:pl-[40px]"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4 tw:relative">
                  <AlternateEmail className="tw:absolute tw:left-[5px] tw:top-[8px]"/>
                  <input
                    type="text"
                    className="form-control tw:py-2 tw:pl-[40px]"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4 tw:relative">
                  <VerifiedUser className="tw:absolute tw:left-[5px] tw:top-[8px]"/>
                  <select
                    className="form-control tw:py-2 tw:pl-[40px]"
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
                  className="tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 
                tw:border tw:border-transparent tw:rounded-md tw:shadow-sm tw:text-sm 
                tw:font-medium tw:text-white tw:bg-black tw:hover:bg-gray-800"
                  disabled={
                     role === "" ? true : false
                  }
                />
              </form>
            )}
          </div>
        </div>
    </>
  );
};

export default UpdateUserRole;