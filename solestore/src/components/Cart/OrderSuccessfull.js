import React from "react";
import {CheckCircle} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../Layout/css/OrderSuccess.css"
const OrderSuccess = () => {
  return (
    <div className="orderSuccess shadow">
      <CheckCircle />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders/me" className="btn btn-orderSuccess">View Orders</Link>
      <Link to="/products" className="btn btn-orderSuccess">Shop More</Link>
    </div>
  );
};

export default OrderSuccess;