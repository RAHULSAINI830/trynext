import { ImLocation } from "react-icons/im";
import React, { useState } from "react";
import Text from "../../components/carouselComponents/text";
import Photo from "../../components/carouselComponents/photo";
import { baseurl } from "../../../public/url";
import { useRouter } from "next/router";
import {
  BsFillHouseFill,
  BsCarFrontFill,
  BsStarFill,
  BsFillEnvelopeFill,
  BsShareFill,
  BsHeart,
  BsLink,
} from "react-icons/bs";
import NextNProgress from "nextjs-progressbar";
import { IoIosArrowForward } from "react-icons/io";
import { CgGames } from "react-icons/cg";
import { IoRestaurantSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { VscBellDot } from "react-icons/vsc";
import { BiPowerOff } from "react-icons/bi";
import { PiLockKeyOpenFill } from "react-icons/pi";
import { GiVacuumCleaner, GiTreeSwing, GiPartyPopper } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";
import {
  FaDumbbell,
  FaSwimmer,
  FaGasPump,
  FaHome,
  FaShare,
} from "react-icons/fa";
import Footer from "@/components/footer";
import {
  MdOutlineContactPage,
  MdElevator,
  MdSportsHandball,
} from "react-icons/md";
import Aibuddy from "../../svgComponents/aibuddy";
import Arrow from "../../svgComponents/arrow";
import Sparkles from "../../components/screenComponents/sparkles";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navbar";
import MapContainer from "../../components/map/mapContainer";
import copy from "clipboard-copy";
import { getSession, useSession } from "next-auth/react";
import InterestForm from "../../components/propdetailsComponents/sendInterest.js";
import ShareOptions from "../../components/propdetailsComponents/shareProperty.js";
import Reachout from "../../components/propdetailsComponents/Reachout";
import Propertylayout from "../../components/propdetailsComponents/propertylayout";
import Head from "next/head";
export async function getServerSideProps(context) {
  const name = context.query.name || "";
  const originalName = name.replace(/-/g, " ");
  const match = context.query.match || "";
  try {
    const session = await getSession(context);
    const { data, nearBy } = await fetchData(originalName);

    return {
      props: {
        data,
        match,
        name,
        nearBy,
        session,
      },
    };
  } catch (error) {
    console.error("Error at :", error);
    return {
      props: {
        data: null,
        match: null,
        name: null,
        nearBy: null,
        session: null,
      },
    };
  }
}

async function fetchData(name) {
  try {
    const response = await fetch(`${baseurl}/api/property?name=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data, nearBy } = await response.json();

    if (response.ok) {
      return { data, nearBy };
    } else {
      throw new Error(`Error: ${data?.message || "Failed to fetch data"}`);
    }
  } catch (error) {
    console.error("Error at fetchData:", error);
    throw error;
  }
}

function extractSizeFromName(name) {
  // Regular expression to match numbers followed by 'Sq. Ft.' in the name
  const regex = /(\d+)\s*Sq\. Ft\./;
  const match = name.match(regex);
  console.log("in extract carpet", match);
  // If a match is found, return the matched size, otherwise return an empty string
  return match ? match[1] : "";
}

const Property = ({ data, match, nearBy, name, session }) => {
  const imageUrls = [];

  // Add thumbnail image
  if (data?.thumbnail) {
    imageUrls.push(data.thumbnail);
  }
  // Add 2bhk images
  if (data && data["2bhk"] && Array.isArray(data["2bhk"])) {
    imageUrls.push(...data["2bhk"]);
  }

  // Add 3bhk images
  if (data && data["3bhk"] && Array.isArray(data["3bhk"])) {
    imageUrls.push(...data["3bhk"]);
  }

  // Add 4bhk images
  if (data && data["4bhk"] && Array.isArray(data["4bhk"])) {
    imageUrls.push(...data["4bhk"]);
  }
  const projectLink = `${baseurl}/propertydetails/${name}`;
  const [isExpanded, setIsExpanded] = useState(false);
  const text = data?.description;
  const newImages = data?.images.map((original) => {
    const modifiedOriginal = original.replace(
      "/upload/",
      "/upload/"
      // "/upload/c_scale,h_300,w_600/"
    );
    const modifiedThumbnail = original.replace(
      "/upload/",
      "/upload/"
      // "/upload/c_scale,h_150,w_250/"
    );

    return {
      original: modifiedOriginal,
      thumbnail: modifiedThumbnail,
    };
  });
  const bhkImages = imageUrls.map((original) => {
    const modifiedOriginal = original.replace(
      "/upload/",
      "/upload/"
      // "/upload/c_scale,h_300,w_600/"
    );
    const modifiedThumbnail = original.replace(
      "/upload/",
      "/upload/",
      // "/upload/c_scale,h_150,w_250/"
    );

    return {
      original: modifiedOriginal,
      thumbnail: modifiedThumbnail,
    };
  });
  const maxChars = 600;
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const exactLocation = `${data?.property_name}, ${data?.location}`;
  const trimmedText = isExpanded ? text : text?.slice(0, maxChars);
  const specificContent = {
    "Advanced Stage Construction": "Under Construction",
    "Early Stage Construction": "Under Construction",
    "Mid Stage Construction": "Under Construction",
    "Well Occupied": "Ready To Move",
  };
  const handleCopy = async () => {
    try {
      await copy(projectLink);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000); // Show the message for 2 seconds (2000 milliseconds)
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  async function handlecloselayout() {
    sethandleCloseLayout(false);
  }
  const [showProp, setShowProp] = useState("All");
  const [showSpec, setShowSpec] = useState("All");
  const [isCopied, setIsCopied] = useState(false);

  const [showInterestForm, setShowInterestForm] = useState(false);
  const [handleCloseLayout, sethandleCloseLayout] = useState(false);
  // console.log(nearBy)
  async function handleInterestSubmit() {
    const prop = data?.property_name;
    if (session) {
      const userName = session?.user?.name;
      const userEmail = session?.user?.email;
      const userPhone = session?.user?.phone;
      const userText = session?.user?.text;
      try {
        const response = await fetch(`/api/sendInterest`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the appropriate content type
          },
          body: JSON.stringify({
            userName,
            userEmail,
            userPhone,
            userText,
            prop,
          }),
        });
        if (response.ok) {
          alert("Interest sent !");
        } else {
          const errordata = await response.json();
          alert(errordata.error);
        }
      } catch (error) {
        console.error("Error submitting interest:", error);
        alert("An error occurred ");
      }
    } else {
      setShowInterestForm(true);
    }
  }
  async function handleInterestFormSubmit(formdata) {
    const prop = data?.property_name;
    const userName = formdata.name;
    const userEmail = formdata.email;
    const userPhone = formdata.phone;
    const userText = formdata.text;
    // console.log(userName, userEmail, userPhone, userText, prop)
    try {
      const response = await fetch(`/api/sendInterest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
        },
        body: JSON.stringify({
          userName,
          userEmail,
          userPhone,
          userText,
          prop,
        }),
      });
      if (response.ok) {
        setShowInterestForm(false);
        alert("Interest sent !");
      } else {
        const errordata = await response.json();
        alert(errordata.error);
        setShowInterestForm(false);
      }
    } catch (error) {
      console.error("Error submitting interest:", error);
      alert("An error occurred ");
    }
  }
  async function handleCloseInterestForm() {
    setShowInterestForm(false);
  }
  const [img, setimg] = useState("");
  const handleClose = (img, close) => {
    setimg(img);
    sethandleCloseLayout(close);
  };
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [unitCount, landSize] = data?.propertysize || [];

  const router = useRouter();
  const handleBrowseSmartCollections = () => {
    router.push({
      pathname: "./Filter&Sort/FilterSearch",
      query: { tags: selectedTag },
    });
  };

  const [inputValue, setInputValue] = useState("");
  const handleBrowseGpt = () => {
    router.push({
      pathname: `${baseurl}/gpt/ask`,
      query: { firstasksting: inputValue, propname: data?.property_name },
    });
  };
  const handleStringSearchGpt = (string) => {
    router.push({
      pathname: `${baseurl}/gpt/ask`,
      query: { firstasksting: string, propname: data?.property_name },
    });
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div id="overview" className="bg-white font-roboto ">
      <Head>
        <link rel="icon" href="customlogo-removebg-preview.png" />
      </Head>
      <NextNProgress color="#4f6df3" height={5} />
      <Navbar />
      <div className="pt-4 pl-3 md:px-12 lg:px-24">
        <div className="flex justify-normal">
          <Link href="/">
            <FaHome className="m-1 pb-0.5" />
          </Link>
          <IoIosArrowForward className="m-1 pb-0.5" />
          <Link
            href="/Filter&Sort/FilterSearch"
            className="text-sm font-medium mt-[0.05rem]"
          >
            Property Details
          </Link>
          <IoIosArrowForward className="m-1 pb-0.5" />
          <span className="text-sm text-blue-500 font-medium mt-[0.05rem]">
            {data?.property_name}
          </span>
        </div>
      </div>
      <div className=" py-4 pt-6 md:px-12 lg:px-24">
        <Photo image={data?.image} images={newImages} bhkImages={bhkImages} />
      </div>
      <div className="sticky z-20 top-2">
        <div className="flex font-roboto px-3 md:px-12 lg:px-24 relative xl:justify-center my-2 rounded-lg mb-4 hide-scroll-bar ">
          <div className="p-1 navigationsproperty rounded-lg w-full scrollbar border overflow-auto whitespace-nowrap bg-[#F2F5FC]">
            <div className="inline-block pr-3 rounded-xl">
              <Link
                href={"#overview"}
                className="flex text-sm sm:text-base p-2 sm:p-4 sm:py-2 justify-center h-full focus:bg-blue-500 focus:text-white font-semibold  w-full overflow-hidden rounded-lg focus:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="text-center">Overview</div>
              </Link>
            </div>
            <div className="inline-block  pr-3 rounded-xl">
              <Link
                href={"#aboutproject"}
                className="flex w-28 sm:w-36 justify-center text-sm sm:text-base p-2 sm:p-4 sm:py-2 h-full focus:bg-blue-500 focus:text-white font-semibold  overflow-hidden rounded-lg focus:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="text-center">About Project</div>
              </Link>
            </div>
            <div className="inline-block  pr-3 rounded-xl">
              <Link
                href={"#amenities"}
                className="flex justify-center text-sm sm:text-base p-2 sm:p-4 sm:py-2 h-full focus:bg-blue-500 focus:text-white font-semibold  w-full overflow-hidden rounded-lg focus:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="text-center">Amenities</div>
              </Link>
            </div>
            <div className="inline-block pr-3 rounded-xl">
              <Link
                href={"#specifications"}
                className="flex justify-center text-sm sm:text-base p-2 sm:p-4 sm:py-2 h-full focus:bg-blue-500 focus:text-white font-semibold  w-full overflow-hidden rounded-lg focus:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="text-center">Specifications</div>
              </Link>
            </div>
            <div className="inline-block pr-3 rounded-xl">
              <Link
                href={"#location"}
                className="flex justify-center text-sm sm:text-base p-2 sm:p-4 sm:py-2 h-full focus:bg-blue-500 focus:text-white font-semibold  w-full overflow-hidden rounded-lg focus:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="text-center">Location</div>
              </Link>
            </div>
            <div className="inline-block  pr-3 rounded-xl">
              <Link
                href={"#aboutdeveloper"}
                className="flex w-32 sm:w-40 justify-center text-sm sm:text-base p-2 sm:p-4 sm:py-2 h-full focus:bg-blue-500 focus:text-white font-semibold overflow-hidden rounded-lg focus:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="text-center">About Developer</div>
              </Link>
            </div>
            <div className="inline-block pr-3 rounded-xl">
              <Link
                href={"#ai"}
                className="flex w-40 sm:w-48 justify-center text-sm sm:text-base p-2 sm:p-4 sm:py-2 h-full focus:bg-blue-500 focus:text-white font-semibold overflow-hidden rounded-lg focus:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="text-center">AI Realtor Buddy</div>
              </Link>
            </div>
            <div className="inline-block  pr-3 rounded-xl">
              <Link
                href={"#reachout"}
                className="flex w-32 sm:w-40 justify-center text-sm sm:text-base p-2 sm:p-4 sm:py-2 h-full focus:bg-blue-500 focus:text-white font-semibold overflow-hidden rounded-lg focus:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="text-center">Reach Out to Us</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden pb-3 font-roboto pl-7 md:pl-12 lg:pl-24 gap-3">
        <div className="flex border-2 text-sm sm:text-base rounded-lg px-2 font-thin border-green-400 bg-green-100">
          <svg
            className="mt-1 sm:mt-[0.45rem] mr-2"
            width="13"
            height="11"
            viewBox="0 0 13 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.44444L4.66667 9L12 1"
              stroke="#4CAF50"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <span className="font-[400]">
            {specificContent[data?.status] || data?.status}
          </span>
        </div>
        {match && match !== "NaN" ? (
          <div className="flex border-2 text-sm sm:text-base rounded-lg px-2 font-thin border-green-400 bg-green-100">
            <svg
              className="mt-1  sm:mt-[0.45rem] mr-2"
              width="13"
              height="11"
              viewBox="0 0 13 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.44444L4.66667 9L12 1"
                stroke="#4CAF50"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <span className="font-[400] ">{match}% Match</span>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="grid font-roboto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3 md:px-12 lg:px-24">
        <div className="header sm:col-span-1 md:col-span-2 lg:col-span-3 px-4 py-2">
          <div className="text-2xl mb-2 lg:text-3xl font-bold">
            {data?.property_name}
          </div>
          <div className="text-slate-500 mb-2 text-sm">
            By {data?.builder_details?.name}
          </div>
          <div className="text-sm pt-1 text-slate-500 mb-2">
            <span>
              <ImLocation className="inline mr-1 mb-1" size={"1rem"} />
            </span>
            <span className="mr-5">
              {data?.city}
              {"   "}
            </span>{" "}
            <span>{data?.configuration}</span>
          </div>
          <div className="texl-xl mb-2 md:text-2xl font-semibold">
            {/* ₹ {data?.price_range} */}
            {data?.price_range == "Price on request"
              ? data?.price_range
              : "INR " + data?.price_range}
          </div>
          {(data?.airpot_distance < 15 ||
            parseFloat(data?.metro_distance.dist) < 10 ||
            parseFloat(data?.school.rate) > 4) && (
            <div className="mb-1 flex">
              <span className="font-semibold mr-2">Highlights: </span>
              <div className="sm:flex">
                {[...new Set(data?.tags)].slice(0, 4).map((tag, i) => {
                  return (
                    <div
                      key={i}
                      className="mr-2 inline-block font-semibold text-blue-500"
                    >
                      #{tag}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="font-roboto sm:col-span-1 p-3">
          <div className="grid grid-cols-1">
            <div className="w-full mb-3">
              <button
                className="w-full "
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <div className="w-full flex justify-center  bg-blue-500 text-sm rounded-lg text-white p-2 gap-2">
                  <FaShare size={"1.3rem"} />
                  <span>Share Listings</span>
                </div>
                {showShareOptions && (
                  <ShareOptions
                    url={projectLink}
                    handleClose={() => {
                      setShowShareOptions(false);
                    }}
                  />
                )}
              </button>
            </div>
          </div>
          <div className="mt-2 shadow-2xl bg-white rounded-xl py-4 ">
            <div className="flex justify-center">
              <div className="font-semibold text-xl">Get Best Deals</div>
            </div>
            <div className="flex justify-center">
              <div className="text-md text-center py-2 font-semibold px-auto">
                Send interest to get best deals.
              </div>
            </div>
            <div className="flex my-1 mb-2 justify-center">
              <button
                className="px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
                onClick={handleInterestSubmit}
              >
                Send Interest
              </button>
              {showInterestForm && (
                <InterestForm
                  handleCloseInterestForm={handleCloseInterestForm}
                  onSubmit={handleInterestFormSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Penthouse */}
      <div
        id="aboutproject"
        className="font-roboto mx-3 md:mx-12 lg:mx-24 pt-16 max-h-100vh"
      >
        <div className="bg-[#F2F5FC] p-4 md:p-8 rounded-lg shadow-xl">
          <div className="font-bold mb-3  text-xl md:text-2xl lg:text-3xl  ">
            About {data?.property_name}
          </div>
          <Text text={data?.description} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Status</div>
              <div className="font-semibold text-blue-500 text-lg">
                {specificContent[data?.status] || data?.status}
              </div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Total Units</div>
              <div className="font-semibold text-blue-500 text-lg">
                {unitCount || "NA"}
                {/* {data?.propertysize[0]} */}
              </div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Property Type</div>
              <div className="font-semibold text-blue-500 text-lg">Flat</div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Project Area</div>
              <div className="font-semibold text-blue-500 text-lg">
                {/* {data?.propertysize[1]} */}
                {landSize || "NA"}
              </div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Sale Type</div>
              <div className="font-semibold text-blue-500 text-lg">
                {data?.areatype}
              </div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Full Address</div>
              <div className="font-semibold text-blue-500 text-lg">
                {data?.location}
              </div>
            </div>
            {/* <div className="p-3 md:p-6">
              <div className="text-slate-800">Project Website</div>
              <button
                onClick={handleCopy}
                className="flex font-semibold  py-1 text-blue-500 text-sm"
              >
                {" "}
                <div className="bg-blue-200 px-3 rounded-xl shadow-xl flex">
                  <BsLink className="w-8 h-8" />
                  <span className="pt-1 w-24 text-center">Website Link</span>
                </div>
              </button>
              {isCopied && (
                <span
                  className="text-blue-500 strong duration-500 ease-in-out"
                  onAnimationEnd={() => setIsCopied(false)}
                >
                  Link copied to clipboard!
                </span>
              )}
            </div> */}
          </div>
        </div>
      </div>
      {/* GPT */}
      {/* <div
        id="ai"
        className="font-roboto pb-3 md:pb-6 pt-16 px-3 md:px-12 lg:px-24"
      >
        <div className="bg-gradient-to-l  shadow-xl rounded-xl p-4 flex justify-center items-center from-[#8C52FF] to-[#1D4ED8] ">
          <div className="text-center">
            <div className="w-full flex justify-center">
              <div className="w-[3.5rem]">
                <Aibuddy />
              </div>
            </div>
            <div className="">
              <div className="relative flex w-fit text-xl text-white mb-6 md:mb-2 lg:mb-6 md:text-3xl mx-auto">
                <Sparkles>AI Realtor Buddy</Sparkles>
              </div>
            </div>
            <div className="mb-5 text-lg text-white">
              Meet Your AI Real Estate Assistant, ready to answer virtually your
              questions about this property.
            </div>
            <div className="m-4 rounded-md h-10 flex  bg-white mt-2">
              <input
                type="text"
                value={inputValue}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    // Prevent the default behavior of the Enter key
                    event.preventDefault();
                    // Call your submission logic here
                    handleBrowseGpt();
                  }
                }}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                className=" focus:ring-0 focus:outline-none outline-none border-none w-full rounded-md"
              />
              <button
                onClick={handleBrowseGpt}
                className="w-[2.4rem] flex justify-center items-center mr-2"
              >
                <Arrow />
              </button>
            </div>
            <div className="text-lg my-4 gap-2 flex justify-center items-center">
              <img
                alt="Stars"
                className="_7_i_XA h-6"
                crossOrigin="anonymous"
                draggable="false"
                src="https://media-public.canva.com/373xY/MAD9Hx373xY/2/t.png"
                style={{
                  objectFit: "fill",
                }}
              />
              <div className="text-white relative">
                <Sparkles>Popular questions</Sparkles>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 mb-4 gap-4">
              <button
                onClick={() =>
                  handleStringSearchGpt("Tell me about the schools nearby")
                }
                className="rounded-xl px-4 flex justify-between items-center bg-[#1D1F84]"
              >
                <div className="line-clamp-2 p-1 text-left md:p-4 text-white">
                  “Tell me about the schools nearby”
                </div>
                <div className="w-[2.4rem] ml-2 rounded-full bg-[#5B54BD] p-1 my-auto mr-2">
                  <Arrow />
                </div>
              </button>
              <button
                onClick={() =>
                  handleStringSearchGpt("Tell me about the restaurants nearby")
                }
                className="rounded-xl px-4 flex justify-between items-center bg-[#1D1F84]"
              >
                <div className="line-clamp-2 p-1 text-left  md:p-4 text-white">
                  “Tell me about the restaurants nearby”
                </div>
                <div className="w-[2.4rem] ml-2 rounded-full bg-[#5B54BD] p-1 my-auto mr-2">
                  <Arrow />
                </div>
              </button>
              <button
                onClick={() =>
                  handleStringSearchGpt("Tell me about the healthcare nearby")
                }
                className="rounded-xl px-4 flex justify-between items-center bg-[#1D1F84]"
              >
                <div className="line-clamp-2 p-1 text-left   md:p-4 text-white">
                  “Tell me about the healthcare nearby”
                </div>
                <div className="w-[2.4rem] ml-2 rounded-full bg-[#5B54BD] p-1 my-auto mr-2">
                  <Arrow />
                </div>
              </button>
              <button
                onClick={() =>
                  handleStringSearchGpt("Tell me about the healthcare nearby")
                }
                className="rounded-xl px-4 flex justify-between items-center bg-[#1D1F84]"
              >
                <div className="line-clamp-2 p-1 text-left  md:p-4 text-white">
                  “Tell me about the healthcare nearby”
                </div>
                <div className="w-[2.4rem] ml-2 rounded-full bg-[#5B54BD] p-1 my-auto mr-2">
                  <Arrow />
                </div>
              </button>
              <button
                onClick={() =>
                  handleStringSearchGpt("Tell me about the amenities")
                }
                className="rounded-xl px-4 flex justify-between items-center bg-[#1D1F84]"
              >
                <div className="line-clamp-2 p-1 text-left  md:p-4 text-white">
                  “Tell me about the amenities”
                </div>
                <div className="w-[2.4rem] ml-2 rounded-full bg-[#5B54BD] p-1 my-auto mr-2">
                  <Arrow />
                </div>
              </button>
              <button
                onClick={() =>
                  handleStringSearchGpt("Tell me about the location")
                }
                className="rounded-xl px-4 flex justify-between items-center bg-[#1D1F84]"
              >
                <div className="line-clamp-2 p-1 text-left  md:p-4 text-white">
                  “Tell me about the location”
                </div>
                <div className="w-[2.4rem] ml-2 rounded-full bg-[#5B54BD] p-1 my-auto mr-2">
                  <Arrow />
                </div>
              </button>
            </div>
            <Link href={"#reachout"} className="font-medium text-white">
              Could not find answer to your questions?{" "}
              <span className="underline">Get in touch with our experts.</span>
            </Link>
          </div>
        </div>
      </div> */}
      {/* Amenities */}
      <div
        id="amenities"
        className=" font-roboto px-3 md:px-12 lg:px-24 pt-16 my-4"
      >
        <div className="bg-[#F2F5FC] p-4 md:p-8 lg:p-12 rounded-lg shadow-xl">
          <div className="font-bold text-xl md:text-2xl lg:text-3xl">
            Amenities in {data?.property_name}
          </div>
          <div className="flex mx-auto justify-center sm:justify-normal flex-wrap sm:pl-0 my-4 gap-2 md:gap-2 lg:gap-4">
            <div className="border flex justify-center items-center w-[7rem] md:w-[7.4rem] lg:w-[7.6rem]   h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
              <div className="">
                <div className="text-white flex justify-center">
                  <BsCarFrontFill size={"2rem"} />
                </div>
                <div className="text-white text-center text-xs">Parking</div>
              </div>
            </div>
            {data?.environment_emenities?.includes("Large Green Area") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <RiPlantFill size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">Gardens</div>
                </div>
              </div>
            ) : null}
            {data?.convenience_emenities?.includes("Power Backup") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <BiPowerOff size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">
                    Power Backup
                  </div>
                </div>
              </div>
            ) : null}
            {data?.convenience_emenities?.includes("Lift") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <MdElevator size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">Lift</div>
                </div>
              </div>
            ) : null}
            {data?.sports_amenities?.includes("Gymnasium") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <FaDumbbell size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">Gym</div>
                </div>
              </div>
            ) : null}
            {data?.leisure_emenities?.includes("Clubhouse") ||
            data?.leisure_emenities?.includes("Luxurious Clubhouse") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <BsFillHouseFill size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">
                    Club House
                  </div>
                </div>
              </div>
            ) : null}
            {data?.sports_amenities?.includes("Swimming Pool") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <FaSwimmer size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">
                    Symming Pool
                  </div>
                </div>
              </div>
            ) : null}
            {data?.safety_emenities?.includes("24 x 7 Security") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <PiLockKeyOpenFill size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">
                    24/7 Security
                  </div>
                </div>
              </div>
            ) : null}
            {data?.sports_amenities?.includes("Basketball") ||
            data?.sports_amenities?.includes("Badminton Court(s)") ||
            data?.sports_amenities?.includes("Cricket") ||
            data?.sports_amenities?.includes("Tennis Court(s)") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <MdSportsHandball size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">
                    Sports Courts
                  </div>
                </div>
              </div>
            ) : null}
            {data?.sports_amenities?.includes("Kids Play Areas / Sand Pits") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <GiTreeSwing size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">
                    Kids Play Area
                  </div>
                </div>
              </div>
            ) : null}
            {data?.leisure_emenities?.includes("Food Court") ||
            data?.leisure_emenities?.includes("Cafe / Coffee Bar") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <IoRestaurantSharp size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">
                    Restaurants
                  </div>
                </div>
              </div>
            ) : null}
            {data?.leisure_emenities?.includes("Indoor Games") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <CgGames size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">
                    Indoor Games
                  </div>
                </div>
              </div>
            ) : null}
            {data?.leisure_emenities?.includes("Party Hall") ? (
              <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
                <div className="">
                  <div className="text-white flex justify-center">
                    <GiPartyPopper size={"2rem"} />
                  </div>
                  <div className="text-white text-center text-xs">
                    Party Hall
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Specification */}
      <div
        id="specifications"
        className="font-roboto px-3 md:px-12 lg:px-24 py-4 pt-16 max-h-100vh"
      >
        <div className="bg-[#F2F5FC] p-4 md:p-8 lg:p-12 rounded-lg shadow-xl">
          <div className="font-bold text-xl md:text-2xl lg:text-3xl">
            Specifications
          </div>
          <div className="flex justify-between bg-blue-100 font-semibold my-4 rounded-lg overflow-hidden">
            <button
              onClick={() => setShowSpec("All")}
              className={`text-center w-full h-full  py-3  transition-all duration-500 ${
                showSpec === "All" ? "text-white bg-blue-500 " : "text-black"
              }`}
            >
              All
            </button>

            {data && data["2_BHK_plan"] ? (
              <button
                onClick={() => setShowSpec("2")}
                className={`text-center w-full h-full  py-3  transition-all duration-500 ${
                  showSpec === "2" ? "text-white bg-blue-500 " : ""
                }`}
              >
                2 BHK
              </button>
            ) : null}

            {data && data["3_BHK_plan"] ? (
              <button
                onClick={() => setShowSpec("3")}
                className={`text-center w-full h-full  py-3  transition-all duration-500 ${
                  showSpec === "3" ? "text-white bg-blue-500 " : ""
                }`}
              >
                3 BHK
              </button>
            ) : null}

            {data && data["4_BHK_plan"] ? (
              <button
                onClick={() => setShowSpec("4")}
                className={`text-center w-full h-full  py-3  transition-all duration-500 ${
                  showSpec === "4" ? "text-white bg-blue-500 " : ""
                }`}
              >
                4 BHK
              </button>
            ) : null}
          </div>

          <div className="grid pl-8 grid-cols-1 gap-4 lg:gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data &&
              data["2bhk"] &&
              (showSpec == "All" || showSpec == "2") &&
              data["2_BHK_plan"]?.map((plan, index) => {
                const size = plan.carpet
                  ? plan.carpet
                  : extractSizeFromName(plan.name);
                return (
                  <div
                    key={index}
                    className="flex pt-2 justify-center w-full h-30"
                  >
                    <div className="w-1/2 h-full">
                      <Image
                        width={500}
                        height={500}
                        className="rounded-lg border border-black w-full h-full"
                        src={data["2bhk"]?.[index]}
                        alt="img"
                        onClick={() =>
                          handleClose(data["2bhk"]?.[index], !handleCloseLayout)
                        }
                      />
                    </div>
                    <div className="flex justify-center items-center h-full w-full">
                      <div className="ml-4 w-full">
                        <div className="underline font-medium mb-2">
                          Layout{" "}
                        </div>
                        <div className="flex">
                          <div className="font-medium text-sm">Size: </div>
                          <div className="font-medium text-sm">
                            {size} Sq.ft.
                          </div>
                        </div>
                        <div className="flex">
                          <div className="font-medium text-sm">Price: </div>
                          <div className="font-medium text-sm">
                            ₹ {plan.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {data &&
              (showSpec == "All" || showSpec == "3") &&
              data["3_BHK_plan"]?.map((plan, index) => {
                const size = plan.carpet
                  ? plan.carpet
                  : extractSizeFromName(plan.name);
                return (
                  <div
                    key={index}
                    className="flex pt-2 justify-center w-full h-30"
                  >
                    <div className="w-1/2 h-full">
                      <Image
                        width={500}
                        height={500}
                        className="rounded-lg border border-black w-full h-full"
                        src={data["3bhk"]?.[index]}
                        alt="img"
                        // onClick={()=>sethandleCloseLayout(!handleCloseLayout)}
                        onClick={() =>
                          handleClose(data["3bhk"]?.[index], !handleCloseLayout)
                        }
                      />
                    </div>
                    <div className="flex justify-center items-center h-full w-full">
                      <div className="ml-4 w-full">
                        <div className="underline font-medium mb-2">
                          Layout{" "}
                        </div>
                        <div className="flex">
                          <div className="font-medium text-sm">Size: </div>
                          <div className="font-medium text-sm">
                            {size} Sq.ft.
                          </div>
                        </div>
                        <div className="flex">
                          <div className="font-medium text-sm">Price: </div>
                          <div className="font-medium text-sm">
                            ₹ {plan.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {handleCloseLayout && (
              <Propertylayout img={img} handlecloselayout={handlecloselayout} />
            )}
            {data &&
              (showSpec == "All" || showSpec == "4") &&
              data["4_BHK_plan"]?.map((plan, index) => {
                const size = plan.carpet
                  ? plan.carpet
                  : extractSizeFromName(plan.name);
                return (
                  <div
                    key={index}
                    className="flex pt-2 justify-center w-full h-30"
                  >
                    <div className="w-1/2 h-full">
                      <Image
                        width={500}
                        height={500}
                        className="rounded-lg border border-black w-full h-full"
                        src={data["4bhk"]?.[index]}
                        alt="img"
                        onClick={() =>
                          handleClose(data["4bhk"]?.[index], !handleCloseLayout)
                        }
                      />
                    </div>
                    <div className="flex justify-center items-center h-full w-full">
                      <div className="ml-4 w-full">
                        <div className="underline font-medium mb-2">
                          Layout{" "}
                        </div>
                        <div className="flex">
                          <div className="font-medium text-sm">Size: </div>
                          <div className="font-medium text-sm">
                            {size} Sq.ft.{" "}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="font-medium text-sm">Price: </div>
                          <div className="font-medium text-sm">
                            ₹ {plan.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div
        id="location"
        className="font-roboto px-3 md:px-12 lg:px-24 py-4 pt-16 max-h-100vh"
      >
        <div className="rounded-xl shadow-lg bg-[#F2F5FC] ">
          <div className="font-bold pt-4 md:pt-8 lg:pt-12 pl-4 md:pl-8 lg:pl-12  text-xl md:text-2xl lg:text-3xl">
            Location{" "}
          </div>
          <div className="text-md pl-4 md:pl-8 lg:pl-12  font-medium">
            {exactLocation}
          </div>
          <div className="p-2 z-0">
            <MapContainer address={exactLocation} />
          </div>
        </div>
      </div>
      {/* About Developer Section */}
      <div
        id="aboutdeveloper"
        className="font-roboto px-3 py-4 pt-16 md:px-12 lg:px-24"
      >
        <div className="md:flex w-full gap-4">
          <div className="w-full p-4 md:p-8 lg:p-12 rounded-xl shadow-lg bg-[#F2F5FC] ">
            <div className="mb-3 font-bold text-xl md:text-2xl lg:text-3xl">
              About Developer
            </div>
            <div className="text-md">
              <Text text={data?.builder_details?.desc} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <div className="p-3 pl-0 md:pl-0 md:p-6">
                <div className="text-slate-800">Developer&apos;s Name</div>
                <div className="font-semibold text-blue-500 text-lg">
                  {data?.builder_details?.name || "NA"}
                </div>
              </div>
              <div className="p-3 pl-0 md:pl-0 md:p-6">
                <div className="text-slate-800">Experience</div>
                <div className="font-semibold text-blue-500 text-lg">
                  {data?.builder_details?.experience || "NA"}
                </div>
              </div>
              <div className="p-3 pl-0 md:pl-0 md:p-6">
                <div className="text-slate-800">Total Properties</div>
                <div className="font-semibold text-blue-500 text-lg">
                  {data?.builder_details?.["total projects"] || "NA"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating and Reviews Section */}

      {/* Reachout */}
      <Reachout session={session} property_name={data?.property_name} />

      {/* Nearby Properties */}
      <div
        id="NearbyProperties"
        className="font-roboto pb-3 md:pb-6 pt-16 px-3 md:pl-12 lg:pl-24 texl-xl  md:text-2xl lg:text-3xl font-bold"
      >
        {nearBy?.length === 0 ? "" : "Nearby Properties"}
      </div>
      <div className="flex px-3 md:pl-12 lg:pl-24 flex-col">
        <div className="flex overflow-x-scroll scrollbar pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap mr-2">
            {nearBy?.map((val, i) => {
              const formattedProperty = val?.property_name.replace(/\s+/g, "-");
              return (
                <div
                  key={i}
                  className="h-full relative mx-auto w-[29rem] mr-3 rounded-lg bg-[#F2F5FC] "
                >
                  <Link
                    target="__blank"
                    href={`/propertydetails/${formattedProperty}`}
                    className="flex w-full h-4/5 p-2 pb-0"
                  >
                    <div className="w-40 h-full mr-2 overflow-hidden rounded-lg">
                      <div
                        className="w-full h-full"
                        style={{
                          height: "100%",
                          backgroundImage: `url(${val?.thumbnail})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                    </div>
                    <div className="w-3/5 h-full flex flex-col justify-between">
                      <div className="">
                        <div className="flex justify-between">
                          <div className="font-bold w-full text-sm line-clamp-1">
                            {val?.property_name}
                          </div>
                        </div>
                        <div className="text-blue-600 text-sm line-clamp-1">
                          {val?.builder_details?.name}
                        </div>
                        <div className="text-sm mt-2 line-clamp-1">
                          {data?.location}
                        </div>
                        <div className="text-slate-600 text-sm line-clamp-2">
                          {val?.configuration}
                        </div>
                      </div>

                      <div className="flex justify-between my-2">
                        <div className="font-bold text-blue-600 line-clamp-1">
                          INR {val?.price_range}
                        </div>
                        {/* <div className="text-slate-600 sm:pb-2 text-sm">
                        {val.propertysize[1]}
                      </div> */}
                      </div>
                    </div>
                  </Link>
                  <div className="relative h-6">
                    <div className="flex w-full absolute -bottom-4 pl-3 py-[0.6rem] sm:py-2 text-xs rounded-b-lg bg-blue-200 text-blue-500 items-end">
                      {data?.airpot_distance < 15 ||
                      parseFloat(data?.metro_distance.dist) < 10 ||
                      parseFloat(data?.school.rate) > 4 ? (
                        <div className="">
                          {[...new Set(data?.tags)]
                            .slice(0, 4)
                            .map((tag, i) => {
                              return (
                                <div
                                  key={i}
                                  className="mr-2 inline-block font-medium text-blue-500"
                                >
                                  #{tag}
                                </div>
                              );
                            })}...
                        </div>
                      ) : (
                        <span className="text-transparent">#none</span>
                      )}
                    </div>
                    <div className="absolute -bottom-2.5 rounded-lg  right-1">
                      <Link
                        className="font-roboto text-sm p-1 px-2 border rounded-lg text-white bg-blue-700 hover:bg-blue-800"
                        href={"/"}
                      >
                        Send Interest
                      </Link>
                      {/* <Partner classDesc="font-roboto text-sm p-1 px-2 border rounded-lg text-white bg-blue-700 hover:bg-blue-800 " /> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Property;
