import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../constants/wishlistConstant";
import {
  USERLOAD_REQUEST,
  USERLOAD_FAIL,
  USERLOAD_SUCCESS,
} from "../constants/userConstant";
import axios from "axios";

//addToCart
export const addToWishList = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_TO_WISHLIST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const wishlistData = {
      productId: id,
    };
    await axios.post("/api/v1/wishlistItem", wishlistData, config);
    try {
      dispatch({ type: USERLOAD_REQUEST });
      const { data } = await axios.get(`/api/v1/me`);
      dispatch({ type: USERLOAD_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USERLOAD_FAIL, payload: "No user Logged in!" });
    }
  } catch (err) {
    console.log(err)
  }
};
export const removeFromWishlist = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST,
  });
  try {
    await axios.delete(`/api/v1/wishlistItem/${id}`);
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
