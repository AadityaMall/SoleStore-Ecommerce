import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, updatePassword, loadUser } from "../../redux/actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../redux/constants/userConstant";
import Loader from "../../layout/Loader";

const UpdatePassword = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, navigate, isUpdated]);

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  if (loading) return <Loader />;

  return (
    <div className={`tw:min-h-[70vh] tw:py-12 ${mode === "dark" ? "tw:bg-gray-900" : "tw:bg-gray-50"}`}>
      <div className="tw:max-w-md tw:mx-auto tw:px-4 tw:sm:px-6 tw:lg:px-8">
        <div className="tw:bg-white tw:dark:bg-gray-800 tw:shadow tw:rounded-lg tw:p-8">
          <div className="tw:flex tw:flex-col tw:items-center tw:space-y-6">
            <h2 className="tw:text-2xl tw:font-bold tw:text-gray-900 tw:dark:text-white">
              Change Password
            </h2>

            <form onSubmit={updateSubmit} className="tw:w-full tw:space-y-6">
              <div>
                <label className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:dark:text-gray-300">
                  Current Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="tw:mt-1 tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm focus:tw:border-indigo-500 focus:tw:ring-indigo-500 tw:dark:bg-gray-700 tw:dark:border-gray-600 tw:dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:dark:text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="tw:mt-1 tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm focus:tw:border-indigo-500 focus:tw:ring-indigo-500 tw:dark:bg-gray-700 tw:dark:border-gray-600 tw:dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:dark:text-gray-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="tw:mt-1 tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm focus:tw:border-indigo-500 focus:tw:ring-indigo-500 tw:dark:bg-gray-700 tw:dark:border-gray-600 tw:dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 tw:border tw:border-transparent tw:rounded-md tw:shadow-sm tw:text-sm tw:font-medium tw:text-white tw:bg-black hover:tw:bg-gray-800 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-offset-2 focus:tw:ring-indigo-500"
                disabled={loading}
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;