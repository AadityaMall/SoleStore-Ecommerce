const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetail,
  updatePassword,
  updateProfile,
  getSingleDetails,
  getAllUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  addToCart,
  deleteFromCart,
  emptyCart,
  addShippingDets,
  updateShippingDets,
  deleteFromShipping,
  addToWishList,
  deleteFromWishList,
} = require("../controllers/cartController");
const {
  subscriptionCheck,
  subscriptionToLetter,
  getAllSubscribedUsers,
  unsubscribeToLetter,
} = require("../controllers/newsLetterController");

const router = express.Router();
router.route("/subscriptionStatus").get(isAuthenticatedUser, subscriptionCheck);
router.route("/subscriptionStatus").post(isAuthenticatedUser, subscriptionToLetter);
router.route("/subscirbedUsers").get(isAuthenticatedUser, getAllSubscribedUsers);
router.route("/subscriptionStatus").delete(isAuthenticatedUser, unsubscribeToLetter);
router
  .route("/cartitems")
  .post(isAuthenticatedUser, addToCart)
  .delete(isAuthenticatedUser, emptyCart);

router.route("/wishlistItem").post(isAuthenticatedUser, addToWishList);
router
  .route("/wishlistItem/:id")
  .delete(isAuthenticatedUser, deleteFromWishList);

router.route("/cartitems/:id").delete(isAuthenticatedUser, deleteFromCart);

router
  .route("/shippingAddress")
  .post(isAuthenticatedUser, addShippingDets)
  .put(isAuthenticatedUser, updateShippingDets);

router
  .route("/shippingAddr/:id")
  .delete(isAuthenticatedUser, deleteFromShipping);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/me").get(isAuthenticatedUser, getUserDetail);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
