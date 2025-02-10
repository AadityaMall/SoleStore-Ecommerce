import React from "react";

const Loader = () => {
  return (
    <div className="tw:h-[90vh] tw:bg-white tw:flex tw:items-center tw:justify-center">
      <img
        src={'/images/lightmode_logo.png'}
        alt=""
        className="tw:w-[15vmax] tw:h-[15vmax] tw:border-8 tw:border-gray-500 tw:rounded-full"
        style={{ animation: 'customSpin 1600ms linear infinite' }}
      />
    </div>
  );
};

export default Loader;