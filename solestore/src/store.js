import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const reducers = combineReducers({

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