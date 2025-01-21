
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate, Link } from "react-router-dom";
import "../Layout/css/orderConfirm.css";
import { toast } from "react-toastify";
const OrderConfirm = ({ mode }) => {
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const cartItems =  user.cart;
  //Discount Cupons that are available
  const discountCoupons = [
    { code: "asm50", val: 50 },
    { code: "ASM50", val: 50 },
    { code: "asm20", val: 20 },
    { code: "ASM20", val: 20 },
  ];
  //check the validity of code
  const [discountCouponValid, setDiscountCouponValid] = useState(false);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const obj = sessionStorage.getItem("orderInfo")
    ? JSON.parse(sessionStorage.getItem("orderInfo"))
    : [];

  const shippingCharges = subtotal > 15000 ? 0 : subtotal * 0.05;
  const tax = subtotal * 0.18;
  const temptotalBeforeDiscount = subtotal + tax + shippingCharges;
  const totalBeforeDiscount = obj.discVal
    ? subtotal +
      tax +
      shippingCharges -
      (obj.discVal / 100) * (subtotal + tax + shippingCharges)
    : subtotal + tax + shippingCharges;
  const [finalAmount, setfinalAmount] = useState(totalBeforeDiscount);
  //to show discount on frontend
  const [discountVisible, setdiscountVisible] = useState(
    sessionStorage.getItem("orderInfo")
      ? sessionStorage.getItem("orderInfo").includes("discVal")
      : false
  );
  //calculate the value for discount
  const [discVal, setdiscVal] = useState(obj.discVal ? obj.discVal : 0);
  const [disCode, setdiscCode] = useState(obj.disCode ? obj.disCode : "");
  const discountInputHandler = (val) => {
    setdiscCode(val);

    setDiscountCouponValid(
      discountCoupons.find(({ code }) => code === val) ? true : false
    );
    if (discountCoupons.find(({ code }) => code === val)) {
      setdiscVal(discountCoupons.find(({ code }) => code === val).val);
    } else {
      setdiscVal(0);
      setdiscountVisible(false);
      setfinalAmount(temptotalBeforeDiscount);
    }
  };
  const discountHandler = () => {
    if (discountCouponValid === true) {
      setdiscountVisible(true);
      const discountValue = (discVal / 100) * temptotalBeforeDiscount;
      setfinalAmount(temptotalBeforeDiscount - discountValue);
      toast.success("Discount Applied");
    } else {
      toast.error("Invalid Discount Coupon");
      setfinalAmount(temptotalBeforeDiscount);
    }
  };
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      finalAmount,
      discVal,
      disCode,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  useEffect(() => {
    if (shippingInfo === null || cartItems.length === 0) {
      navigate("/cart");
    }
  });

  return (
    <>
      <div className="steps">
        <CheckoutSteps mode={mode} activeStep={1} />
      </div>
      <div
        className={`confirm-order-card text-${
          mode === "light" ? "dark" : "light"
        } shadow-${mode === "light" ? "dark" : "light"}`}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="p-5 pb-0">
              <h3 className="headings-for-page">Shipping Info</h3>
              <div className="d-flex flex-column flex-wrap  mt-2 shipping-info">
                <b>Name :</b>
                <span> {shippingInfo.name}</span>
              </div>
              <div className="d-flex flex-column flex-wrap mt-2 shipping-info">
                <b>Address :</b>
                <span> {address}</span>
              </div>
              <div className="d-flex flex-column flex-wrap mt-2 shipping-info">
                <b>Number :</b>
                <span> {shippingInfo.phoneNo}</span>
              </div>
            </div>
            <div className=" mt-5 d-flex flex-column justify-content-center align-items-center">
              <h3 className="headings-for-page text-center mb-3">Your Cart Items</h3>
              {cartItems !== 0
                ? cartItems.map((item, index) => (
                    <div
                      className={`cart-item-display-orderPage p-3 mt-0 border border-${
                        mode === "light" ? "dark" : "light"
                      } shadow-${mode === "light" ? "dark" : "light"}`}
                      key={index}
                    >
                      <div className="product-image d-flex flex-column justify-content-center align-center">
                        <Link to={`/product/${item.product}`}>
                          <img src={item.image} alt="product" />
                        </Link>
                      </div>
                      <div className="product-details d-flex flex-column">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-reset"
                        >
                          <div className="cartProd-name">
                            <span>{item.category}</span>
                            <span className="headings-for-page">
                              {item.name}
                            </span>
                          </div>
                        </Link>
                        <div className="cartProd-price">
                          <span>
                            {item.price}*{item.quantity} = 
                          </span>
                          <span className="headings-for-page">
                             ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                : {}}
            </div>
          </div>
          <div className="col-md-6 order-summary-section">
            <h3 className="headings-for-page">Order Summary</h3>
            <hr width="75%" />
            <div className="orderSummaryDiv">
              <span>Subtotal : </span>
              <b>₹ {subtotal}</b>
            </div>
            <div className="orderSummaryDiv mt-4">
              <span>Shipping Charges :</span>
              <b>₹ {shippingCharges}</b>
            </div>
            <div className="orderSummaryDiv mt-4">
              <span>Tax :</span>
              <b>₹ {tax}</b>
            </div>
            {discountVisible && (
              <div className="orderSummaryDiv mt-4">
                <span>Discount</span>
                <b>- {discVal} %</b>
              </div>
            )}
            <hr width="75%" />
            <div className="orderSummaryDiv">
              <input
                type="text"
                value={disCode}
                onChange={(e) => discountInputHandler(e.target.value)}
              />
              <button
                className="btn-applyCoupon"
                onClick={(e) => discountHandler()}
              >
                Apply Coupon
              </button>
            </div>
            <div className="orderSummaryDiv mt-4">
              <span>Total :</span>
              <b>₹ {finalAmount}</b>
            </div>
          </div>
        </div>
        <div className="form-group justify-content-center mt-4 pb-4">
          <button
            className="btn"
            id=""
            onClick={proceedToPayment}
          >
            Proceed for Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirm;
