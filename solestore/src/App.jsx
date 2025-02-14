import React, { lazy, useState, Suspense } from "react";
import { Route, Routes,useLocation } from "react-router-dom";
import store from "./store";
import { loadUser } from "./components/redux/actions/userActions";
import { checkForSubscription } from "./components/redux/actions/newsLetterActions";
import { useSelector } from "react-redux";

const NavBar = lazy(() => import("./components/layout/NavBar"));
const Home = lazy(() => import("./components/pages/Main/Home"));
const Footer = lazy(() => import("./components/layout/Footer"));
const About = lazy(() => import("./components/pages/Main/About"));
const Contact = lazy(() => import("./components/pages/Main/Contact"));
const Loader = lazy(() => import("./components/Layout/Loader"));
const Shop = lazy(() => import("./components/pages/Main/Shop"));
const Login = lazy(() => import("./components/layout/Login"));
const AdminDashboard = lazy(() => import("./components/pages/Admin/AdminNavbar"));
const ForgotPassword = lazy(() =>
  import("./components/pages/Account/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./components/pages/Account/ResetPassword")
);
const ProductPage = lazy(() => import("./components/pages/Main/ProductPage"));
const NotFound = lazy(() => import("./components/layout/NotFound"));
const Cart = lazy(() => import("./components/pages/Main/Cart"));
const Wishlist = lazy(() => import("./components/pages/Main/Wishlist"));
const MyOrders = lazy(() => import("./components/pages/Account/MyOrders"));
const OrderPage = lazy(() => import("./components/pages/Account/OrderPage"));

const UserProfile = lazy(() =>
  import("./components/pages/Account/UserProfile")
);
const UpdateProfile = lazy(() =>
  import("./components/pages/Account/UpdateProfile")
);
const UpdatePassword = lazy(() =>
  import("./components/pages/Account/UpdatePassword")
);
const CheckoutMain = lazy(() => import("./components/pages/Checkout/CheckoutMain"));

const App = () => {
  const [mode, setMode] = useState("light");
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

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
    store.dispatch(checkForSubscription());
  }, []);

  return (
    <>
        <Suspense fallback={<Loader />}>
          <NavBar mode={mode} toggleMode={toggleMode} />
          <div className={`${location.pathname.startsWith("/admin")? "" : "tw:mt-[17%] tw:md:mt-[72px]"}`} >
            <Routes>
              <Route path="/" element={<Home mode={mode} />} />
              <Route path="" element={<Home mode={mode} />} />
              <Route path="/*" element={<NotFound mode={mode} />} />
              <Route path="/about" element={<About mode={mode} />} />
              <Route path="/contact" element={<Contact mode={mode} />} />
              <Route path="/products" element={<Shop mode={mode} />} />
              <Route path="/login" element={<Login mode={mode} />} />
              <Route
                path="/product/:id"
                element={<ProductPage mode={mode} />}
              />
              <Route path="/cart" element={<Cart mode={mode} />} />
              {isAuthenticated ? (
                <Route path="/wishlist" element={<Wishlist mode={mode} />} />
              ) : (
                <Route path="/wishlist" element={<Login mode={mode} />} />
              )}
              {isAuthenticated ? (
                <Route path="/cart" element={<Cart mode={mode} />} />
              ) : (
                <Route path="/cart" element={<Login mode={mode} />} />
              )}
              {isAuthenticated ? (
                <Route path="/account" element={<UserProfile mode={mode} />} />
              ) : (
                <Route path="/account" element={<Login mode={mode} />} />
              )}
              {isAuthenticated ? (
                <Route
                  path="/forgot/password"
                  element={<UserProfile mode={mode} />}
                />
              ) : (
                <Route
                  path="/forgot/password"
                  element={<ForgotPassword mode={mode} />}
                />
              )}
              <Route
                path="/password/reset/:token"
                element={<ResetPassword mode={mode} />}
              />
              {isAuthenticated ? (
                <Route
                  path="/me/update"
                  element={<UpdateProfile mode={mode} />}
                />
              ) : (
                <Route path="/me/update" element={<Login mode={mode} />} />
              )}
              {isAuthenticated ? (
                <Route
                  path="/password/update"
                  element={<UpdatePassword mode={mode} />}
                />
              ) : (
                <Route
                  path="/password/update"
                  element={<Login mode={mode} />}
                />
              )}
              {isAuthenticated ? (
                <Route path="/orders/me" element={<MyOrders mode={mode} />} />
              ) : (
                <Route path="/orders/me" element={<Login mode={mode} />} />
              )}
              {isAuthenticated ? (
                <Route path="/order/:id" element={<OrderPage mode={mode} />} />
              ) : (
                <Route path="/order/:id" element={<Login mode={mode} />} />
              )}
              
              {isAuthenticated ? (
                <Route path="/admin/*" element={<AdminDashboard mode={mode} />} />
              ) : (
                <Route path="/admin/*" element={<Login mode={mode} />} />
              )}
              <Route path="/checkout" element={<CheckoutMain mode={mode} />} />
            </Routes>
          </div>
          <Footer mode={mode} />
        </Suspense>
    </>
  );
};

export default App;
