import {
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  } from "../constants/paymentConstant";
  
  export const paymentReducer = (state = {}, action) => {
    switch (action.type) {
      case PAYMENT_SUCCESS:
        return {
          ...state,
          paymentStatus: action.payload.success,
          paymentId: action.payload.paymentId,
        };
      case PAYMENT_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  