import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../redux/actions/orderAction";
import { toast } from "react-toastify";
import Loader from "../../Layout/Loader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Row, Col, Container } from "react-bootstrap";

const OrderPage = ({ mode }) => {
  const dispatch = useDispatch();
  const receiptRef = useRef(null);

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

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
          <div
            className="tw:bg-[url(/images/loginpg_bg.png)] tw:bg-cover tw:bg-center tw:min-h-screen    
            tw:flex tw:justify-center tw:items-center"
            data-theme={mode}
          >
            <Container className="tw:bg-white tw:dark:bg-gray-800 tw:m-4">
              <Row>
                <Col
                  md={6}
                  ref={receiptRef}
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
                        {user.name}
                      </span>
                      <span className="">{order.shippingInfo.phoneNo}</span>
                      <span className="">{user.email}</span>
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
                <Col md={6}>
                  <div className="text-center tw:bg-white tw:dark:bg-gray-800 tw:dark:text-white">
                    <div className="orderProductsDisplay mt-5">
                      <h3 className="tw:font-brand">Your Cart Items</h3>
                      {order.orderItems !== 0
                        ? order.orderItems.map((item, index) => (
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
                  </div>
                </Col>
                <div className="tw:flex tw:justify-center tw:py-4 tw:items-center tw:w-full">
                  <button
                    className="tw:bg-gray-800 tw:text-white tw:dark:bg-gray-700 tw:py-2 tw:mx-4 tw:rounded-md 
                  tw:hover:bg-gray-700 tw:dark:hover:bg-gray-600 tw:transition-colors tw:w-full"
                    onClick={handleDownloadPDF}
                  >
                    Download Order Reciept
                  </button>
                </div>
              </Row>
            </Container>
          </div>
        </>
      ) : (
        <div>Information Didnt Load</div>
      )}
    </>
  );
};

export default OrderPage;
