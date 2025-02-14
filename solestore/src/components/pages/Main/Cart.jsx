import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { addToCart, removeFromCart } from "../../redux/actions/cartAction";
import { toast } from "react-toastify";
import Loader from "../../Layout/Loader";

const Cart = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);

  const incrementQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock < 1) {
      toast.error("Stock not available");
      return;
    }
    try {
      dispatch(addToCart(id, newQty));
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    try {
      dispatch(addToCart(id, newQty));
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalAmount = user?.cart?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  ) || 0;

  const checkoutHandler = () => {
    navigate("/login?redirect=checkout");
  };

  if (loading || !user || !user.cart) return <Loader />;

  return (
    <div data-theme={mode} className="">
      <div className="tw:min-h-screen tw:py-12 tw:bg-[url(/images/loginpg_bg.png)] tw:bg-cover tw:bg-center">
        <Container>
          <div className="tw:bg-white tw:dark:bg-[#343a40] tw:shadow-[0px_5px_10px_rgba(0,0,0)] tw:dark:shadow-[0px_5px_10px_rgba(255,255,255)] tw:rounded-lg tw:overflow-hidden">
            <div className="tw:p-6">
              <div className="tw:flex tw:justify-between tw:items-center tw:mb-6">
                <h2 className="tw:text-2xl tw:font-bold tw:text-gray-900 tw:dark:text-white">
                  Shopping Cart
                </h2>
                <span className="tw:text-gray-600 tw:dark:text-gray-300">
                  Total Items: {user.cart.length}
                </span>
              </div>

              {user.cart.length === 0 ? (
                <div className="tw:text-center tw:py-8">
                  <h3 className="tw:text-xl tw:text-gray-700 tw:dark:text-gray-300 tw:mb-4">
                    Shopping Cart Empty
                  </h3>
                  <Link
                    to="/products"
                    className="tw:no-underline tw:inline-block tw:px-6 tw:py-2 tw:bg-black tw:text-white tw:rounded-md tw:hover:bg-gray-800"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <>
                  <div className="tw:space-y-4">
                    {user.cart.map((item) => (
                      <div
                        key={item.productID}
                        className="tw:flex tw:flex-col tw:md:flex-row tw:items-center tw:gap-4 tw:p-4 tw:border tw:border-gray-200 tw:dark:border-gray-700 tw:rounded-lg"
                      >
                        <div className="tw:w-full tw:md:w-1/4 tw:flex tw:justify-center">
                          <Link to={`/product/${item.productID}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="tw:w-32 tw:h-32 tw:object-contain"
                            />
                          </Link>
                        </div>

                        <div className="tw:flex-1 tw:space-y-4 tw:md:space-y-0 tw:flex tw:flex-col tw:md:flex-row tw:justify-between tw:items-center">
                          <div className="tw:space-y-1 tw:text-center tw:md:text-left">
                            <span className="tw:text-sm tw:text-gray-500 tw:dark:text-gray-400">
                              {item.category}
                            </span>
                            <h3 className="tw:text-lg tw:font-medium tw:text-gray-900 tw:dark:text-white">
                              {item.name}
                            </h3>
                            <p className="tw:text-lg tw:font-semibold tw:text-gray-900 tw:dark:text-white">
                              ₹{item.price}
                            </p>
                          </div>

                          <div className="tw:flex tw:items-center tw:gap-2">
                            <button
                              onClick={() =>
                                decrementQuantity(item.productID, item.quantity)
                              }
                              className="tw:px-3 tw:py-1 tw:bg-gray-200 tw:dark:bg-gray-700 tw:rounded"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              readOnly
                              className="tw:w-16 tw:text-center tw:border-0 tw:bg-transparent tw:text-gray-900 tw:dark:text-white"
                            />
                            <button
                              onClick={() =>
                                incrementQuantity(
                                  item.productID,
                                  item.quantity,
                                  item.stock
                                )
                              }
                              className="tw:px-3 tw:py-1 tw:bg-gray-200 tw:dark:bg-gray-700 tw:rounded"
                            >
                              +
                            </button>
                          </div>

                          <div className="tw:text-center">
                            <p className="tw:text-sm tw:text-gray-500 tw:dark:text-gray-400">
                              Subtotal
                            </p>
                            <p className="tw:text-lg tw:font-semibold tw:text-gray-900 tw:dark:text-white">
                              ₹{item.quantity * item.price}
                            </p>
                          </div>

                          <button
                            onClick={() => removeCartItem(item.productID)}
                            className="tw:px-4 tw:py-2 tw:text-red-600 tw:hover:text-red-800 tw:dark:text-red-400 tw:dark:hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="tw:mt-8 tw:flex tw:flex-col tw:items-end">
                    <div className="tw:text-xl tw:font-bold tw:text-gray-900 tw:dark:text-white tw:mb-4">
                      Total: ₹{totalAmount}
                    </div>
                    <button
                      onClick={checkoutHandler}
                      className="tw:px-8 tw:py-3 tw:bg-black tw:text-white tw:rounded-md tw:hover:bg-gray-800 tw:transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Cart;
