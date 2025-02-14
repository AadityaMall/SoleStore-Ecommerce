import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {Row,Col} from "react-bootstrap"
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../redux/actions/orderAction";
import { AccountTree } from "@mui/icons-material";
import { toast } from "react-toastify";

import Loader from "../Main/Loader";
import { UPDATE_ORDERS_RESET } from "../../redux/constants/orderConstant";

const UpdateOrder = ({ mode }) => {
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
                      {order && order.user ? order.user.name : " "}
                      </span>
                      <span className="">{order.shippingInfo.phoneNo}</span>
                      <span className="">{order && order.user ? order.user.email : " "}</span>
                      <span className="tw:text-wrap">{address}</span>
                    </div>
                    <div className="tw:mt-3">
                      <div>
                        <span className="tw:font-brand">Date :</span>
                        <span className="tw:px-1">{getTheDate}</span>
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
                            <span className="tw:px-2">₹{subtotal}</span>
                          </span>
                          <span>
                            Shipping :
                            <span className="tw:px-2">
                              + ₹ {order.shippingPrice.toFixed(2)}
                            </span>
                          </span>
                          <span>
                            Tax :{" "}
                            <span className="tw:px-2">
                              + ₹ {order.taxPrice}
                            </span>
                          </span>

                          <span>
                            Discount :
                            <span className="tw:px-2">
                              - ₹{order.discount}%
                            </span>
                          </span>

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
            <div className="col-lg-6 text-center bg-white">
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
                  <div className="mt-5">
                    <h4 className="tw:font-brand">Change Order Status</h4>
                    <form onSubmit={updateOrderSubmitHandler} className="tw:w-full tw:mt-12 tw:flex tw:flex-col tw:justify-center tw:items-center">
                      <div className="form-group mb-4 tw:relative tw:w-[50%]">
                        <AccountTree className="tw:absolute tw:left-[5px] tw:top-[8px]" />
                        <select
                          className="form-control tw:py-2 tw:pl-[40px]"
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
                        className="tw:w-[50%] tw:flex tw:justify-center tw:py-2 tw:px-4 
                tw:border tw:border-transparent tw:rounded-md tw:shadow-sm tw:text-sm 
                tw:font-medium tw:text-white tw:bg-black tw:hover:bg-gray-800"
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
        <div>Information Did not Load</div>
      )}
    </>
  );
};

export default UpdateOrder;