import LoadingSpinner from "@/loadingSpinner";
import React, { useState, useEffect } from "react";
import Reachout from "../propdetailsComponents/Reachout";
import { RxCrossCircled } from "react-icons/rx";
const Reachoutlayout = ({ session, property_name, handleclosereach }) => {

  const handleClose = () => {
    handleclosereach();
  };

  const handleKeyDown = (e)=>{
    console.log(e.key)
    if (e.key == "Escape") {
        // console.log(e.target);
        handleClose();
      }
  }
  const handleOutside = (e) => {
    if (e.target.id == "overlay") {
      // console.log(e.target);
      handleClose();
    }
  };
  return (
    <div id="overlay" onKeyDown={handleKeyDown} onClick={handleOutside} className="z-[999] overscroll-none fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div onKeyDown={handleKeyDown} 
        className={` relative w-fit h-fit justify-center items-center flex flex-col  rounded py-6 px-6 lg:px-8`}
      >
          <>
            <Reachout session={session} property_name={property_name}/>
            <button
              className="bg-white rounded-full px-2 text-lg font-md"
              onClick={handleClose}
            >Close
              {/* <RxCrossCircled size={"1.5rem"} /> */}
            </button>
          </>
      </div>
    </div>
  );
};

export default Reachoutlayout;
