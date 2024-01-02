import {useState } from "react";
import "./components/Layout/css/App.css";
import Navbar from "./components/Layout/Navbar.js";
import User from "./components/User.js";
import About from "./components/About.js";
import Home from "./components/Home.js";
import Shop from "./components/Shop.js";
import Contact from "./components/Contact.js";
import Cart from "./components/Cart.js";
import Wishlist from "./components/Wishlist.js";
import Error404 from "./components/Error404.js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Layout/Footer.js";
import ProductPage from "./components/ProductPage.js";


function App() {
  const [mode, setMode] = useState("light");
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
          <Route path="/" element={<Home mode={mode}/>} />
          <Route path="" element={<Home mode={mode}/>} />
          <Route path="/home" element={<Home mode={mode}/>} />
          <Route path="/about" element={<About mode={mode} />} />
          <Route path="/user" element={<User />} />
          <Route path="/products" element={<Shop mode = {mode} />} />
          <Route path="/contact" element={<Contact mode={mode} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/*" element={<Error404 />} />
          <Route path="/product/:id" element={<ProductPage mode={mode}/>} />

        </Routes>
        <Footer mode={mode} />
      </Router>
    </>
  );
}

export default App;
