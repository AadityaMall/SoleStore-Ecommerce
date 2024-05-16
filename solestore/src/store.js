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
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  updateOrdersReducer,
} from "./reducers/orderReducer";
import { newsLetterReducer } from "./reducers/newsLetterReducer";
const reducers = combineReducers({
  products: productsReducer,
  productDetails: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
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
  newsLetter:newsLetterReducer,
});
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

const shippingInfoFromLocalStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : [];

let initialState = {
  cart: {
    shippingInfo: shippingInfoFromLocalStorage,
  },
};

const store = configureStore({
  reducer: reducers,
  middleware: middleware,
  preloadedState: initialState,
});

export default store;