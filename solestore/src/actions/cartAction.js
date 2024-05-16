import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_SHIPPING_INFO,
  UPDATE_SHIPPING_INFO,
  DELETE_SHIPPING_INFO,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";
import axios from "axios";
import {
  USERLOAD_REQUEST,
  USERLOAD_FAIL,
  USERLOAD_SUCCESS,
} from "../constants/userConstant";

//addToCart
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_TO_CART,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const cartData = {
      productId: id,
      quantity: quantity,
    };
    await axios.post("/api/v1/cartitems", cartData, config);
    try {
      dispatch({ type: USERLOAD_REQUEST });
      const { data } = await axios.get(`/api/v1/me`);
      dispatch({ type: USERLOAD_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USERLOAD_FAIL, payload: "No user Logged in!" });
    }
  } catch (err) {
    console.log(err);
  }
};
export const removeFromCart = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
  });
  try {
    await axios.delete(`/api/v1/cartitems/${id}`);
    try {
      dispatch({ type: USERLOAD_REQUEST });
      const { data } = await axios.get(`/api/v1/me`);
      dispatch({ type: USERLOAD_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USERLOAD_FAIL, payload: "No user Logged in!" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addShippingInfo = (dets) => async (dispatch) => {
  try{
    dispatch({type: ADD_SHIPPING_INFO,});
    const config  = {headers:{"Content-Type":"application/json"}}
    await axios.post("/api/v1/shippingAddress",dets,config)
    try{
      dispatch({type:USERLOAD_REQUEST});
      const {data} = await axios.get(`/api/v1/me`);
      dispatch({type:USERLOAD_SUCCESS, payload:data.user})
    }catch(err){
      dispatch({type:USERLOAD_FAIL, payload:"No user logged in"});
    }
  }catch(err){
    console.log(err)
  }
};
export const updateShippingInfo = (dets) => async (dispatch) => {
  try{
    dispatch({type: UPDATE_SHIPPING_INFO,});
    const config  = {headers:{"Content-Type":"application/json"}}
    await axios.put("/api/v1/shippingAddress",dets,config)
    try{
      dispatch({type:USERLOAD_REQUEST});
      const {data} = await axios.get(`/api/v1/me`);
      dispatch({type:USERLOAD_SUCCESS, payload:data.user})
    }catch(err){
      dispatch({type:USERLOAD_FAIL, payload:"No user logged in"});
    }
  }catch(err){
    console.log(err)
  }
};
export const deleteShippingInfo = (id) => async (dispatch) => {
  try{
    dispatch({type: DELETE_SHIPPING_INFO,});
    await axios.delete(`/api/v1/shippingAddr/${id}`)
    try{
      dispatch({type:USERLOAD_REQUEST});
      const {data} = await axios.get(`/api/v1/me`);
      dispatch({type:USERLOAD_SUCCESS, payload:data.user})
    }catch(err){
      dispatch({type:USERLOAD_FAIL, payload:"No user logged in"});
    }
  }catch(err){
    console.log(err)
  }
};
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload:data,
  });
  localStorage.setItem("shippingInfo",JSON.stringify(data))
};