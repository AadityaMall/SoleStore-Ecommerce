import React, { lazy, useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import { loadUser } from "./components/redux/actions/userActions";
import { checkForSubscription } from "./components/redux/actions/newsLetterActions";
import { useSelector } from "react-redux";
const NavBar = lazy(() => import("./components/layout/NavBar"));
const Home = lazy(() => import("./components/pages/Home"));
const Footer = lazy(() => import("./components/layout/Footer"));
const About = lazy(() => import("./components/pages/About"));
const Contact = lazy(() => import("./components/pages/Contact"));
const Loader = lazy(() => import("./components/layout/Loader"));
const Shop = lazy(() => import("./components/pages/Shop"));
const Login = lazy(() => import("./components/layout/Login"));
const ForgotPassword = lazy(() => import("./components/layout/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/layout/ResetPassword"));
const UserProfile = lazy(() =>
  import("./components/pages/Account/UserProfile")
);
const UpdateProfile = lazy(() =>
  import("./components/pages/Account/UpdateProfile")
);
const UpdatePassword = lazy(() =>
  import("./components/pages/Account/UpdatePassword")
);

const App = () => {
  const [mode, setMode] = useState("light");
  const { isAuthenticated, user } = useSelector((state) => state.user);

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
      <Router>
        <Suspense fallback={<Loader />}>
          <NavBar mode={mode} toggleMode={toggleMode} />
          <div className="tw:mt-[17%] tw:md:mt-[72px]">
            <Routes>
              <Route path="/" element={<Home mode={mode} />} />
              <Route path="" element={<Home mode={mode} />} />
              <Route path="/about" element={<About mode={mode} />} />
              <Route path="/contact" element={<Contact mode={mode} />} />
              <Route path="/products" element={<Shop mode={mode} />} />
              <Route path="/login" element={<Login mode={mode} />} />
              {isAuthenticated ? (
                <Route path="/account" element={<UserProfile mode={mode} />} />
              ) : (
                <Route path="/account" element={<Login mode={mode} />} />
              )}
              <Route
                path="/forgot/password"
                element={<ForgotPassword mode={mode} />}
              />
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
            </Routes>
          </div>
          <Footer mode={mode} />
        </Suspense>
      </Router>
    </>
  );
};

export default App;
