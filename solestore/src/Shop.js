import React from "react";
import { useEffect } from "react";
const Shop = () => {
  //every time page loads, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return <div>Shop</div>;
};

export default Shop;
