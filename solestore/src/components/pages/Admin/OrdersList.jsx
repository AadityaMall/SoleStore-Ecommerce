import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import { clearErrors, deleteOrder, getAllOrders } from "../../redux/actions/orderAction";
import { toast } from "react-toastify";

import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DELETE_ORDERS_RESET } from "../../redux/constants/orderConstant";
const OrdersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      toast.error(error)
      dispatch(clearErrors());
    }
    if(deleteError){
      toast.error(deleteError);
      dispatch(clearErrors())
    }
    if(isDeleted){
      toast.success("Order Deleted Successfuly");
      navigate("/admin/orders");
      dispatch({type:DELETE_ORDERS_RESET})
    }
    dispatch(getAllOrders())
  }, [error,dispatch,deleteError, navigate, isDeleted])
  
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
      <div className="row">
          <h1 className="tw:font-brand tw:font-bold tw:text-4xl tw:text-center my-5">All Orders</h1>
          <div className="">
            <DataGrid   
              rows={rows}
              columns={columns}
              pageSize={10}
              autoHeight
              disableRowSelectionOnClick
            />
          </div>
        </div>
    </>
  );
};


export default OrdersList