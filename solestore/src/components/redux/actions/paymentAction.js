import { PAYMENT_SUCCESS, PAYMENT_FAIL } from "../constants/paymentConstant";

import api from "./apiAction";

export const paymentVerification = (paymentData) => async (dispatch) => {
  try {
    const {
      data: { key },
    } = await api.get("/api/v1/payment/getkey");
    const {
      data: { order },
    } = await api.post("/api/v1/payment/process", {
      amount: paymentData.finalAmount,
    });
    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "SoleStore",
      description: "Test Transaction",
      image:
        "https://res.cloudinary.com/dqjeist4k/image/upload/v1712325115/soleStoreAvatars/darkmode_logo_jzymyp.png",
      order_id: order.id,
      handler: async function (response) {
        try {
          const  {data}  = await api.post("/api/v1/payment/verify", response);
          dispatch({ type: PAYMENT_SUCCESS, payload: data });
      }catch(error){
          dispatch({ type: PAYMENT_FAIL, payload: error });
      }},
      prefill: {
        name: paymentData.name,
        email: paymentData.email,
        contact: paymentData.phone,
      },
      notes: {
        address: paymentData.address,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razorpay = new window.Razorpay(options);

    return razorpay;
  } catch (error) {}
};
