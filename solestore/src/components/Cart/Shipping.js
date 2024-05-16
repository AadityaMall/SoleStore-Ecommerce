import React, { useEffect, useState } from "react";
import "../Layout/css/Shipping.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteShippingInfo,
  saveShippingInfo,
  addShippingInfo,
  updateShippingInfo,
} from "../../actions/cartAction";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
import Loader from "../Layout/Loader";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

const ShippingDetailsComponent = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(
    props.shippingInfo ? props.shippingInfo.name : undefined
  );
  const [address, setAddress] = useState(
    props.shippingInfo ? props.shippingInfo.address : undefined
  );
  const [city, setCity] = useState(
    props.shippingInfo ? props.shippingInfo.city : undefined
  );
  const [state, setState] = useState(
    props.shippingInfo ? props.shippingInfo.state : undefined
  );
  const [country, setCountry] = useState(
    props.shippingInfo ? props.shippingInfo.country : undefined
  );
  const [pinCode, setPinCode] = useState(
    props.shippingInfo ? props.shippingInfo.zipcode : undefined
  );
  const [phoneNo, setPhoneNo] = useState(
    props.shippingInfo ? props.shippingInfo.phone : undefined
  );

  const addSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      address: address,
      city: city,
      state: state,
      country: country,
      zipcode: pinCode,
      phone: phoneNo,
    };
    dispatch(addShippingInfo(data));
  };
  const updateShippingHandler = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      address: address,
      city: city,
      state: state,
      country: country,
      zipcode: pinCode,
      phone: phoneNo,
      shippingAddressId: props.shippingInfo._id,
    };
    dispatch(updateShippingInfo(data));
  };
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };
    handleScrollToTop(); // Scroll to top when component mounts
  }, []); // Empty dependency array to run once on component mount

  return (
    <>
      <div className="shippingDetails-card-outer">
        <div className="shippingDetails-card">
          <h3 className="headings-for-page">Shipping Details</h3>

          <div className="form-group mb-4">
            <i className="fa fa-user"></i>
            <input
              autoComplete="on"
              type="text"
              className="form-control shippingUser-input"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              <option value=" ">Country</option>
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
                <option value=" ">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {props.shippingInfo ? (
            <button
              className={`btn btn-block mb-2 ${
                state === undefined ? "disabled-true" : ""
              }`}
              disabled={state ? false : true}
              onClick={updateShippingHandler}
            >
              Update
            </button>
          ) : (
            <button
              className={`btn btn-block mb-2 ${
                state === undefined ? "disabled-true" : ""
              }`}
              disabled={state ? false : true}
              onClick={addSubmitHandler}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const Shipping = ({ mode }) => {
  const { user, loading } = useSelector((state) => state.user);
  const shippingAddress = user.shipping;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setupdateModalOpen] = useState(false);
  if (addModalOpen || updateModalOpen) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }
  const [radioSelected, setRadioSelected] = useState(false);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pinCode, setPinCode] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [updateIndex, setUpdateIndex] = useState();

  function fetchRadValue() {
    var ele = document.getElementsByName("ship");
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        setRadioSelected(true);
        setName(shippingAddress[ele[i].value].name);
        setAddress(shippingAddress[ele[i].value].address);
        setCity(shippingAddress[ele[i].value].city);
        setState(shippingAddress[ele[i].value].state);
        setCountry(shippingAddress[ele[i].value].country);
        setPinCode(shippingAddress[ele[i].value].zipcode);
        setPhoneNo(`${shippingAddress[ele[i].value].phone}`);
        break;
      }
    }
  }
  useEffect(() => {
    if (user.cart.length === 0) {
      navigate("/cart");
    }
  });
  const deleteShippingAddressHandler = (id) => {
    dispatch(deleteShippingInfo(id));
  };
  const addShippingHandler = () => {
    window.scrollTo(0, 0);
    setAddModalOpen(true);
  };
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      alert.error("Phone number should be of 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({
        name,
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );
    navigate("/order/confirm");
  };
  const openUpdateModalHandler = (value) => {
    setUpdateIndex(value);
    setupdateModalOpen(true);
  };
  return (
    <>
      <div className="steps mb-3">
        <CheckoutSteps activeStep={0} mode={mode} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="display-shiiping-small-cards d-flex flex-wrap justify-content-center">
            {shippingAddress.map((item, index) => (
              <div key={index} className="mainShipSmallDiv m-2">
                <input
                  type="radio"
                  name="ship"
                  id={`ship-${index}`}
                  value={index}
                  onChange={fetchRadValue}
                />
                <label htmlFor={`ship-${index}`} className="p-2">
                  <div className="shippingBox p-2">
                    <div className="d-flex">
                      <h6>
                        <i className="fa fa-user"></i> :
                      </h6>
                      <span style={{ marginLeft: 10 }}> {item.name}</span>
                    </div>
                    <div className="d-flex">
                      <h6>
                        <i className="fa fa-phone"></i> :{" "}
                      </h6>
                      <span style={{ marginLeft: 10 }}> {item.phone}</span>
                    </div>
                    <h6 className="mt-2">Address : </h6>
                    <span>
                      {item.address +
                        ", " +
                        item.city +
                        ", " +
                        item.state +
                        ", " +
                        item.country +
                        ", " +
                        item.zipcode}
                    </span>
                  </div>
                </label>
                <div className="action-div d-flex align-items-center m-2">
                  <button
                    className="m-2 mt-0"
                    onClick={(e) => {
                      deleteShippingAddressHandler(item._id);
                    }}
                  >
                    <DeleteIcon htmlColor="red" />
                  </button>
                  <button
                    className="m-2 mt-0"
                    onClick={(e) => openUpdateModalHandler(index)}
                  >
                    <EditIcon />
                  </button>
                </div>
              </div>
            ))}
            <div
              className="shippingBox-addItem m-2 p-4 d-flex align-items-center justify-content-center"
              onClick={addShippingHandler}
            >
              <div className="">
                <AddCircleRoundedIcon sx={{ fontSize: 80 }} />
              </div>
            </div>
          </div>
          {radioSelected && (
            <div className="d-flex justify-content-center mt-4 mb-3">
              <button className="btn" onClick={shippingSubmit}>Continue</button>
            </div>
          )}
          <div
            className={`ComponentFillSection ${
              addModalOpen ? "d-block" : "d-none"
            }`}
          >
            <div
              className="closeWindowButton"
              onClick={(e) => setAddModalOpen(false)}
            >
              <CancelIcon />
            </div>
            <div className="d-flex justify-content-center">
              {<ShippingDetailsComponent />}
            </div>
          </div>
          {updateModalOpen && (
            <div
              className={`ComponentFillSection
            }`}
            >
              <div
                className="closeWindowButton"
                onClick={(e) => setupdateModalOpen(false)}
              >
                <CancelIcon />
              </div>
              <div className="d-flex justify-content-center">
                {
                  <ShippingDetailsComponent
                    shippingInfo={shippingAddress[updateIndex]}
                  />
                }
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Shipping;
