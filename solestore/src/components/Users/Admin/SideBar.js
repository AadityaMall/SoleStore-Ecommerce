import React from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { Link } from "react-router-dom";
import {
  ExpandMore,
  ImportExport,
  ListAlt,
  Dashboard,
  People,
  RateReview,
  Circle,
} from "@mui/icons-material";
import "../../Layout/css/AdminSideBar.css";

const SideBar = () => {
  const darkLogo = "https://i.ibb.co/qYRd6qN/darkmode-logo.png";
  //   const lightLogo = "https://i.ibb.co/0MyCLvg/lightmode-logo.png";
  return (
    <>
      <div className="sidebar">
        {window.innerWidth>900 && (
        <Link to={`/`}>
          <img src={darkLogo} alt="" />
        </Link>
        )}
        <Link to={`/admin/dashboard`}>
          <p>
            <Dashboard /> Dashboard
          </p>
        </Link>
        <Link to={`/admin/orders`}> 
          <p>
            <ListAlt /> Orders
          </p>
        </Link>
        <Link to="/admin/users">
          <p>
            <People /> Users
          </p>
        </Link>
        <Link to="/admin/reviews">
          <p>
            <RateReview />
            Reviews
          </p>
        </Link>
        <Link>
          <div>
            <SimpleTreeView
              aria-label="customized"
              slots={{
                expandIcon: ExpandMore,
                collapseIcon: ImportExport,
                endIcon: Circle,
              }}
            >
              <TreeItem itemId="1" label="Products">
                <Link to={`/admin/products`} className="">
                  <TreeItem itemId="2" label="All Products" />
                </Link>
                <Link to={`/admin/product/new`}>
                  <TreeItem itemId="3" label="Create Product" />
                </Link>
              </TreeItem>
            </SimpleTreeView>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SideBar;
