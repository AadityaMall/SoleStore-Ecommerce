import React, { useEffect, useState } from "react";
import "../Layout/css/Shipping.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
const Shipping = ({ mode }) => {
const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo , cartItems} = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  useEffect(() => {
    if(cartItems.length===0){
        navigate("/cart")
    }
  })
  
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      alert.error("Phone number should be of 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    <>
    <div className="steps mb-3">
      <CheckoutSteps activeStep={0} mode={mode} />
    </div>
      <div className="shippingDetails-card">
        <h3 className="headings-for-page">Shipping Details</h3>
        <form action="#" method="post" onSubmit={shippingSubmit}>
          <div className="form-group mb-4">
            <i className="fa fa-home"></i>
            <input
              autoComplete="on"
              type="text"
              className="form-control shippingUser-input"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <i className="fa fa-building"></i>
            <input
              autoComplete="on"
              type="text"
              className="form-control shippingUser-input"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <i className="fa fa-map-marker"></i>
            <input
              autoComplete="on"
              type="number"
              className="form-control shippingUser-input"
              placeholder="PinCode"
              value={pinCode}
              required
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <i className="fa fa-phone"></i>
            <input
              autoComplete="on"
              type="number"
              className="form-control shippingUser-input"
              placeholder="Number"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <i className="fa fa-globe"></i>
            <select
              value={country}
              required
              className="form-control selctInput_Shipping"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value=" ">
                Country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {country && (
            <div className="form-group mb-4">
              <i className="fa fa-globe"></i>
              <select
                value={state}
                required
                className="form-control selctInput_Shipping"
                onChange={(e) => setState(e.target.value)}
              >
                <option value=" " >
                  State
                </option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <input
            type="submit"
            value="Continue"
            className="btn btn-block"
            disabled={state ? false : true}
          />
        </form>
      </div>
    </>
  );
};

export default Shipping;
