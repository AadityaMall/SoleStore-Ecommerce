import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { newReviewReducer, productDetailReducer, productReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import {cartReducer} from "./reducers/cartReducer"
import { wishlistReducer } from "./reducers/wishlistReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";
const reducers = combineReducers({
  products:productReducer,
  productDetails:productDetailReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
  wishlist:wishlistReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  newReview:newReviewReducer
});
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[];
const wishlistItemsFromLocalStorage = localStorage.getItem("wishlistItems")?JSON.parse(localStorage.getItem("wishlistItems")):[];
const shippingInfoFromLocalStorage = localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):[];

let initialState = {
 cart:{cartItems:cartItemsFromLocalStorage , shippingInfo:shippingInfoFromLocalStorage},
 
 wishlist:{wishlistItems:wishlistItemsFromLocalStorage}
};

const store = configureStore({
  reducer:reducers,
  middleware: middleware,
  preloadedState : initialState,
});

export default store;