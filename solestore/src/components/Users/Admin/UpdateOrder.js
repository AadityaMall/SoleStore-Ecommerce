import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../../actions/orderAction";
import { AccountTree } from "@mui/icons-material";
import { toast } from "react-toastify";

import Loader from "../../Layout/Loader";
import "../../Layout/css/SingleOrder.css";
import "../../Layout/css/UpdateOrder.css";
import { UPDATE_ORDERS_RESET } from "../../../constants/orderConstant";

const UpdateOrder = ({ mode }) => {
  const darkLogo = "https://res.cloudinary.com/dqjeist4k/image/upload/v1712325115/soleStoreAvatars/darkmode_logo_jzymyp.png";
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updateOrder
  );
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const orderStatusColor = () => {
    if (order.orderStatus === "Processing") {
      return "danger";
    } else if (order.orderStatus === "Shipped") {
      return "warning";
    } else return "success";
  };
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };
  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Submitted Successfullt");
      dispatch({ type: UPDATE_ORDERS_RESET });
    }
  }, [dispatch, error, id, updateError, isUpdated]);

  if (order && order.shippingInfo) {
    var address = `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`;
    var getTheDate = order.createdAt.toString().slice(0, 10);
    var subtotal = order.orderItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : order && order.shippingInfo ? (
        <>
          <div className="dashboard row">
            <div className="col-lg-2">
              <SideBar />
            </div>
            <div className="col-lg-5 main-receipt-outer">
              <div className="mainReciept">
                <div id="recieptHead">
                  <img
                    src={darkLogo}
                    alt=""
                  />
                  <h3 className="head-receipt">YOUR ORDER RECEIPT</h3>
                </div>
                <div id="receiptBodyUpper" className="">
                  <span>To : </span>
                  <span id="recieptBodyUserName" className="headings-for-page">
                    {order && order.user ? order.user.name : " "}
                  </span>
                  <span id="userMobileNumber">
                    {order.shippingInfo.phoneNo}
                  </span>
                  <span id="userEmailId">
                  {order && order.user ? order.user.email : " "}

                    </span>
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
                      <span className="headings-for-page" id="FinaltotalPrice">
                        {" "}
                        {order.totalPrice}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 text-center bg-white">
              <div>
                <div className="orderStatusDisplaySection mt-5">
                  <h6 className="headings-for-page">Order Status</h6>
                  <h2
                    className={`headings-for-page mt-2 text-${orderStatusColor()}`}
                  >
                    {order.orderStatus}
                  </h2>
                </div>
                {order.orderStatus !== "Delivered" && (
                  <div className="changeorderStatusDisplaySection mt-5">
                    <h4 className="headings-for-page">Change Order Status</h4>
                    <form onSubmit={updateOrderSubmitHandler}>
                      <div className="form-group mb-4">
                        <AccountTree />
                        <select
                          className="form-control new-product-input"
                          id="selectInput-Admin"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Category</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}
                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                      </div>
                      <button
                        className="btn"
                        type="submit"
                        disabled={
                          loading ? true : false || status === "" ? true : false
                        }
                      >
                        UPDATE
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Information Didnt Load</div>
      )}
    </>
  );
};

export default UpdateOrder;
