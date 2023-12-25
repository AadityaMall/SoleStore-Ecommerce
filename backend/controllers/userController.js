const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("../middleware/asyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/JWTtoken");

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
    
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        hhtpOnly:true
    })
    
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
});
