const Razorpay = require("razorpay");
const dotenv = require('dotenv');
const crypto = require('crypto');
const Payment = require("../models/paymentsModel");

dotenv.config({path:"config/config.env"});

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});
exports.processPayment = async (req, res, next) => {
    const {amount} = req.body;
    const options = {
        amount: parseInt(amount) * 100,
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    
    res.status(200).json({
        success: true,
        order: order
    });
};

exports.verifyPayment = async (req, res, next) => {
    try {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
    .update(body)
    .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;
    
    if(isAuthentic){
        const payment = await Payment.create({
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature
        });
        res.status(200).json({
            success: true,
            paymentId: payment._id,
            message: "Payment verified successfully"
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Payment verification failed"
        });
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Payment verification failed"
        });
    }
}   

exports.getRazorPayKey = async (req, res, next) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    });
}
