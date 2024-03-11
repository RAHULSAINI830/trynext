import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import Card from "./card";


export default function Cardslider({data}){
  // console.log(data);
  // console.log(typeof data);
  // const {data} = data;
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
    infinite: true,
    slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    prevArrow: <div style={{ display: "none" }}></div>, // Hide default previous arrow
        nextArrow: <div style={{ display: "none" }}></div>,
    speed: 500,
    // dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
          // dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 0,
        },
      },
    ],
  };
  // console.log(data.data)
  return (
    <div className="font-roboto relative overflow-hidden">
    <div onClick={previous} className="absolute left-0 top-1/2 z-20 transform -translate-y-1/2 w-12 h-12 hover:bg-gray-500 rounded-full bg-gray-200 ">
    <button
      className=" pt-10 absolute left-3 transform -translate-y-1/2 z-20 top-[5px]"

    >
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/ios/50/less-than.png"
        alt="less-than"
      />
      </button>
      </div>


      <Slider className="ml-4 " ref={sliderRef} {...settings}>
      {data &&
        data
          .map((post, index) => (
            <Card
              key={index}
              id={post.id}
              title={post.title}
              content={post.content}
              shortname={post.shortname}
              date={post.date}
              name={post.name}
              tags={post.tags}
              image={post.image}
              category={post.category}
              type="slider"
            />
          ))}
      </Slider>
        {/* <img width="35" height="35" src="https://img.icons8.com/carbon-copy/100/back.png" alt="back"/> */}
      <div onClick={next} className="absolute right-2 md:right-16 top-1/2 z-10 transform -translate-y-1/2 w-12 h-12 hover:bg-gray-500 rounded-full bg-gray-200  ">
      <button
        className=" pt-10 absolute right-3.5 z-20 transform -translate-y-1/2 top-[5px]"

      >
        <img
          width="20"
          height="20"
          src="https://img.icons8.com/ios/50/more-than.png"
          alt="less-than"
        />
        {/* <img width="35" height="35" src="https://img.icons8.com/carbon-copy/100/more-than.png" alt="more-than"/> */}
      </button>
      </div>
    </div>
  );
};

// export default Cardslider;
