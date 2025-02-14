import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
const OrderPlaced = ({ mode }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get('ref');

  return (
    <div className="tw:flex tw:justify-center tw:items-center tw:w-full tw:h-[70vh]" data-theme={mode}>
      <div className="tw:flex tw:flex-col tw:items-center tw:justify-center">
        <CheckCircle className="tw:text-green-500 tw:text-[60px] tw:my-2" />
        <h1 className="tw:text-2xl tw:font-bold tw:dark:text-white">Order Placed Successfully</h1>
        <p className="tw:text-sm tw:text-gray-500 tw:dark:text-gray-400">Your order has been placed successfully</p>
        <p className="tw:text-sm tw:text-gray-500 tw:dark:text-gray-400">Your payment id is: {paymentId}</p>
        <Link to="/orders/me" className="tw:text-sm tw:text-gray-500 tw:dark:text-gray-400">View Orders</Link>
      </div>
    </div>
  );
};

export default OrderPlaced;