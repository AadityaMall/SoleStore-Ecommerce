import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  newProductreducer,
  newReviewReducer,
  productDetailReducer,
  updateproductReducer,
  productsReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  updateOrdersReducer,
} from "./reducers/orderReducer";
const reducers = combineReducers({
  products: productsReducer,
  productDetails: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductreducer,
  updateproduct: updateproductReducer,
  updateOrder:updateOrdersReducer,
  allOrders : allOrdersReducer,
  allUsers:allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const wishlistItemsFromLocalStorage = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [];
const shippingInfoFromLocalStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : [];

let initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingInfo: shippingInfoFromLocalStorage,
  },

  wishlist: { wishlistItems: wishlistItemsFromLocalStorage },
};

const store = configureStore({
  reducer: reducers,
  middleware: middleware,
  preloadedState: initialState,
});

export default store;
