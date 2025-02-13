import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../redux/actions/orderAction";
import { getAdminProduct } from "../../redux/actions/productAction";
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
import { getAllUsers } from "../../redux/actions/userActions";
import { Row, Container,Col } from "react-bootstrap";
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
const DashboardComponent = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { products } = useSelector((state) => state.products);
  let totalAm = 0;
  orders &&
    orders.forEach((item) => {
      totalAm += item.totalPrice;
    });
  let outOfStock = 0;
  let inStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      } else {
        inStock++;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
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
        data: [outOfStock, inStock],
      },
    ],
  };

  return (
    <>
      <Container fluid>
        <Row className="tw:w-full tw:flex tw:justify-center">
            <h1 className="tw:font-brand tw:font-bold tw:text-4xl tw:text-center my-5">Dashboard</h1>
            <div className="tw:!mx-0 tw:flex tw:justify-center tw:items-center tw:w-full tw:py-5 tw:bg-gray-700"> 
            <span className="tw:font-brand tw:text-white tw:text-2xl">
                Total Amount <br /> ₹ {totalAm.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
            <Row className="tw:w-full tw:flex tw:justify-center tw:my-[20px]">
              <Col md={4} className="tw:flex tw:flex-col tw:items-center tw:justify-center">
                <Link to={`/admin/products`} className="text-center tw:my-10 tw:bg-gray-700 tw:rounded-full tw:p-[50px] tw:text-white tw:no-underline">
                    <p className="tw:font-brand">Products</p>
                    <b>{products && products.length}</b>
              </Link>
              </Col>
              <Col md={4} className="tw:flex tw:flex-col tw:items-center tw:justify-center">
              <Link to={`/admin/users`} className="text-center tw:w-auto tw:my-10 tw:bg-gray-700 tw:rounded-full tw:p-[50px] tw:text-white tw:no-underline">
                  <p className="tw:font-brand">Users</p>
                  <b>{users && users.length}</b>
              </Link>
              </Col>
              <Col md={4} className="tw:flex tw:flex-col tw:items-center tw:justify-center">
              <Link to={`/admin/orders`} className="text-center tw:my-10 tw:bg-gray-700 tw:rounded-full tw:p-[50px] tw:text-white tw:no-underline">
                  <p className="tw:font-brand">Orders</p>
                  <b>{orders && orders.length}</b>
              </Link>
              </Col>
            </Row>
            <div className="tw:w-full tw:flex tw:flex-col tw:items-center tw:justify-center">
              <div className="my-3 tw:w-full tw:flex tw:justify-center">
                <Line data={lineState} className="tw:md:w-[60%] tw:w-full tw:h-auto"/>
              </div>
              <div className="my-5 tw:w-full tw:flex tw:justify-center">
                <Doughnut data={doughnutState} className="tw:md:w-[40%] tw:w-full tw:h-auto"/>
              </div>
            </div>
        </Row>
      </Container>
    </>
  );
};

export default DashboardComponent;
