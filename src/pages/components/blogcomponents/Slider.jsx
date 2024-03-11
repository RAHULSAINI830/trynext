"use client";
import React, { useEffect, useRef, useState } from "react";
import { initFlowbite } from "flowbite";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import MySlider from "./MySlider";
const SimpleSlider = () => {
  useEffect(() => {
    router.push("/blog");
    initFlowbite();
  }, []);
  
  const [input, setinput] = useState("");
  const handleclick = (tag) => {
    // setinput(tag.charAt(0).toLowerCase() + input.slice(1));
    setinput(tag.toLowerCase());
    // console.log(input);
    // console.log(converted)
  };
  const router = useRouter();
  const [query] = useDebounce(input, 200);
  useEffect(() => {
    if (!query) {
      router.push("/blog");
    } else if (query === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog?searchtag=${query}`);
    }
    // console.log(input)
  }, [query, router]);
  return (
    <div className="my-4">
      <div className="desktop hidden md:flex flex-wrap">
        <div className="md:w-100">
          <button
            type="button"
            onClick={() => handleclick("all")}
            data-te-ripple-init
            data-te-ripple-color="white"
            className="text-black focus:duration-500 ease-in-out focus:text-white bg-gray-100 bg-gradient-to-r focus:bg-blue-500 font-medium rounded-md text-lg px-4 py-2 text-center mr-2 mb-2"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleclick("proptech")}
            data-te-ripple-init
            data-te-ripple-color="white"
            className="text-black focus:duration-500 ease-in-out focus:text-white bg-gray-100 bg-gradient-to-r focus:bg-blue-500 font-medium rounded-md text-lg px-4 py-2 text-center mr-2 mb-2"
          >
            Proptech
          </button>
          <button
            type="button"
            onClick={() => handleclick("latest trends")}
            data-te-ripple-init
            data-te-ripple-color="white"
            className="text-black focus:duration-500 ease-in-out focus:text-white bg-gray-100 bg-gradient-to-r focus:bg-blue-500 font-medium rounded-md text-lg px-4 py-2 text-center mr-2 mb-2"
          >
            Latest Trends
          </button>
          <button
            type="button"
            onClick={() => handleclick("legal")}
            data-te-ripple-init
            data-te-ripple-color="white"
            className="text-black focus:duration-500 ease-in-out focus:text-white bg-gray-100 bg-gradient-to-r focus:bg-blue-500 font-medium rounded-md text-lg px-4 py-2 text-center mr-2 mb-2"
          >
            Legal
          </button>
          <button
            type="button"
            onClick={() => handleclick("investment")}
            data-te-ripple-init
            data-te-ripple-color="white"
            className="text-black focus:duration-500 ease-in-out focus:text-white bg-gray-100 bg-gradient-to-r focus:bg-blue-500 font-medium rounded-md text-lg px-4 py-2 text-center mr-2 mb-2"
          >
            Investment
          </button>
          <button
            type="button"
            onClick={() => handleclick("decor")}
            data-te-ripple-init
            data-te-ripple-color="white"
            className="text-black focus:duration-500 ease-in-out focus:text-white bg-gray-100 bg-gradient-to-r focus:bg-blue-500 font-medium rounded-md text-lg px-4 py-2 text-center mr-2 mb-2"
          >
            Decor
          </button>
          <button
            type="button"
            onClick={() => handleclick("nri")}
            data-te-ripple-init
            data-te-ripple-color="white"
            className="text-black focus:duration-500 ease-in-out focus:text-white bg-gray-100 bg-gradient-to-r focus:bg-blue-500 font-medium rounded-md text-lg px-4 py-2 text-center mr-2 mb-2"
          >
            NRI
          </button>
          <button
            type="button"
            onClick={() => handleclick("lifestyle")}
            data-te-ripple-init
            data-te-ripple-color="white"
            className="text-black focus:duration-500 ease-in-out focus:text-white bg-gray-100 bg-gradient-to-r focus:bg-blue-500 font-medium rounded-md text-lg px-4 py-2 text-center mr-2 mb-2"
          >
            LifeStyle
          </button>
          <button
            type="button"
            onClick={() => handleclick("regional")}
            data-te-ripple-init
            data-te-ripple-color="white"
            className="text-black focus:duration-500 ease-in-out focus:text-white bg-gray-100 bg-gradient-to-r focus:bg-blue-500 font-medium rounded-md text-lg px-4 py-2 text-center mr-2 mb-2"
          >
            Regional
          </button>
        </div>
      </div>

      <div className="md:hidden w-[100%] font-merriweather relative">
        <div className="mb-2 text-sm">
          <MySlider/>
        </div>
      </div>
    </div>
  );
};

export default SimpleSlider;
