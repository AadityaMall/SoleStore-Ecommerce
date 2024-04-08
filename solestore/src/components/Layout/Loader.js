import React from "react";
import "./css/Loader.css";

const Loader = () => {
  const lightLogo = "https://res.cloudinary.com/dqjeist4k/image/upload/v1712325114/soleStoreAvatars/lightmode_logo_z1n9lz.png"
  return (
    <div className="loading">
      <img src={lightLogo} alt="" />
    </div>
  );
};

export default Loader;
