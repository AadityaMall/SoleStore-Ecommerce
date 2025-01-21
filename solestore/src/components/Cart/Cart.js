import React from "react";
import "../Layout/css/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cartAction";
import Loader from "../Layout/Loader";
import {toast} from "react-toastify"

const Cart = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const incrementQunatity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock < 1){
      toast.error("Stock not available")
      return;
    } 
    try {
      dispatch(addToCart(id, newQty));
    } catch (error) {
      console.log(error);
    }
  };
  const decrementQunatity = (id, quantity, stock) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    try {
      dispatch(addToCart(id, newQty));
    } catch (error) {
      console.log(error);
    }
  };
  const removeCart = (id) => {
    dispatch(removeFromCart(id));
  };
  let totalAmount = 0;
  if (user && user.cart) {
    for (let i = 0; i < user.cart.length; i++) {
      totalAmount += user.cart[i].quantity * user.cart[i].price;
    }
  }
  const navigate = useNavigate();
  const checkouthandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      {loading || !user || !user.cart ? (
        <Loader />
      ) : (
        <>
          <div className="container-fluid" id="contentHolder">
            <div className="cart-card p-3 mb-4">
              <div className="title">
                <h2 className="headings-for-page">Shopping Cart</h2>
                <span className="text-muted headings-for-page">
                  Total Items : {user.cart.length}
                </span>
              </div>
              {user.cart.length !== 0 ? (
                user.cart.map((item) => (
                  <div className="productsCart" key={item.productID}>
                    <div className="cart-item-display">
                      <div className="product-image">
                        <Link to={`/product/${item.product}`}>
                          <img src={item.image} alt="product" />
                        </Link>
                      </div>
                      <div className="product-details">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-reset"
                        >
                          <div className="cartProd-name">
                            <span className="text-muted">{item.category}</span>
                            <span className="headings-for-page">
                              {item.name}
                            </span>
                          </div>
                        </Link>
                        <div className="cartProd-price">
                          <span>₹ {item.price}</span>
                        </div>
                        <div className="cartProd-quantity">
                          <button
                            onClick={() =>
                              decrementQunatity(
                                item.productID,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            -
                          </button>
                          <input type="text" value={item.quantity} readOnly />
                          <button
                            onClick={() =>
                              incrementQunatity(
                                item.productID,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="cartProd-subTotal">
                          <span className="text-muted">Sub Total</span>
                          <span className="headings-for-page">
                            ₹ {item.quantity * item.price}
                          </span>
                        </div>
                        <div className="cartProd-remove">
                          <button
                            className="btn"
                            id="cartRemoveButton"
                            onClick={() => removeCart(item.productID)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span></span>
              )}
              {user.cart.length !== 0 ? (
                <div className="final-amount">
                  <h3>Total ₹ {totalAmount}</h3>
                  <button
                    className="btn mt-3"
                    id="checkoutButton"
                    onClick={checkouthandler}
                  >
                    Checkout
                  </button>
                </div>
              ) : (
                <div>
                  <h3>Shopping Cart Empty</h3>
                  <Link to={`/products`} className="btn">
                    Shop Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
