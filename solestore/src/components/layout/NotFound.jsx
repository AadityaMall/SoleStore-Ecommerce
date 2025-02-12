import React from "react";
const NotFound = ({ mode }) => {
  return (
    <div data-theme={mode}>
      <div
        className={`tw:bg-[url(/images/loginpg_bg.png)] tw:bg-cover tw:bg-center tw:min-h-[70vh] 
            tw:flex tw:justify-center tw:items-center`}
      >
        <div className="tw:text-center tw:bg-[rgba(255,255,255,0.7)] tw:dark:bg-[rgba(0,0,0,0.7)] tw:w-full
         tw:mt-4 tw:dark:text-white tw:p-8 tw:rounded-lg tw:shadow-lg">
          <h1 className="tw:font-brand">Page Not Found!</h1>
          <h6>Check the Url Entered </h6>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
