import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const OrderConfirm = ({ mode, incrementStep, decrementStep }) => {
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const cartItems = user.cart;
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
    incrementStep();
  };

  useEffect(() => {
    if (shippingInfo === null || cartItems.length === 0) {
      navigate("/cart");
    }
  });

  return (
    <>
      <Container
        className={`tw:dark:text-white tw:dark:bg-dark tw-w-full 
            tw:dark:shadow-card-dark tw:shadow-card-light tw:mb-12`}
        data-theme={mode}
      >
        <Row className="">
          <Col md={6} className="tw:md:border-r tw:border-gray-400 tw:dark:border-white">
            <div className="p-3 pt-5 pb-0">
              <h3 className="tw:font-brand">Shipping Info</h3>
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
              <h3 className="tw:font-brand text-center mb-3">
                Your Cart Items
              </h3>
              {cartItems !== 0
                ? cartItems.map((item, index) => (
                    <div
                      key={item.productID}
                      className="tw:w-full tw:my-2 tw:flex tw:flex-col tw:md:flex-row tw:items-center tw:gap-4 
                    tw:p-4 tw:border tw:border-gray-200 tw:dark:border-gray-700 tw:rounded-lg tw:shadow-light tw:dark:shadow-dark"
                    >
                      <div className="tw:w-full tw:md:w-1/4 tw:flex tw:justify-center">
                        <Link to={`/product/${item.productID}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="tw:w-32 tw:h-32 tw:object-contain"
                          />
                        </Link>
                      </div>

                      <div className="tw:flex-1 tw:space-y-4 tw:md:space-y-0 tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-center">
                        <div className="tw:space-y-1 tw:text-center tw:md:text-left">
                          <span className="tw:text-sm tw:text-gray-500 tw:dark:text-gray-400">
                            {item.category}
                          </span>
                          <h3 className="tw:text-lg tw:font-medium tw:text-gray-900 tw:dark:text-white">
                            {item.name}
                          </h3>
                          <p className="tw:text-lg tw:font-semibold tw:text-gray-900 tw:dark:text-white">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : {}}
            </div>
          </Col>
          <Col md={6} className="tw:flex tw:flex-col tw:items-center">
            <div className="pt-5 pb-0">
              <h3 className="tw:font-brand tw:text-2xl tw:text-center">Order Summary</h3>
              <hr width="100%" />
              <div className="tw:flex tw:justify-between">
                <span>Subtotal : </span>
                <b>₹ {subtotal}</b>
              </div>
              <div className="tw:flex tw:justify-between mt-4">
                <span>Shipping Charges :</span>
                <b>₹ {shippingCharges}</b>
              </div>
              <div className="tw:flex tw:justify-between mt-4">
                <span>Tax :</span>
                <b>₹ {tax}</b>
              </div>
              {discountVisible && (
                <div className="tw:flex tw:justify-between mt-4">
                  <span>Discount</span>
                  <b>- {discVal} %</b>
                </div>
              )}
              <hr width="100%" />
              <div className="tw:flex tw:justify-between">
                <input
                  type="text"
                  value={disCode}
                  onChange={(e) => discountInputHandler(e.target.value)}
                  className="tw:w-[70%] tw:h-8 tw:px-2 tw:border-2 tw:border-gray-500 tw:dark:border-white
                   "
                />
                <button
                  className="tw:text-[13px] tw:w-24 tw:h-8 tw:bg-black tw:text-white tw:px-1"
                  onClick={(e) => discountHandler()}
                >
                  Apply Coupon
                </button>
              </div>
              <div className="tw:flex tw:justify-between mt-4">
                <span>Total :</span>
                <b>₹ {finalAmount}</b>
              </div>
            </div>
          </Col>
        </Row>
        <div className="tw:w-full tw:flex tw:flex-col tw:items-center tw:justify-center mt-4 pb-4">
          <button className="tw:md:w-[20%] tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 
                tw:border tw:border-transparent tw:rounded-md tw:shadow-sm tw:text-sm 
                tw:font-medium tw:text-white tw:bg-black tw:hover:bg-gray-800" onClick={proceedToPayment}>
            Proceed for Payment
          </button>
          <button className="tw:md:w-[20%] tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 
                tw:border tw:border-transparent tw:rounded-md tw:shadow-sm tw:text-sm 
                tw:font-medium tw:text-white tw:bg-black tw:hover:bg-gray-800 tw:my-2" onClick={decrementStep}>
            Go to Shipping Details
          </button>
        </div>
      </Container>
    </>
  );
};

export default OrderConfirm;
