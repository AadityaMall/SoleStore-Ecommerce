import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createOrder } from "../../redux/actions/orderAction";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { paymentVerification } from "../../redux/actions/paymentAction";
import Loader from "../Main/Loader";

function currentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + " / " + mm + " / " + yyyy;
}
const FinalOrder = ({ mode }) => {

  const paymentProcessHandler = async () => {
    const paymentData = {
      name: shippingInfo.name,
      email: shippingInfo.email,
      phone: shippingInfo.phoneNo,
      address: address,
      finalAmount: orderInfo.finalAmount,
    };
    const razorpay = await dispatch(paymentVerification(paymentData));

    razorpay.open();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { paymentStatus, paymentId } = useSelector((state) => state.payment);
  const cartItems = user.cart;
  const { shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const orderInfo = sessionStorage.getItem("orderInfo")
    ? JSON.parse(sessionStorage.getItem("orderInfo"))
    : [];
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const order = {
    paymentId: paymentId,
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    discount: orderInfo.discVal,
    totalPrice: orderInfo.finalAmount,
  };
  const orderHandler = () => {
    dispatch(createOrder(order));
    navigate(`/orderSuccessfull?ref=${paymentId.toString()}`);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate]);

  useEffect(() => {
    if (paymentStatus) {
      orderHandler();
    }
  }, [paymentStatus]);

  if (paymentStatus) {
    return <Loader />;
  }
  return (
    <>
      <div
        className="tw:bg-[url(/images/loginpg_bg.png)] tw:bg-cover tw:bg-center tw:min-h-screen    
            tw:flex tw:justify-center tw:items-center"
        data-theme={mode}
      >
        <Container className="tw:bg-white tw:dark:bg-gray-800 tw:m-4">
          <Row>
            <Col
              md={6}
              className="tw:bg-[url(/images/paper_bg.png)] tw:bg-cover tw:bg-center tw:min-h-screen"
            >
              <div className="tw:p-2">
                <div className="tw:flex tw:flex-col tw:justify-center tw:items-center tw:w-full">
                  <img
                    src={`/images/darkmode_logo.png`}
                    alt=""
                    className="tw:max-w-[150px] tw:rounded-full"
                  />
                  <h3 className="tw:font-brand">ORDER RECEIPT</h3>
                </div>
                <div className="tw:flex tw:flex-col tw:justify-center tw:items-start">
                  <span>To :</span>
                  <span className="tw:font-brand tw:font-bold">
                    {shippingInfo.name}
                  </span>
                  <span className="">{shippingInfo.phoneNo}</span>
                  <span className="">{shippingInfo.email}</span>
                  <span className="tw:text-wrap">{address}</span>
                </div>
                <div className="tw:mt-3">
                  <div>
                    <span className="tw:font-brand">Date :</span>
                    <span className="tw:px-1">{currentDate()}</span>
                  </div>
                  <div>
                    <span className="tw:font-brand">Order ID: </span>
                    <span>{order._id}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Row>
                    <Col md={4} xs={4} className="tw:font-bold">
                      Item
                    </Col>
                    <Col md={3} xs={3} className="text-end tw:font-bold">
                      Price
                    </Col>
                    <Col md={2} xs={2} className="text-end tw:font-bold">
                      Qty
                    </Col>
                    <Col md={3} xs={3} className="text-end tw:font-bold">
                      Total
                    </Col>
                  </Row>
                  <hr />
                  {order.orderItems &&
                    order.orderItems.map((item, index) => (
                      <Row key={index}>
                        <Col
                          md={4}
                          xs={4}
                          className="tw:font-brand tw:flex tw:flex-col tw:justify-center tw:items-start"
                        >
                          <span className="tw:text-[14px] tw:font-bold">
                            {item.category}
                          </span>
                          <span className="tw:font-bold">{item.name}</span>
                        </Col>
                        <Col
                          md={3}
                          xs={3}
                          className="tw:font-brand tw:text-end"
                        >
                          ₹<span>{item.price}</span>
                        </Col>
                        <Col
                          md={2}
                          xs={2}
                          className="tw:font-brand tw:text-end"
                        >
                          <span>{item.quantity}</span>
                        </Col>
                        <Col
                          md={3}
                          xs={3}
                          className="tw:font-brand tw:text-end"
                        >
                          ₹<span>{item.quantity * item.price}</span>
                        </Col>
                      </Row>
                    ))}
                  <hr />

                  <Row>
                    <div className="tw:flex tw:flex-col tw:items-end tw:font-brand">
                      <span>
                        Total:
                        <span className="tw:px-2">₹{orderInfo.subtotal}</span>
                      </span>
                      <span>
                        Shipping :
                        <span className="tw:px-2">
                          + ₹ {orderInfo.shippingCharges.toFixed(2)}
                        </span>
                      </span>
                      <span>
                        Tax :{" "}
                        <span className="tw:px-2">+ ₹ {orderInfo.tax}</span>
                      </span>

                      <span>
                        Discount Code :
                        <span>
                          {orderInfo.disCode === "" ? (
                            <span>None</span>
                          ) : (
                            <span>{orderInfo.disCode}</span>
                          )}
                        </span>
                      </span>
                      {orderInfo.disCode === "" ? (
                        <></>
                      ) : (
                        <span>
                          Discount :
                          <span>
                            - ₹{" "}
                            {(orderInfo.discVal / 100) *
                              (orderInfo.subtotal +
                                orderInfo.shippingCharges +
                                orderInfo.tax)}
                          </span>
                        </span>
                      )}

                      <hr />
                      <span>
                        Total: ₹
                        <span className="tw:px-2">{order.totalPrice}</span>
                      </span>
                    </div>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="text-center tw:bg-white tw:dark:bg-gray-800 tw:dark:text-white">
                <div className="mt-5">
                  <h3 className="tw:font-brand">Your Cart Items</h3>
                  {cartItems.length !== 0
                    ? cartItems.map((item) => (
                        <div
                          key={item.productID}
                          className="tw:my-2 tw:flex tw:flex-col tw:md:flex-row tw:items-center tw:gap-4 
                              tw:p-4 tw:border tw:border-gray-200 tw:dark:border-gray-700 tw:rounded-lg tw:shadow-md"
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
                <button
                  onClick={paymentProcessHandler}
                  className="tw:bg-black tw:text-white tw:w-full tw:px-4 tw:py-2 tw:rounded-md 
                tw:hover:bg-transparent tw:hover:text-black tw:border tw:border-black 
                tw:transition-all tw:duration-300 tw:dark:hover:bg-transparent tw:dark:hover:text-white 
                tw:dark:hover:border-white"
                >
                  Place Order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FinalOrder;
