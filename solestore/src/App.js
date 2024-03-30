import React, { useState } from "react";
import "./components/Layout/css/App.css";
import Navbar from "./components/Layout/Navbar.js";
import User from "./components/Users/User.js";
import About from "./components/About.js";
import Home from "./components/Home.js";
import Shop from "./components/Shop.js";
import Contact from "./components/Contact.js";
import Cart from "./components/Cart/Cart.js";
import Wishlist from "./components/Wishlist.js";
import Error404 from "./components/Error404.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Layout/Footer.js";
import ProductPage from "./components/ProductPage.js";
import LoginSignup from "./components/Users/LoginSignup.js";
import store from "./store.js";
import { loadUser } from "./actions/userActions.js";
import { useSelector } from "react-redux";
import UpdateUser from "./components/Users/UpdateUser.js";
import UpdatePassword from "./components/Users/UpdatePassword.js";
import ForgotPassword from "./components/Users/ForgotPassword.js";
import ResetPassword from "./components/Users/ResetPassword.js";
import Shipping from "./components/Cart/Shipping.js";
import OrderConfirm from "./components/Cart/OrderConfirm.js";
import { CheckoutPage } from "./components/Cart/CheckoutPage.js";
function App() {
  const [mode, setMode] = useState("light");
  const { isAuthenticated } = useSelector((state) => state.user);
  //Toggle between light and dark mode
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(58, 56, 56)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        <Navbar
          mainTitle="Sole"
          brandTitle="Store"
          mode={mode}
          toggleMode={toggleMode}
        />
        <Routes>
          <Route path="/" element={<Home mode={mode} />} />
          <Route path="" element={<Home mode={mode} />} />
          <Route path="/home" element={<Home mode={mode} />} />
          <Route path="/about" element={<About mode={mode} />} />
          {isAuthenticated ? (
            <Route path="/account" element={<User />} />
          ) : (
            <Route path="/account" element={<LoginSignup />} />
          )}
          {isAuthenticated ? (
            <Route path="/process/payment" element={<CheckoutPage mode={mode}/>} />
          ) : (
            <Route path="/process/payment" element={<LoginSignup />} />
          )}
          {isAuthenticated ? (
            <Route path="/me/update" element={<UpdateUser />} />
          ) : (
            <Route path="/me/update" element={<LoginSignup />} />
          )}
          {isAuthenticated ? (
            <Route path="/password/update" element={<UpdatePassword />} />
          ) : (
            <Route path="/password/update" element={<LoginSignup />} />
          )}
          {isAuthenticated ? (
            <Route path="/shipping" element={<Shipping mode={mode} />} />
          ) : (
            <Route path="/shipping" element={<LoginSignup />} />
          )}
          {isAuthenticated ? (
            <Route
              path="/order/confirm"
              element={<OrderConfirm mode={mode} />}
            />
          ) : (
            <Route path="/order/confirm" element={<LoginSignup />} />
          )}
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/products" element={<Shop mode={mode} />} />
          <Route path="/contact" element={<Contact mode={mode} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/*" element={<Error404 />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/product/:id" element={<ProductPage mode={mode} />} />
        </Routes>
        <Footer mode={mode} />
      </Router>
    </>
  );
}

export default App;
