import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productDetailReducer, productReducer } from "./reducers/productReducer";

const reducers = combineReducers({
  products:productReducer,
  productDetails:productDetailReducer

});

let initialState = {};

const middleware = [thunk];

const store = configureStore(
  {reducer:reducers},
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;