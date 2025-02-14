import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteShippingInfo,
  saveShippingInfo,
  addShippingInfo,
  updateShippingInfo,
} from "../../redux/actions/cartAction";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import Loader from "../Main/Loader";
import {
  AddCircleRounded,
  Edit,
  Delete,
  Cancel,
  Person2,
  Public,
  Apartment,
  House,
  LocationOn,
  Phone,
} from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import { Row, Col, Container } from "react-bootstrap";

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
      <div className="">
        <h3 className="tw:font-brand tw:text-2xl tw:font-bold tw:pb-6">
          Shipping Details
        </h3>

        <div className="form-group mb-4 tw:relative">
          <Person2 className="tw:absolute tw:left-[5px] tw:top-[8px]"></Person2>
          <input
            autoComplete="on"
            type="text"
            className="form-control tw:py-2 tw:pl-[40px]"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mb-4 tw:relative">
          <House className="tw:absolute tw:left-[5px] tw:top-[8px]"></House>
          <input
            autoComplete="on"
            type="text"
            className="form-control tw:py-2 tw:pl-[40px]"
            placeholder="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group mb-4 tw:relative">
          <Apartment className="tw:absolute tw:left-[5px] tw:top-[8px]"></Apartment>
          <input
            autoComplete="on"
            type="text"
            className="form-control tw:py-2 tw:pl-[40px]"
            placeholder="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group mb-4 tw:relative">
          <LocationOn className="tw:absolute tw:left-[5px] tw:top-[8px]"></LocationOn>
          <input
            autoComplete="on"
            type="number"
            className="form-control tw:py-2 tw:pl-[40px]"
            placeholder="PinCode"
            value={pinCode}
            required
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>
        <div className="form-group mb-4 tw:relative">
          <Phone className="tw:absolute tw:left-[5px] tw:top-[8px]"></Phone>
          <input
            autoComplete="on"
            type="number"
            className="form-control tw:py-2 tw:pl-[40px]"
            placeholder="Number"
            required
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="form-group mb-4 tw:relative">
          <Public className="tw:absolute tw:left-[5px] tw:top-[8px]"></Public>
          <select
            value={country}
            required
            className="form-control tw:py-2 tw:pl-[40px]"
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
          <div className="form-group mb-4 tw:relative">
            <Public className="tw:absolute tw:left-[5px] tw:top-[8px]"></Public>
            <select
              value={state}
              required
              className="form-control tw:py-2 tw:pl-[40px]"
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
            className={`mb-2 ${
              state === undefined ? "disabled-true" : ""
            } tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 
                tw:border tw:border-transparent tw:rounded-md tw:shadow-sm tw:text-sm 
                tw:font-medium tw:text-white tw:bg-black tw:hover:bg-gray-800`}
            disabled={state ? false : true}
            onClick={updateShippingHandler}
          >
            Update
          </button>
        ) : (
          <button
            className={`mb-2 ${
              state === undefined ? "disabled-true" : ""
            } tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 
                tw:border tw:border-transparent tw:rounded-md tw:shadow-sm tw:text-sm 
                tw:font-medium tw:text-white tw:bg-black tw:hover:bg-gray-800`}
            disabled={state ? false : true}
            onClick={addSubmitHandler}
          >
            Add
          </button>
        )}
      </div>
    </>
  );
};

const Shipping = ({ mode, incrementStep }) => {
  const { user, loading } = useSelector((state) => state.user);
  const shippingAddress = user.shipping;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUpdateIndex(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [radioSelected, setRadioSelected] = useState(false);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pinCode, setPinCode] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [updateIndex, setUpdateIndex] = useState(null);

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
      toast.error("Phone number should be of 10 digits");
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
    incrementStep();
  };
  const openUpdateModalHandler = (value) => {
    setUpdateIndex(value);
    setOpen(true);
  };
  return (
    <>
      {loading || !shippingAddress ? (
        <Loader />
      ) : (
        <Container data-theme={mode} className="py-4">
          <Row>
            {shippingAddress.map((item, index) => (
              <Col md={4} key={index} className="">
                <div className={`tw:bg-gray-200 tw:rounded-md tw:p-2`}>
                  <input
                    type="radio"
                    name="ship"
                    id={`ship-${index}`}
                    value={index}
                    onChange={fetchRadValue}
                    className="tw:sr-only tw:peer"
                  />
                  <label
                    htmlFor={`ship-${index}`}
                    className="p-2 tw:peer-checked:bg-gray-400 tw:peer-checked:text-white 
                    tw:peer-checked:shadow-[0_15px_45px_rgba(233,233,233,0.2)] tw:peer-checked:border-2 
                    tw:peer-checked:border-black tw:peer-checked:rounded-2xl"
                  >
                    <div className="p-2">
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
                  <div className="d-flex align-items-center m-2">
                    <button
                      className="m-2 mt-0"
                      onClick={(e) => {
                        deleteShippingAddressHandler(item._id);
                      }}
                    >
                      <Delete htmlColor="red" />
                    </button>
                    <button
                      className="m-2 mt-0"
                      onClick={(e) => openUpdateModalHandler(index)}
                    >
                      <Edit />
                    </button>
                  </div>
                </div>
              </Col>
            ))}
            <Col md={4} onClick={addShippingHandler}>
              <div
                className="tw:cursor-pointer tw:border tw:border-gray-800 tw:dark:border-white tw:rounded-md tw:p-2 tw:flex tw:justify-center tw:items-center tw:size-full"
                onClick={handleOpen}
              >
                <AddCircleRounded
                  sx={{ fontSize: 80 }}
                  htmlColor={mode === "dark" ? "white" : "black"}
                />
              </div>
            </Col>
          </Row>

          {radioSelected && (
            <div className="d-flex justify-content-end mt-4 mb-3">
              <button
                className="tw:md:w-[20%] tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 
                tw:border tw:border-transparent tw:rounded-md tw:shadow-sm tw:text-sm 
                tw:font-medium tw:text-white tw:bg-black tw:hover:bg-gray-800"
                onClick={shippingSubmit}
              >
                Continue
              </button>
            </div>
          )}

          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className="tw:overflow-y-scroll tw:absolute tw:top-[50%] tw:left-[50%] 
              tw:transform tw:translate-x-[-50%] tw:translate-y-[-50%] tw:w-[400px] 
              tw:h-[70%] tw:bg-white tw:border tw:border-gray-300 tw:rounded-md tw:shadow-md tw:p-4"
              >
                <div className="tw:relative">
                  <Button
                    className="tw:absolute tw:right-[0px] tw:top-[0px]"
                    onClick={handleClose}
                  >
                    <Cancel htmlColor="red" />
                  </Button>
                  {updateIndex !== null ? (
                    <ShippingDetailsComponent
                      shippingInfo={shippingAddress[updateIndex]}
                    />
                  ) : (
                    <ShippingDetailsComponent />
                  )}
                </div>
              </Box>
            </Modal>
          </div>
        </Container>
      )}
    </>
  );
};

export default Shipping;
