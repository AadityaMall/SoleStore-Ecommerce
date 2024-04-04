import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import "../Layout/css/MyOrders.css";
import Loader from "../Layout/Loader";
import { Link } from "react-router-dom";
import { myOrders, clearErrors } from "../../actions/orderAction";
import { Launch } from "@mui/icons-material";
import { useAlert } from "react-alert";

const MyOrders = ({ mode }) => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  const alert = useAlert();
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Order Status",
      minWidth: 150,
      flex: 1,
      cellClassName: (params) => {
        return params.row["status"] === "Processing"
          ? "text-danger"
          : "text-success";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantity",
      type: "Number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "Number",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`} className="text-reset">
            <Launch />
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={``}>
            <h3
              className={`headings-for-page text-center mt-5 mb-5 text-${
                mode === "light" ? "dark" : "light"
              }`}
            >
              {user.name}'s Orders
            </h3>
            <div className="data-grid bg-white mb-4 myOrdersPage">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight
                className="my-orders-table"
                disableRowSelectionOnClick
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;