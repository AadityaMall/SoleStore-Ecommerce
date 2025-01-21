import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../../Layout/css/ProductsList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import { clearErrors, deleteProduct, getAdminProduct } from "../../../actions/productAction";
import { toast } from "react-toastify";

import { Edit, Delete } from "@mui/icons-material";
import SideBar from "./SideBar";
import { Button } from "@mui/material";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
const ProductsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);
  const { error:deleteError,isDeleted} =  useSelector((state)=> state.updateproduct)
  
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      toast.success("Product Deleted Successfuly");
      navigate("/admin/dashboard");
      dispatch({type:DELETE_PRODUCT_RESET})
    }
    dispatch(getAdminProduct())
  }, [error,dispatch,deleteError, navigate, isDeleted])
  
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 180, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "Number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      type: "Number",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 180,
      flex: 0.5,
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
            <Link to={`/admin/product/${params.id}`} className="text-reset">
              <Edit />
            </Link>
            <Button className="text-reset" onClick={() => deleteProductHandler(params.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  products &&
    products.forEach((element) => {
      rows.push({
        id: element._id,
        stock: element.stock,
        price: element.price,
        category: element.category,
        name: element.name,
      });
    });


  return (

    <>
      <div className="dashboard row">
        <div className="col-lg-2">
          <SideBar />
        </div>
        <div className="dashboard-mainContainer col-lg-10">
          <h1 className="headings-for-page text-center">All Products</h1>
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

export default ProductsList;
