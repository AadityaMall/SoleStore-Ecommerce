import React, { lazy, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const NavBar = lazy(() => import("./components/layout/NavBar"));
const Home = lazy(() => import("./components/pages/Home"));
const Footer = lazy(() => import("./components/layout/Footer"));
const About = lazy(() => import("./components/pages/About"));
const Contact = lazy(() => import("./components/pages/Contact"));
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
        <div className="tw:mt-[17%] tw:md:mt-[72px]">
          <Routes>
            <Route path="/" element={<Home mode={mode} />} />
            <Route path="" element={<Home mode={mode} />} />
            <Route path="/about" element={<About mode={mode} />} />
            <Route path="/contact" element={<Contact mode={mode} />} />
          </Routes>
        </div>
        <Footer mode={mode}/>
      </Router>
    </>
  );
};

export default App;
