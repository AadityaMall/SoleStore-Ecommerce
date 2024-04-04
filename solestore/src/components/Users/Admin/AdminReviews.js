import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../../Layout/css/ProductsList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteReview,
  getAllReviews,
} from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { Delete } from "@mui/icons-material";
import SideBar from "./SideBar";
import { Button } from "@mui/material";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstants";
import { LocalOffer } from "@mui/icons-material";
const AdminReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfuly");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [error, alert, dispatch, deleteError, isDeleted,productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 150, flex: 0.8 },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email Id",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "Number",
      minWidth: 150,
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
            <Button
              className="text-reset"
              onClick={() => deleteReviewHandler(params.id)}
            >
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  reviews &&
    reviews.forEach((element) => {
      rows.push({
        id: element._id,
        name: element.name,
        email: element.email,
        rating: element.rating,
        comment: element.comment,
      });
    });

  return (
    <>
      <div className="dashboard row">
        <div className="col-lg-2">
          <SideBar />
        </div>
        <div className="dashboard-mainContainer col-lg-10">
            <div className="formElement-getReview d-flex justify-content-center">
          <form
            className="createProductForm d-flex flex-column justify-content-center align-items-center mb-5"
          >
            <h3>Enter Product Id</h3>
            <div className="form-group mb-4">
              <LocalOffer />
              <input
                type="text"
                className="form-control new-product-input"
                placeholder="Name"
                name="name"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              />
            </div>
          </form>
            </div>
          <h1 className="headings-for-page text-center">All Reviews</h1>
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

export default AdminReviews;
