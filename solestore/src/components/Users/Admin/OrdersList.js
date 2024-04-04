import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../../Layout/css/ProductsList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import { clearErrors, deleteOrder, getAllOrders } from "../../../actions/orderAction";
import { useAlert } from "react-alert";
import { Edit, Delete } from "@mui/icons-material";
import SideBar from "./SideBar";
import { Button } from "@mui/material";
import { DELETE_ORDERS_RESET } from "../../../constants/orderConstant";
const OrdersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error:deleteError,isDeleted} =  useSelector((state)=> state.updateOrder)
  const orderStatusColor = (stat) => {
    if (stat === "Processing") {
      return "text-danger";
    } else if (stat === "Shipped") {
      return "text-warning";
    } else return "text-success";
  };
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors());
    }
    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors())
    }
    if(isDeleted){
      alert.success("Order Deleted Successfuly");
      navigate("/admin/orders");
      dispatch({type:DELETE_ORDERS_RESET})
    }
    dispatch(getAllOrders())
  }, [error,alert,dispatch,deleteError, navigate, isDeleted])
  
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Order Status",
      minWidth: 150,
      flex: 1,
      cellClassName: (params) => {
        return orderStatusColor( params.row["status"] )
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
      minWidth: 110,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.id}`} className="text-reset">
              <Edit />
            </Link>
            <Button className="text-reset" onClick={() => deleteOrderHandler(params.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((element) => {
      rows.push({
        id: element._id,
        itemsQty: element.orderItems.length,
        amount: element.totalPrice,
        status:element.orderStatus,
      });
    });


  return (

    <>
      <div className="dashboard row">
        <div className="col-lg-2">
          <SideBar />
        </div>
        <div className="dashboard-mainContainer col-lg-10">
          <h1 className="headings-for-page text-center">All Orders</h1>
          <div className="data-grid-admin">
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
      </div>
    </>
  );
};


export default OrdersList