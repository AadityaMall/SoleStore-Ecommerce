import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { productDetailReducer, productReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import {cartReducer} from "./reducers/cartReducer"
import { wishlistReducer } from "./reducers/wishlistReducer";
const reducers = combineReducers({
  products:productReducer,
  productDetails:productDetailReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
  wishlist:wishlistReducer
});
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[];
const wishlistItemsFromLocalStorage = localStorage.getItem("wishlistItems")?JSON.parse(localStorage.getItem("wishlistItems")):[];

let initialState = {
 cart:{cartItems:cartItemsFromLocalStorage},
 wishlist:{wishlistItems:wishlistItemsFromLocalStorage}
};

const store = configureStore({
  reducer:reducers,
  middleware: middleware,
  preloadedState : initialState,
});

export default store;