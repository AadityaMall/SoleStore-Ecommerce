import React from "react";
import { useEffect } from "react";
import "./Layout/css/Wishlist.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../actions/wishlistAction";
import Loader from "./Layout/Loader"
const WishlistItemCard = (props) => {
  console.log(props.cproduct)
  const dispatch =  useDispatch();
  const removeWishList = (id) =>
  {
    dispatch(removeFromWishlist(id));
  }
  return (
    <>
      <div className="wishlist-item-display">
        <div className="product-image">
          <Link to={`/product/${props.cproduct.productID}`}>
            <img src={props.cproduct.image} alt="product" />
          </Link>
        </div>
        <div className="product-details">
          <Link
            to={`/product/${props.cproduct.productID}`}
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
              onClick={() => removeWishList(props.cproduct.productID)}
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
  const { user , loading } = useSelector((state) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
    {loading || !user || !user.wishlist?(<Loader/>):(

      <div className="container-fluid" id="contentHolder" >
        <div className="wishlist-card p-3">
          <div className="title">
            <h2 className="headings-for-page">Shopping Wishlist</h2>
            <span className="text-muted headings-for-page">
              Total Items : {user.wishlist.length}
            </span>
          </div>
          {user.wishlist.length!==0?
            user.wishlist.map((item,index) => (
                <div className="productswishlist" key={index}>
                  <WishlistItemCard cproduct={item} />
                </div>
            )):(
              <h5>No Items in WishList , Shop Now !!</h5>
            )}
        </div>
      </div>
    )}
    </>
  );
};

export default Wishlist;
