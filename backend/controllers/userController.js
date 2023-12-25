const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("../middleware/asyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/JWTtoken");
const sendEmail =  require("../utils/sendEmail.js")
//Register a user -->
exports.registerUser = asyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "Samle id",
      url: "pfpurl",
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

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
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
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it`;

  try {
    
     await sendEmail({
      email:user.email,
      subject:`SoleStore Account Password Reset`,
      message,
     });
     
     res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} successfully`
     })

  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire =  undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message,500))
  }
});
