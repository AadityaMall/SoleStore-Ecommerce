import React, { lazy, useState } from "react";
const NavBar = lazy(() => import("./components/layout/NavBar"));
const Home = lazy(() => import("./components/pages/Home"));
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
const App = () => {
  const [mode, setMode] = useState("light");
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
        <NavBar mode={mode} toggleMode={toggleMode} />
        <div className="tw:mt-[17%] tw:md:mt-[30px]">
          <Routes>
            <Route path="/" element={<Home mode={mode} />} />
            <Route path="" element={<Home mode={mode} />} />
          </Routes>
        </div>
        <Footer mode={mode}/>
      </Router>
    </>
  );
};

export default App;
