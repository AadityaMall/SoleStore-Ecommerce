import React from "react";
import { useEffect } from "react";
import "./Layout/css/Wishlist.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../actions/wishlistAction";

const WishlistItemCard = (props) => {
  const dispatch =  useDispatch();
  const removeWishList = (id) =>
  {
    dispatch(removeFromWishlist(id));
  }
  return (
    <>
      <div className="wishlist-item-display">
        <div className="product-image">
          <Link to={`/product/${props.cproduct.product}`}>
            <img src={props.cproduct.image} alt="product" />
          </Link>
        </div>
        <div className="product-details">
          <Link
            to={`/product/${props.cproduct.product}`}
            className="text-reset"
          >
            <div className="wishlistProd-name">
              <span className="text-muted">{props.cproduct.category}</span>
              <span className="headings-for-page">{props.cproduct.name}</span>
            </div>
          </Link>
          <div className="wishlistProd-price">
            <span>₹ {props.cproduct.price}</span>
          </div>
          <div className="wishlistProd-remove">
            <button
              className="btn"
              id="wishlistRemoveButton"
              onClick={() => removeWishList(props.cproduct.product)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <div className="container-fluid" id="contentHolder" >
        <div className="wishlist-card p-3">
          <div className="title">
            <h2 className="headings-for-page">Shopping Wishlist</h2>
            <span className="text-muted headings-for-page">
              Total Items : {wishlistItems.length}
            </span>
          </div>
          {wishlistItems!==0?
            wishlistItems.map((item,index) => (
                <div className="productswishlist" key={index}>
                  <WishlistItemCard cproduct={item} />
                </div>
            )):({})}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
