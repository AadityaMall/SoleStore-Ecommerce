import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  newProductReducer,
  newReviewReducer,
  productDetailReducer,
  updateProductReducer,
  productsReducer,
  productReviewsReducer,
  reviewReducer,
} from "./components/redux/reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./components/redux/reducers/userReducer";
import { cartReducer } from "./components/redux/reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,  
  updateOrdersReducer,
} from "./components/redux/reducers/orderReducer";
import { newsLetterReducer } from "./components/redux/reducers/newsLetterReducer";
import { paymentReducer } from "./components/redux/reducers/paymentReducer";
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
  newProduct: newProductReducer,
  updateproduct: updateProductReducer,
  updateOrder: updateOrdersReducer,
  allOrders: allOrdersReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  newsLetter: newsLetterReducer,
  payment: paymentReducer,
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
