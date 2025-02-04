import React, { useState, lazy, Suspense } from "react";
import NavBar from "./components/layout/NavBar";
const Footer = lazy(() => import("./components/layout/Footer"));

const App = () => {
  return (
    <>
      <NavBar />
      <Footer />
    </>
  );
};

export default App;
