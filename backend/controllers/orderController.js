const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("../middleware/asyncError");
const Payment = require("../models/paymentsModel");
//Create new order
exports.newOrder = asyncError(async (req, res, next) => {
  try{

    const {
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      discount,
      shippingPrice,
      totalPrice,
      paymentId,
    } = req.body;
    const order = await Order.create({
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discount,
      totalPrice,
      paymentId,
      paidAt: Date.now(),
      user: req.user.id,
    });
    await Payment.findByIdAndUpdate(paymentId, { orderId: order._id });
    res.status(201).json({
      success: true,
      order,
    });
  }catch(err){
    console.log(err);
  }
});

//Get single Order
exports.getSingleOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(201).json({
    success: true,
    order,
  });
});

//get logged in user orders
exports.myOrders = asyncError(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id });

  res.status(201).json({
    success: true,
    order,
  });
});

//get all orders --admin
exports.getAllOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(201).json({
    success: true,
    orders,
    totalAmount,
  });
});

//Update Order Status --admin
exports.updateOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already Dilevered this Order", 404));
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    order,
  });
});

//Delete order -- admin only
exports.deleteOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  await order.deleteOne();

  res.status(201).json({
    success: true,
  });
});
