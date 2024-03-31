import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Layout/css/CheckoutPage.css";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import {clearErrors,createOrder} from "../../actions/orderAction"
import {useAlert} from "react-alert"
export const CheckoutPage = ({ mode }) => {
    const alert =  useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const {error} = useSelector(state=>state.newOrder);
  const orderInfo = sessionStorage.getItem("orderInfo")
    ? JSON.parse(sessionStorage.getItem("orderInfo"))
    : [];
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  function currentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return dd + " / " + mm + " / " + yyyy;
  }
  const order = {
    shippingInfo,
    orderItems:cartItems,
    itemsPrice:orderInfo.subtotal,
    taxPrice:orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    discount:orderInfo.discVal,
    totalPrice:orderInfo.finalAmount
  }
  const orderHandler = () => {
    dispatch(createOrder(order))
    navigate("/orderSuccessfull")
  }
  useEffect(() => {
    if (
      !localStorage.getItem("cartItems") ||
      !localStorage.getItem("shippingInfo") ||
      !sessionStorage.getItem("orderInfo")
    ) {
      navigate("/cart");
    }
    if(error){
        alert.error(error);
        dispatch(clearErrors())
    }
  },[alert,dispatch,error,navigate]);
  return (
    <>
      <div className="container-fluid">
        <div className="steps">
          <CheckoutSteps mode={mode} activeStep={2} />
        </div>
        <div className="reciept-card m-4">
          <div className="row">
            <div className="col-md-6 main-receipt-outer">
              <div className="mainReciept">
                <div id="recieptHead">
                  <img src="../images/darkmode_logo.png" alt="" />
                  <h3 className="head-receipt">YOUR ORDER RECEIPT</h3>
                </div>
                <div id="receiptBodyUpper" className="">
                  <span>To :</span>
                  <span id="recieptBodyUserName" className="headings-for-page">
                    {user.name}
                  </span>
                  <span id="userMobileNumber">{shippingInfo.phoneNo}</span>
                  <span id="userEmailId">{user.email}</span>
                  <span id="userAddress">{address}</span>
                </div>
                <div id="receiptBodyMid" className="">
                  <div>
                    <span className="headings-for-page">Date :</span>
                    <span id="todaysDate">{currentDate()}</span>
                  </div>
                  {/* <div>
                    <span className="headings-for-page">Order Number: </span>
                    <span id="orderNumber"></span>
                  </div> */}
                </div>
                <div id="receiptBodyShoes" className="mt-4">
                  <div className="row">
                    <span className="col-4">Item</span>
                    <span className="col-3">Price</span>
                    <span className="col-2 text-center">Qty</span>
                    <span className="col-3">Total</span>
                  </div>
                  <hr />
                  {cartItems &&
                    cartItems.map((item, index) => (
                      <div className="row ReceiptItem" key={index}>
                        <div
                          className="col-4 headings-for-page"
                          id="prodNameCategory"
                        >
                          <span id="prodCategory">{item.category}</span>
                          <span id="prodName">{item.name}</span>
                        </div>
                        <div className="col-3 mt-3">
                          ₹<span id="prodPrice">{item.price}</span>
                        </div>
                        <div className="col-2 mt-3 text-center">
                          <span id="prodQty">{item.quantity}</span>
                        </div>
                        <div className="col-3 mt-3">
                          ₹
                          <span id="prodFinalPrice">
                            {item.quantity * item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  <hr />
                  <div className="row summed-up-price">
                    <span>
                      Total: ₹
                      <span className="headings-for-page" id="totalPrice">
                        {orderInfo.subtotal}
                      </span>
                    </span>
                    <span>
                      Shipping : + ₹
                      <span id="shippingCharges">
                        {orderInfo.shippingCharges}
                      </span>
                    </span>
                    <span>
                      Tax : + ₹<span>{orderInfo.tax}</span>
                    </span>
                    <span>
                      Discount : - ₹
                      <span id="shippingCharges">
                        {(orderInfo.discVal / 100) *
                          (orderInfo.subtotal +
                            orderInfo.shippingCharges +
                            orderInfo.tax)}
                      </span>
                    </span>
                    <hr />
                    <span>
                      Total: ₹
                      <span className="headings-for-page" id="FinaltotalPrice">
                        {orderInfo.finalAmount}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-center payment-outer">
              <div className="payment">
                <h3 className="headings-for-page">Payment</h3>
                <img
                  src="../images/paymentScreensot.jpeg"
                  alt=""
                  width="300px"
                />
                <span>Name : Aaditya R Mall</span>
                <span>UPI Handle - 9326430750@paytm</span>
                <span>
                  <a href="https://p.paytm.me/xCTH/ms29f8qe">Pay me on Paytm</a>
                </span>
              </div>
            </div>
          </div>
          <div className="row m-4">
            <button className="btn" id="orderComplete" onClick={orderHandler}> Order Complete</button>
          </div>
        </div>
      </div>
    </>
  );
};
