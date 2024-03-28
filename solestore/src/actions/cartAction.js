import { ADD_TO_CART,REMOVE_FROM_CART } from "../constants/cartConstant";
import axios from "axios";

//addToCart
export const addToCart = (id, quantity) => async (dispatch,getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  console.log()
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      category:data.product.category,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
};
export const removeFromCart = (id) => async (dispatch,getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload:id,
  });
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
};

