"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
const MySlider = () => {
  const sliderRef = useRef(0);
  const [input, setinput] = useState("");
  const handleclick = (tag) => {
    // setinput(tag.charAt(0).toLowerCase() + input.slice(1));
    setinput(tag.toLowerCase());
    // console.log(input);
    // console.log(converted)
  };
  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
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
  const settings = {
    // focusOnSelect: true,
    infinite: false,

    speed: 500,
    // dots: true,
    slidesToShow: 8,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
          infinite: true,
          initialSlide: 0,
          // dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <div className="font-merriweather">
      <Slider className="px-4" ref={sliderRef} {...settings}>
        <button
          key={1}
          onClick={() => handleclick("all")}
          className="m-0 p-1 text-center border-b-2 border-white focus:text-blue-500 focus:border-b-blue-500 px-1 hover:text-blue-500"
        >
          All
        </button>

        <button
          key={2}
          onClick={() => handleclick("proptech")}
          className="m-0 p-1 text-center border-b-2 border-white focus:text-blue-500 focus:border-b-blue-500 px-1 hover:text-blue-500"
        >
          Proptech
        </button>
        <button
          key={3}
          onClick={() => handleclick("latest trends")}
          className="latesttrends m-0 p-1 text-center border-b-2 border-white focus:text-blue-500 focus:border-b-blue-500 px-1 hover:text-blue-500"
        >
          LatestTrends
        </button>
        <button
          key={4}
          onClick={() => handleclick("legal")}
          className="m-0 p-1 text-center border-b-2 border-white focus:text-blue-500 focus:border-b-blue-500 px-1 hover:text-blue-500"
        >
          Legal
        </button>
        <button
          key={5}
          onClick={() => handleclick("investment")}
          className="m-0 py-1 pr-[1.5px] text-center border-b-2 border-white focus:text-blue-500 focus:border-b-blue-500 hover:text-blue-500"
        >
          Investment
        </button>
        <button
          key={5}
          onClick={() => handleclick("lifestyle")}
          className="m-0 py-1 pr-[1.5px] text-center border-b-2 border-white focus:text-blue-500 focus:border-b-blue-500 hover:text-blue-500"
        >
          LifeStyle
        </button>
        <button
          key={6}
          onClick={() => handleclick("decor")}
          className="m-0 p-1 text-center border-b-2 border-white focus:text-blue-500 focus:border-b-blue-500 hover:text-blue-500"
        >
          Decor
        </button>
        <button
          key={6}
          onClick={() => handleclick("nri")}
          className="m-0 p-1 text-center border-b-2 border-white focus:text-blue-500 focus:border-b-blue-500 hover:text-blue-500"
        >
          NRI
        </button>
        <button
          key={7}
          onClick={() => handleclick("regional")}
          className="m-0 p-1 text-center border-b-2 border-white focus:text-blue-500 focus:border-b-blue-500 px-1 hover:text-blue-500"
        >
          Regional
        </button>
      </Slider>
      <button
        className="md:hidden pt-1 absolute left-0 top-[2px]"
        onClick={previous}
      >
        <img
          width="16"
          height="16"
          src="https://img.icons8.com/ios/50/less-than.png"
          alt="less-than"
        />
        {/* <img width="35" height="35" src="https://img.icons8.com/carbon-copy/100/back.png" alt="back"/> */}
      </button>
      <button
        className="md:hidden p-1 absolute right-0 top-[2px]"
        onClick={next}
      >
        <img
          width="16"
          height="16"
          src="https://img.icons8.com/ios/50/more-than.png"
          alt="less-than"
        />
        {/* <img width="35" height="35" src="https://img.icons8.com/carbon-copy/100/more-than.png" alt="more-than"/> */}
      </button>
    </div>
  );
};

export default MySlider;
