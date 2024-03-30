import React from "react";
import { useEffect } from "react";
import "../Layout/css/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cartAction";

const CartItemCard = (props) => {
  const dispatch = useDispatch();

  const incrementQunatity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
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

  return (
    <>
      <div className="cart-item-display">
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
            <div className="cartProd-name">
              <span className="text-muted">{props.cproduct.category}</span>
              <span className="headings-for-page">{props.cproduct.name}</span>
            </div>
          </Link>
          <div className="cartProd-price">
            <span>₹ {props.cproduct.price}</span>
          </div>
          <div className="cartProd-quantity">
            <button
              onClick={() =>
                decrementQunatity(
                  props.cproduct.product,
                  props.cproduct.quantity,
                  props.cproduct.stock
                )
              }
            >
              -
            </button>
            <input type="text" value={props.cproduct.quantity} readOnly />
            <button
              onClick={() =>
                incrementQunatity(
                  props.cproduct.product,
                  props.cproduct.quantity,
                  props.cproduct.stock
                )
              }
            >
              +
            </button>
          </div>
          <div className="cartProd-subTotal">
            <span className="text-muted">Sub Total</span>
            <span className="headings-for-page">
              ₹ {props.cproduct.quantity * props.cproduct.price}
            </span>
          </div>
          <div className="cartProd-remove">
            <button
              className="btn"
              id="cartRemoveButton"
              onClick={() => removeCart(props.cproduct.product)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  let totalAmount = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalAmount += cartItems[i].quantity * cartItems[i].price;
  }
  const navigate = useNavigate();
  const checkouthandler = () => {
    navigate("/login?redirect=shipping");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <div className="container-fluid" id="contentHolder">
        <div className="cart-card p-3">
          <div className="title">
            <h2 className="headings-for-page">Shopping Cart</h2>
            <span className="text-muted headings-for-page">
              Total Items : {cartItems.length}
            </span>
          </div>
          {cartItems !== 0
            ? cartItems.map((item) => (
                <>
                  <div className="productsCart" key={item.product}>
                    <CartItemCard cproduct={item} />
                  </div>
                </>
              ))
            : {}}
          {cartItems!==0 && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
