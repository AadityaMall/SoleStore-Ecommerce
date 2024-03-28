import { ADD_TO_WISHLIST,REMOVE_FROM_WISHLIST } from "../constants/wishlistConstant";
import axios from "axios";

//addToCart
export const addToWishlist = (id) => async (dispatch,getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  console.log()
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      product: data.product._id,
      name: data.product.name,
      category:data.product.category,
      price: data.product.price,
      image: data.product.images[0].url,
    },
  });
  localStorage.setItem("wishlistItems",JSON.stringify(getState().wishlist.wishlistItems))
};
export const removeFromWishlist = (id) => async (dispatch,getState) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST,
    payload:id,
  });
  localStorage.setItem("wishlistItems",JSON.stringify(getState().wishlist.wishlistItems))
};

