import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loader from "../Layout/Loader";
import "../Layout/css/SingleOrder.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SingleOrder = ({ mode }) => {
  const dispatch = useDispatch();
  const receiptRef = useRef(null);
  const alert = useAlert();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, id]);

  const handleDownloadPDF = () => {
    const scale = 2;
    const options = {
      scale: scale,
      useCORS: true,
      logging: true,
    };

    html2canvas(receiptRef.current, options).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("order_receipt.pdf");
    });
  };

  if (order && order.shippingInfo) {
    var address = `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`;
    var getTheDate = order.createdAt.toString().slice(0, 10);
    var subtotal = order.orderItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  }
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };

    handleScrollToTop(); // Scroll to top when component mounts

    return () => {
      // Cleanup (not really necessary for scrollTo, but good practice)
      window.removeEventListener("scroll", handleScrollToTop);
    };
  }, []); // Empty dependency array to run once on component mount

  return (
    <>
      {loading ? (
        <Loader />
      ) : order && order.shippingInfo ? (
        <>
          <div className="reciept-card m-4">
            <div className="row">
              <div className="col-lg-6 main-receipt-outer" ref={receiptRef}>
                <div className="mainReciept">
                  <div id="recieptHead">
                    <img src="../images/darkmode_logo.png" alt="" />
                    <h3 className="head-receipt">YOUR ORDER RECEIPT</h3>
                  </div>
                  <div id="receiptBodyUpper" className="">
                    <span>To : </span>
                    <span
                      id="recieptBodyUserName"
                      className="headings-for-page"
                    >
                      {user.name}
                    </span>
                    <span id="userMobileNumber">
                      {order.shippingInfo.phoneNo}
                    </span>
                    <span id="userEmailId">{user.email}</span>
                    <span id="userAddress">{address}</span>
                  </div>
                  <div id="receiptBodyMid" className="">
                    <div>
                      <span className="headings-for-page">Date :</span>
                      <span id="todaysDate">{getTheDate}</span>
                    </div>
                    <div>
                      <span className="headings-for-page">Order ID: </span>
                      <span id="orderNumber">{order._id}</span>
                    </div>
                  </div>
                  <div id="receiptBodyShoes" className="mt-4">
                    <div className="row">
                      <span className="col-4">Item</span>
                      <span className="col-3">Price</span>
                      <span className="col-2 text-center">Qty</span>
                      <span className="col-3">Total</span>
                    </div>
                    <hr />
                    {order.orderItems &&
                      order.orderItems.map((item, index) => (
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
                          {subtotal}
                        </span>
                      </span>
                      <span>
                        Shipping : + ₹
                        <span id="shippingCharges"> {order.shippingPrice}</span>
                      </span>
                      <span>
                        Tax : + ₹<span> {order.taxPrice}</span>
                      </span>
                      <span>
                        Discount : -{" "}
                        <span id="shippingCharges"> {order.discount} %</span>
                      </span>
                      <hr />
                      <span>
                        Total: ₹
                        <span
                          className="headings-for-page"
                          id="FinaltotalPrice"
                        >
                          {" "}
                          {order.totalPrice}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 text-center bg-white">
                <div>
                  <div className="orderProductsDisplay mt-5">
                    <h3 className="headings-for-page">Your Cart Items</h3>
                    {order.orderItems !== 0
                      ? order.orderItems.map((item, index) => (
                          <div
                            className={`cart-item-display-orderPage mt-0 border border-${
                              mode === "light" ? "dark" : "light"
                            }`}
                            key={index}
                          >
                            <div className="product-image">
                              <Link to={`/product/${item.product}`}>
                                <img src={item.image} alt="product" />
                              </Link>
                            </div>
                            <div className="product-details">
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
              </div>
            </div>
            <div className="reciept-download m-3">
              <button
                className="btn btn-downloadreciept"
                onClick={handleDownloadPDF}
              >
                Download Order Reciept
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>Information Didnt Load</div>
      )}
    </>
  );
};

export default SingleOrder;
