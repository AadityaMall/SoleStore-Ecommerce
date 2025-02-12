import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteReview,
  getAllReviews,
} from "../../redux/actions/productAction";
import { toast } from "react-toastify";

import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DELETE_REVIEW_RESET } from "../../redux/constants/productConstants";
import { LocalOffer } from "@mui/icons-material";
const AdminReviews = () => {
  const dispatch = useDispatch();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews } = useSelector((state) => state.productReviews);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfuly");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [error, dispatch, deleteError, isDeleted, productId]);

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
      <div className=" row">
          <div className=" d-flex justify-content-center">
            <form className=" d-flex flex-column justify-content-center align-items-center mb-5">
              <h6>Enter Product Id</h6>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control new-product-input"
                  placeholder="Product Id"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>
          <h1 className="tw:font-brand tw:font-bold tw:text-4xl tw:text-center my-2">
            All Reviews
          </h1>
          <div className="">
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

export default AdminReviews;
