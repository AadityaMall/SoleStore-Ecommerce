import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../redux/actions/productAction";
import { toast } from "react-toastify";

import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants";
const ProductsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.updateproduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Product Deleted Successfuly");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [error, dispatch, deleteError, navigate, isDeleted]);

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
            <Button
              className="text-reset"
              onClick={() => deleteProductHandler(params.id)}
            >
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
        <h1 className="tw:font-brand tw:font-bold tw:text-4xl tw:text-center my-5">
          All Products
        </h1>
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </>
  );
};

export default ProductsList;
