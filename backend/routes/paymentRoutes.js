const express = require("express");
const { processPayment, getRazorPayKey, verifyPayment } = require("../controllers/paymentController");
const router = express.Router();

router.route("/payment/process").post(processPayment);
router.route("/payment/getkey").get(getRazorPayKey);
router.route("/payment/verify").post(verifyPayment);
module.exports = router;
