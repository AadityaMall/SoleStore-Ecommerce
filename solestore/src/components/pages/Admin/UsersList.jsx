import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import { clearErrors, deleteUser, getAllUsers } from "../../redux/actions/userActions";
import { toast } from "react-toastify";

import { Edit, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { USER_DELETE_RESET } from "../../redux/constants/userConstant";
const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, users } = useSelector((state) => state.allUsers);
  const { error:deleteError,isDeleted} =  useSelector((state)=> state.profile)
  
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      toast.success("User Deleted");
      navigate("/admin/users");
      dispatch({type:USER_DELETE_RESET})
    }
    dispatch(getAllUsers())
  }, [error,dispatch,deleteError, navigate, isDeleted])
  
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email ID",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 180,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row["role"] === "admin"
          ? "text-success"
          : "text-danger";
      },
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
            <Link to={`/admin/user/${params.id}`} className="text-reset">
              <Edit />
            </Link>
            <Button className="text-reset" onClick={() => deleteUserHandler(params.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  users &&
    users.forEach((element) => {
      rows.push({
        id: element._id,
        name: element.name,
        email: element.email,
        role: element.role,
      });
    });


  return (

    <>
      <div className=" row">
          <h1 className="tw:font-brand tw:font-bold tw:text-4xl tw:text-center my-3">All Users</h1>
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



export default UsersList