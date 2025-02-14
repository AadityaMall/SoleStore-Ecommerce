import React, { useEffect, useState } from "react";
import Shipping from "./Shipping";
import CheckoutSteps from "./CheckoutSteps";
import OrderConfirm from "./ConfirmOrder";
import FinalOrder from "./FinalOrder";
const CheckoutMain = ({mode}) => {
  const [activeStep, setActiveStep] = useState(0);
  const incrementStep = () => {
    setActiveStep(activeStep + 1);
  };
  const decrementStep = () => {
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    if(activeStep === 0){
      sessionStorage.removeItem("shippingInfo");
      sessionStorage.removeItem("orderInfo");
    }
  },[activeStep])
  React.useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "You have unsaved changes, do you really want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <CheckoutSteps activeStep={activeStep} mode={mode} />
      {activeStep === 0 && <Shipping mode={mode} incrementStep={incrementStep}/>}
      {activeStep === 1 && <OrderConfirm mode={mode} incrementStep={incrementStep} decrementStep={decrementStep}/>}
      {activeStep === 2 && <FinalOrder mode={mode} incrementStep={incrementStep} decrementStep={decrementStep}/>}
    </>
  );
};

export default CheckoutMain;
