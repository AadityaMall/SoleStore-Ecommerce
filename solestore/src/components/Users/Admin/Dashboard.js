import React, { useEffect } from "react";
import SideBar from "./SideBar";
import "../../Layout/css/dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../../actions/orderAction";
import { getAdminProduct } from "../../../actions/productAction";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { getAllUsers } from "../../../actions/userActions";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { products } = useSelector((state) => state.products);
  let totalAm = 0;
  orders && orders.forEach((item)=>{
    totalAm += item.totalPrice
  })
  let outOfStock = 0;
  let inStock = 0
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
      else{
        inStock++;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders())
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Final Amount"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        data: [0, totalAm],
        backgroundColor: ["black"],
        hoverBackgroundColor: ["black"],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["red", "green"],
        data: [outOfStock,inStock],
      },
    ],
  };

  return (
    <>
      <div className="dashboard row">
        <div className="col-lg-2">
          <SideBar />
        </div>
        <div className="dashboard-mainContainer col-lg-10">
          <h1 className="headings-for-page text-center">Dashboard</h1>
          <div className="totalAmount-dashboard">
            <p>
              Total Amount <br /> {totalAm}
            </p>
          </div>
          <div className="dashboardSummary">
            <Link to={`/admin/products`}>
              <div className="dashboard-element prodCount-dashboard">
                <p className="headings-for-page">Products</p>
                <b>{products && products.length}</b>
              </div>
            </Link>
            <Link to={`/admin/users`}>
              <div className="dashboard-element userCount-dashboard">
                <p className="headings-for-page">Users</p>
                <b>{users && users.length}</b>
              </div>
            </Link>
            <Link to={`/admin/orders`}>
              <div className="dashboard-element orderCount-dashboard">
                <p className="headings-for-page">Orders</p>
                <b>{orders && orders.length}</b>
              </div>
            </Link>
          </div>
          <div className="charts">
            <div className="line-chart">
              <Line data={lineState} />
            </div>
            <div className="doughnut-chart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
