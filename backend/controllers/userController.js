const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("../middleware/asyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/JWTtoken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Register a user -->
exports.registerUser = asyncError(async (req, res, next) => {
  var mycloud = {
    public_id: "defaultProfileImage",
    secure_url:
      "https://res.cloudinary.com/dqjeist4k/image/upload/v1715110893/soleStoreAvatars/defaultProfile_oggerf.jpg",
  };
  if(req.body.avatar){
    mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "soleStoreAvatars",
      width: 150,
      crop: "scale",
    });
  }
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//Login User -->
exports.loginUser = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given both the parameters
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  isPasswordMatched.then(function (result) {
    if (!result) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    sendToken(user, 200, res);
  });
});

//Logout User -->

exports.logout = asyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    hhtpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Forgot Password

exports.forgotPassword = asyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  //Get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your Password reset token is:- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `SoleStore Account Password Reset`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = asyncError(async (req, res, next) => {
  //Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords dont match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 201, res);
});

// Get user Details

exports.getUserDetail = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Password
exports.updatePassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = user.comparePassword(req.body.oldPassword);

  isPasswordMatched.then(async function (result) {
    if (!result) {
      return next(new ErrorHandler("old password is not correct", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password Doesnt Match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  });
});

// Update user Profile
exports.updateProfile = asyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "undefined") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "soleStoreAvatars",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.getAllUser = asyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//Admin single user Details
exports.getSingleDetails = asyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Updating user Role -- Admin
exports.updateUserRole = asyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Deleting USer profile -- Admin
exports.deleteUser = asyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`)
    );
  }
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
});
