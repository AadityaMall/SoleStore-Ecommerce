import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, updateProfile, loadUser } from "../../redux/actions/userActions";
import { USERUPDATE_RESET } from "../../redux/constants/userConstants";
import Loader from "../../layout/Loader";


const UpdateProfile = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/defaultProfile.jpg");

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
      dispatch({ type: USERUPDATE_RESET });
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      name,
      email,
      avatar,
    };
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

  if (loading) return <Loader />;

  return (
    <div className={`tw:min-h-[70vh] tw:py-12 ${mode === "dark" ? "tw:bg-gray-900" : "tw:bg-gray-50"}`}>
      <div className="tw:max-w-md tw:mx-auto tw:px-4 tw:sm:px-6 tw:lg:px-8">
        <div className="tw:bg-white tw:dark:bg-gray-800 tw:shadow tw:rounded-lg tw:p-8">
          <div className="tw:flex tw:flex-col tw:items-center tw:space-y-6">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="tw:w-32 tw:h-32 tw:rounded-full tw:object-cover tw:border-4 tw:border-gray-200 tw:dark:border-gray-700"
            />
            
            <h2 className="tw:text-2xl tw:font-bold tw:text-gray-900 tw:dark:text-white">
              Update Profile
            </h2>

            <form onSubmit={updateSubmit} className="tw:w-full tw:space-y-6">
              <div>
                <label className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="tw:mt-1 tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm focus:tw:border-indigo-500 focus:tw:ring-indigo-500 tw:dark:bg-gray-700 tw:dark:border-gray-600 tw:dark:text-white"
                />
              </div>

              <div>
                <label className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="tw:mt-1 tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm focus:tw:border-indigo-500 focus:tw:ring-indigo-500 tw:dark:bg-gray-700 tw:dark:border-gray-600 tw:dark:text-white"
                />
              </div>

              <div>
                <label className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:dark:text-gray-300">
                  Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={updateDataChange}
                  className="tw:mt-1 tw:block tw:w-full tw:text-sm tw:text-gray-500 tw:file:mr-4 tw:file:py-2 tw:file:px-4 tw:file:rounded-full tw:file:border-0 tw:file:text-sm tw:file:font-semibold tw:file:bg-violet-50 tw:file:text-violet-700 hover:tw:file:bg-violet-100"
                />
              </div>

              <button
                type="submit"
                className="tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 tw:border tw:border-transparent tw:rounded-md tw:shadow-sm tw:text-sm tw:font-medium tw:text-white tw:bg-black hover:tw:bg-gray-800 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-offset-2 focus:tw:ring-indigo-500"
                disabled={loading}
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;