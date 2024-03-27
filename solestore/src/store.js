import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productDetailReducer, productReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";

const reducers = combineReducers({
  products:productReducer,
  productDetails:productDetailReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
});

let initialState = {};

const middleware = [thunk];

const store = configureStore(
  {reducer:reducers},
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;