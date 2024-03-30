import React from "react";
import "../Layout/css/Shipping.css";
import { Stepper, Typography, StepLabel, Step } from "@mui/material";
import {
  LocalShipping,
  LibraryAddCheck,
  AccountBalance,
} from "@mui/icons-material";
const CheckoutSteps = ({ mode, activeStep }) => {
  const labelStyle = {
    color: mode === "light" ? "black" : "white",
  };

  const materialColorNotActive =
    mode === "light" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)";
  const materialColorActive = mode === "light" ? "black" : "white";
  const steps = [
    {
      label: <Typography style={labelStyle}>Shipping Details</Typography>,
      icon: <LocalShipping />,
    },
    {
      label: <Typography style={labelStyle}>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
    },
    {
      label: <Typography style={labelStyle}>Payment</Typography>,
      icon: <AccountBalance />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
    color: mode === "light" ? "black" : "white",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color:
                  activeStep >= index
                    ? materialColorActive
                    : materialColorNotActive,
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
