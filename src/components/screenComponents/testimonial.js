import React, { useRef } from "react";

export const testimonials = [
  {
    img: "",
    name: "Devendra Jain, Gurgaon",
    profession: "Home Buyer",
    testimonial:
      "I discovered a property that perfectly matched my lifestyle and preferences. The platform’s quiz and geniune listings saved me time and frustration. Truly a game-changer in the real estate market!",
  },
  {
    img: "",
    name: "Ravi Goel, Gurgaon",
    profession: "Home Buyer",
    testimonial:
      "The personalized recommendations and transparent information made my search effortless. And the best part is that they do not ask for your phone number and spam you like other platforms. Highly recommended!",
  },
  {
    img: "",
    name: "Vikas, Gurgaon",
    profession: "Real Estate Developer",
    testimonial:
      "This platform connected me with genuine buyers who appreciated the quality and value of our projects. It significantly boosted our sales and brand reputation in the market!",
  },
];
/**
 * Related to the React Slick
 */
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

/**
 * Related to the React Icons
 */
import {
  FaQuoteLeft,
  FaArrowAltCircleLeft,
  FaQuoteRight,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

/**
 * Custom Components
 */
import CenterAligner from "./CenterAligner";

const Testimonial = () => {
  const sliderRef = useRef();
  /**
   * Settings Related to the React Slick
   */
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <CenterAligner className="bg-gradient-to-tr from-[#1D4ED8] to-[#8C52FF]  px-5 py-5">
      <h1 className="text-center text-2xl sm:text-4xl font-bold pb-8 text-white">
        Hear it from our happy homeowners
      </h1>
      {/* Container for the Slider */}
      <section className="max-w-[800px] mx-auto w-full rounded-xl relative overflow-hidden">
        {/* Main Section */}
        <Slider {...settings} ref={sliderRef}>
          {testimonials.map((single, index) => {
            return (
              <div key={index} className="h-full">
                <section className="mx-auto grid grid-cols-1  items-center  overflow-hidden bg-blue-500 relative">
                  <div className=" bg-white m-0 p-0 rounded-lg">
                    <div className="p-5 sm:p-10 text-[16px] sm:text-[18px] space-y-3">
                      {/* Testimonial */}
                      <div className="text-blue-700 text-[15px]">
                        <FaQuoteLeft />
                      </div>
                      <p className="leading-[30px] font-medium">
                        {single.testimonial}
                      </p>
                      <div className="text-blue-700 text-[15px]">
                        <FaQuoteRight className="ml-auto" />
                      </div>
                      <div className="flex justify-center">
                        <div className="text-center">
                          <h2 className="text-xl font-medium">{single.name}</h2>
                          <p className="text-gray-600">{single.profession}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="relative -top-1 h-10 bg-white  m-0 p-0 clip-testimonial"></div> */}
                </section>
              </div>
            );
          })}
        </Slider>

        {/* Custom Buttons */}
        <div className=" my-3 ml-5 flex justify-center pr-5">
          <button
            className="text-2xl  text-blue-700"
            onClick={() => sliderRef?.current?.slickPrev()}
          >
            {/* <FaArrowAltCircleLeft size={"2.5rem"} /> */}
          </button>
          <button
            className=" text-2xl text-blue-700"
            onClick={() => sliderRef?.current?.slickNext()}
          >
            {/* <FaArrowAltCircleRight size={"2.5rem"}/> */}
          </button>
        </div>
      </section>
    </CenterAligner>
  );
};
export default Testimonial;
