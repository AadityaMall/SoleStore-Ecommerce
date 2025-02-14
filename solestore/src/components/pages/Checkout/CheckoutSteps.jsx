import React from "react";
import { Stepper, Typography, StepLabel, Step } from "@mui/material";
import {
  LocalShipping,
  LibraryAddCheck,
  AccountBalance,
} from "@mui/icons-material";

const CheckoutSteps = ({ mode, activeStep }) => {
  const steps = [
    {
      label: <span className="tw:text-sm tw:font-medium">Shipping Details</span>,
      icon: <LocalShipping />,
    },
    {
      label: <span className="tw:text-sm tw:font-medium">Confirm Order</span>,
      icon: <LibraryAddCheck />,
    },
    {
      label: <span className="tw:text-sm tw:font-medium">Payment</span>,
      icon: <AccountBalance />,
    },
  ];

  return (
    <div className="tw:w-full tw:max-w-4xl tw:mx-auto tw:px-4 tw:py-8 tw:text-black tw:dark:text-white" data-theme={mode}>
      <Stepper 
        alternativeLabel 
        activeStep={activeStep}
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index}
            completed={activeStep >= index}
          >
            <StepLabel
              icon={item.icon}
              className={`
                ${activeStep >= index 
                  ? 'tw:text-primary tw:dark:text-white' 
                  : 'tw:text-gray-400 tw:dark:text-gray-600'}
              `}
            >
              <span className="tw:dark:text-white">
                {item.label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps; 