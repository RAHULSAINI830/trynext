import LoadingSpinner from "@/loadingSpinner";
import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
const Propertylayout = ({ img, handlecloselayout }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClose = () => {
    handlecloselayout();
  };

  useEffect(() => {
    const image = new Image();
    image.src = img;

    image.onload = () => {
      // The image is loaded, set the state to true
      setImageLoaded(true);
    };
  }, [img]);
  const handleOutside = (e) => {
    if (e.target.id == "overlay") {
      // console.log(e.target);
      handleClose();
    }
  };
  return (
    <div id="overlay" onClick={handleOutside} className="z-[999] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div
        className={`${
          imageLoaded && "h-[80vh] bg-white"
        } relative justify-center items-center flex flex-col  rounded py-6 px-6 lg:px-8`}
      >
        {!imageLoaded && <LoadingSpinner />}
        {imageLoaded && (
          <>
            <button
              className="absolute top-0 right-0 p-4"
              onClick={handleClose}
            >
              <RxCrossCircled size={"1.5rem"} />
            </button>
            <img className="h-full w-full" src={img} alt="Property" />
          </>
        )}
      </div>
    </div>
  );
};

export default Propertylayout;
