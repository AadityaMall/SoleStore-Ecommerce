const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("../middleware/asyncError");
const NewsLetter = require("../models/newsLetterModel");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");
exports.subscriptionToLetter = asyncError(async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return next(new ErrorHandler("User Not Logged In", 400));
    }

    // Check if the user is already subscribed
    const isSubscribed = await NewsLetter.findOne({ userID: userId });
    const user = await User.findById(userId);

    const message = `Hello ${user.name} :- \n\n Thank You for Subscribing to our NewsLetter \n\n if you wish to unsubscribe, you can find the same on our website footer.`;

    try {
      await sendEmail({
        email: user.email,
        subject: `SoleStore News Letter`,
        message,
      });
    } catch (err) {
      console.log("Mail error - " + err);
    }
    if (!isSubscribed) {
      // Create a new subscription for the user
      const newSubscription = new NewsLetter({
        userID: userId,
      });
      await newSubscription.save();
    }

    res.status(200).json({
      success: true,
      message: "User subscribed successfully",
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("An error occurred while subscribing", 500));
  }
});
exports.subscriptionCheck = asyncError(async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return next(new ErrorHandler("User Not Logged In", 400));
    }

    // Check if the user is already subscribed
    const isSubscribed = await NewsLetter.findOne({ userID: userId });

    if (isSubscribed) {
      res.status(200).json({
        success: true,
        message: "User is already subscribed",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "User is not subscribed",
      });
    }
  } catch (err) {
    console.log(err);
    return next(
      new ErrorHandler("An error occurred while checking subscription", 500)
    );
  }
});
exports.getAllSubscribedUsers = asyncError(async (req, res, next) => {
  try {
    // Check if the user is already subscribed
    const usersSubscribed = await NewsLetter.find();
    console.log(usersSubscribed);
    res.status(200).json({
      success: true,
      usersSubscribed,
    });
  } catch (err) {
    console.log(err);
    return next(
      new ErrorHandler("An error occurred while checking subscription", 500)
    );
  }
});
exports.unsubscribeToLetter = asyncError(async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return next(new ErrorHandler("User Not Logged In", 400));
    }

    // Check if the user is already subscribed
    const isSubscribed = await NewsLetter.deleteOne({ userID: userId });

    res.status(200).json({
      success: true,
      message: "User unsubscribed successfully",
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("An error occurred while subscribing", 500));
  }
});
