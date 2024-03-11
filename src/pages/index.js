// "use client";
import Navbar from "./components/navbar";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Footer from "./components/footer";
import { baseurl } from "../../public/url";
import Personal from "../svgComponents/personal";
import City from "../components/screenComponents/city";
import InterestForm from "../components/propdetailsComponents/sendInterest";
import AibuddyPopup from "../components/screenComponents/aibuddy";
import Newsletter from "../components/screenComponents/newsletter";
import {
  MdVerified,
  MdRecommend,
  MdOutlineMobileOff,
  MdElectricCar,
} from "react-icons/md";
import Reachoutlayout from "../components/screenComponents/reachoverlay";
import Sparkles from "../components/screenComponents/sparkles";
import Interest from "../components/screenComponents/InterestButton";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LuHeartHandshake } from "react-icons/lu";
import { GiBonsaiTree } from "react-icons/gi";
import { BsHousesFill } from "react-icons/bs";
import { FiBookOpen } from "react-icons/fi";
import { FaSubway, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { ImOffice, ImFire, ImAirplane } from "react-icons/im";
import Seachbar from "../components/screenComponents/searchbar2";
import Testimonial from "../components/screenComponents/testimonial";
import { useCity } from "../components/selectCity.js";
import { useEffect, useState } from "react";
import Deals from "../svgComponents/deals";
import Insight from "../svgComponents/insight";
import Spam from "../svgComponents/spam";
import Card from "../components/cards/Card";
import Arrow from "../svgComponents/arrow";
import Aibuddy from "../svgComponents/aibuddy";

export async function getServerSideProps(context) {
  const id = context.query.id || "";

  try {
    const latestblogs = await fetchLatestBlogs();
    // const session = await getSession(context);
    return {
      props: {
        latestblogs,
        // session,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        latestblogs: null,
        // session: null,
      },
    };
  }
}
async function fetchLatestBlogs() {
  try {
    const response = await fetch(`${baseurl}/api/getstayupdatedblog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("An error occurred.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default function Screen({ latestblogs}) {
  const { data1: session } = useSession();
  const [propInterest, setPropInterest] = useState("");
  const [showInterestForm, setShowInterestForm] = useState(false);
  const { selectedCity, setSelectedCity } = useCity();

  async function sendInterest(prop) {
    let userName;
    let userEmail;
    let userPhone;
    if (session) {
      userName = await session?.user?.name;
      userEmail = await session?.user?.email;
      userPhone = await session?.user?.phone;
      try {
        const response = await fetch("/api/sendInterest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the appropriate content type
          },
          body: JSON.stringify({ userName, userEmail, userPhone, prop }),
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
      setPropInterest(prop);
    }
  }
  // console.log(latestblogs)

  // const { selectedCity } = useCity();
  // const handleNavigate = () => {
  //   // Pass the selected city as a query parameter
  //   router.push({
  //     pathname: "/quiz/page",
  //     query: { city: selectedCity },
  //   });
  // };

  const [selectedTag, setSelectedTag] = useState("");
  const [smartCollections, setSmartCollections] = useState([]);

  async function handleInterestFormSubmit(formdata) {
    console.log(formdata);
    const prop = propInterest;
    const userName = formdata.name;
    const userEmail = formdata.email;
    const userPhone = formdata.phone;
    try {
      const response = await fetch("/api/sendInterest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
        },
        body: JSON.stringify({ userName, userEmail, userPhone, prop }),
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
  function handleCloseInterestForm() {
    setShowInterestForm(false);
  }
  const handleSmartCollectionsTagClick = (tag) => {
    setSelectedTag(tag);
    const handleSmartCollections = async (tag) => {
      // Pass the selected city as a query parameter
      const response = await fetch("/api/smartCollections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag: tag, city: selectedCity }),
      });
      const data = await response.json();
      console.log(data);
      setSmartCollections(data);
    };
    handleSmartCollections(tag);
  };

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
      pathname: "./gpt/ask",
      query: { firstasksting: inputValue },
    });
  };
  const handleStringSearchGpt = (string) => {
    router.push({
      pathname: "./gpt/ask",
      query: { firstasksting: string },
    });
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  async function handlecloselayout() {
    sethandleCloseLayout(false);
  }
  async function handleclosereach() {
    sethandleCloseReach(false);
  }
  
  const [handleReachout, sethandleReachout] = useState(false)
  const [handleCloseReach, sethandleCloseReach] = useState(false);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <div className="">
      <Head>
        <meta
          name="SmartNeev"
          content="https://res.cloudinary.com/smartneev/image/upload/v1698736631/Logo/customlogo_l4wyxz.jpg"
        ></meta>
        <meta property="og:site_name" content="SmartNeev"></meta>
        <meta
          property="og:title"
          content="Smartneev - Revolutionizing Indian real estate with AI"
        ></meta>
        <meta
          property="og:description"
          content="Search real estate in India - Buy and Sell best properties in India. Get access to verified data, AI-driven insights, and exclusive listings. Say goodbye to spam calls and hello to hassle-free home matchmaking."
        ></meta>
        <meta
          property="og:image"
          content="https://res.cloudinary.com/smartneev/image/upload/v1698736631/Logo/customlogo_l4wyxz.jpg"
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:image:type" content="image/jpeg"></meta>
        <meta property="og:image:width" content="400"></meta>
        <meta property="og:image:height" content="400"></meta>
        <meta property="og:url" content="https://smartneev.com"></meta>
      </Head>
      <div className="sticky h-[4.3rem] top-0 z-[999]">
        <Navbar />
      </div>
      <section className="h-full font-inter">
        {/* Top Section */}

        <div className="relative font-roboto z-0">
          <div className="absolute left-0 top-0 w-full md:w-1/2 h-full bg-gradient-to-tl from-[#8C52FF] to-[#1D4ED8] "></div>

          <div
            style={{
              height: "100%",
              backgroundImage: `url(https://images.adsttc.com/media/images/6077/43aa/ebb5/fc01/6543/b86b/newsletter/fi-img-1234.jpg)`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="hidden md:block absolute right-0 top-0 w-1/2 h-full bg-gradient-to-tr from-[#1D4ED8] to-[#8C52FF]"
          ></div>

          <div className="relative z-10 bg-transparent font-inter">
            <div className="pt-10  mb-4 md:mb-8 px-6 md:px-auto relative md:w-1/2 ">
              <div className=" md:ml-6 font-[600] md:pr-14 lg:pr-28: md:mb-2 text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white">
                <div className="my-2">DISCOVER YOUR</div>
                <div className="my-2">DREAM HOME,</div>
                <div className="my-2">TODAY!</div>
              </div>
              <p className="mt-4 md:mb-8 lg:mb-0 md:ml-6 text-white font-normal">
                Get AI powered personalized recommendations just for you.
              </p>
            </div>
            <City />
            <div className="w-full pt-4 pb-4 md:pt-10 md:pb-14 px-2 md:pl-8">
              <Seachbar
                handleSmartCollectionsTagClick={handleSmartCollectionsTagClick}
              />{" "}
            </div>
          </div>
        </div>
        {/* <div className="relative grid grid-cols-1 m-0 p-0 md:grid-cols-2">
        <div 
        // style={{
        //       backgroundImage: `url(https://assets-news.housing.com/news/wp-content/uploads/2020/02/25174853/All-about-row-houses-in-India-FB-1200x700-compressed.jpg)`,
        //       backgroundSize: "cover",
        //       backgroundRepeat: "no-repeat",
        //     }} 
            className="absolute rows-span-1 h-96 md:h-80 lg:h-full bg-gradient-to-tl from-[#8C52FF] to-[#1D4ED8] ">
          <div className="lg:py-6 lg:mb-36 md:py-4 px-6 md:px-auto md:my-10 relative w-full flex flex-col justify-center items-start">
            <div className="mt-4 md:mt-2 lg:mt-4 md:ml-6 md:pr-6 md:mb-2 sm:w-11/12 md:w-full xl:w-4/5 text-4xl lg:text-4xl xl:text-6xl md:text-2xl font-medium tracking-tight text-white">
              DISCOVER YOUR DREAM HOME, TODAY!
            </div>
            <p className="md:mb-8 lg:mb-0 md:ml-6 text-white font-normal">
              Get AI powered personalized recommendations just for you.
            </p>
          </div>
          <div className="w-full">
            <Seachbar />{" "}
          </div>
          <button className="w-full md:ml-10 md:w-2/3 lg:w-2/3 xl:w-1/3 ml-2 my-2 md:my-0 p-3  md:relative text-white md:-top-2 border border-white bg-blue-500 rounded-lg">
        Try our home matchmaker
      </button>
        </div>
        <div
          style={{
            height: "100%",
            backgroundImage: `url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="hidden absolute md:flex m-0 sm:pb-6 md:pb-10 xl:pt-10 h-96  justify-center rows-span-1"
        >
          {/* <div className=" sm:h-60 min-[400px]:w-[28rem] sm:w-[28rem] relative flex justify-center">
            <div className="absolute top-8 sm:top-10 left-1 md:-left-4 bg-black px-4 py-1 text-white rounded-lg border border-white">
              Ready to move
            </div>
            <div className="absolute bottom-8 sm:bottom-4 sm:-left-4 ml-2 mr-2 sm:mx-0 bg-white px-4 py-1 text-blue-600 text-xs sm:text-sm rounded-lg border border-black">
              #near airport #near airport #near airport
            </div>
            <div className="absolute top-10 right-0 bg-white px-4 py-1 text-green-600 text-lg font-sans font-semibold rounded-lg border border-black">
              93% match
            </div>

            <div className="bg-white  h-auto min-[400px]:w-[22rem] sm:h-40 my-14 rounded-lg">
              <div className="flex h-full p-2">
                <div className="bg-blue-500 w-1/3 h-full rounded-lg mr-2">
                  {/* <div
                    className=""
                    style={{
                      height: "100%",
                      width:"100%",
                      backgroundImage: `url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div> */}
        {/* <img
                    className="w-full h-full rounded-lg"
                    src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg"
                    alt=""
                  />
                </div>
                <div className="w-2/3">
                  <div className="font-bold">रु. 3.09 Cr</div>
                  <div className="text-slate-500 sm:pb-2 text-sm">
                    18000/Sq.ft
                  </div>
                  <div className="text-slate-500 text-sm">
                    Parsvnath Developers Limited
                  </div>
                  <div className="font-bold text-sm">
                    Parsvanth Pramount Penthouse
                  </div>

                  <div className="text-slate-500 sm:pb-2 text-sm">
                    3BHK Apt. 4835 Sq.ft
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

        {/* Card Section */}
        <div className="card-section px-2 sm:px-8 py-6 md:py-8 flex justify-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 mx-10 md:mx-14 lg:mx-20">
            <div className="bg-white flex flex-col gap-4 py-4 rounded-t-lg border-t-2 border-x-2 md:rounded-lg shadow-lg md:border">
              <div className="flex justify-center text-blue-600">
                <Insight />
              </div>
              <div className="font-bold text-center px-2 text-md">
                Verified Information & Insights
              </div>
              <div className="py-1 text-black border-b-2 border-slate-200 md:border-none text-center text-sm mx-6">
                We believe in transparency, providing you with fully verified
                information and insights
              </div>
            </div>
            <div className="bg-white flex flex-col gap-4 py-4 md:rounded-lg pt-3  shadow-lg border-x-2 md:border">
              <div className="flex justify-center text-blue-600">
                {/* <MdRecommend className="m-1" size={40} /> */}
                <Personal />
              </div>
              <div className="font-bold text-center px-2 text-md">
                Personalised Recommendations
              </div>
              <div className="py-1 text-black border-b-2 border-slate-200 md:border-none text-center text-sm mx-6">
                Stop wasting time browsing hundreds of homes. Let AI find the
                perfect one for you.
              </div>
            </div>
            <div className="bg-white flex flex-col gap-4 py-4 md:rounded-lg pt-3 shadow-lg border-x-2 md:border">
              <div className="flex justify-center text-blue-600">
                <Deals />
              </div>
              <div className="font-bold text-center px-2 text-md">
                High Quality Exclusive Deals
              </div>
              <div className="py-1  text-black border-b-2 border-slate-200 md:border-none text-center text-sm mx-6">
                Get access to high-quality exclusive deals from trusted
                developers and agents.
              </div>
            </div>
            <div className="bg-white flex flex-col gap-4 py-4 rounded-b-lg pt-3 md:rounded-lg border-b-2 border-x-2 shadow-lg md:border">
              <div className="flex justify-center text-blue-600">
                <Spam />
              </div>
              <div className="font-bold text-center text-md px-2">
                No spam Calls
              </div>
              <div className="py-1  text-black border-slate-300 md:border-none text-center text-sm mx-6">
                No unwanted phone calls and fake leads. Contact us when you
                want.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* GPT */}
      {/* <section className="smart-filters-section md:h-[calc(100vh-68.8px)]">
        <div className="md:grid relative h-full m-0 p-0 md:grid-cols-2 ">
          <div className="bg-gradient-to-l  p-4 flex justify-center items-center md:rounded-md from-[#8C52FF] to-[#1D4ED8] ">
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
              <div className="mb-5 text-white">
                Meet Your AI Real Estate Assistant, ready to answer virtually
                your questions about home buying
              </div>
              <div className="m-4 rounded-md h-10 flex  bg-white mt-2">
                <input
                  type="text"
                  value={inputValue}
                  onKeyDown={(event)=>{if (event.key === 'Enter') {
                    // Prevent the default behavior of the Enter key
                    event.preventDefault();
                    // Call your submission logic here
                    handleBrowseGpt();
                  }}}
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
              <div className="grid grid-cols-2 mb-4 gap-4">
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
            </div>
              <div className="font-medium text-white inline-block">
                Could not find answer to your questions? 
              </div>{" "}
              <button onKeyDown={(e)=>{
              if (e.key == "Escape") {
                // console.log(e.target);
                handleclosereach();
              }
            }} onClick={()=>sethandleCloseReach(!handleCloseReach)} className="hover:underline font-medium text-white inline-block">Get in touch with our
            experts.</button>
            </div>
          </div>

          <div className="block pt-0 p-6  bg-gradient-to-bl from-[#D8EDFE] via-[#FFFFFF] to-[#F2E9FF]">
            <div className="flex pl-6 h-full justify-end items-center">
              <div className="text-right p-6 pr-4 text-2xl sm:text-4xl md:pl-4 lg:pl-4 xl:pl-18">
                <span className="relative font-semibold">
                  AI Realtor Buddy
                  <div className="h-1 rounded-md right-0 absolute w-48 sm:w-72 bg-blue-500"></div>
                </span>
                <div className="text-base md:text-lg text-right pl-6 lg:pl-28  mt-6 mb-2">
                  <div className="block">
                    Meet our AI realtor buddy, your Trusted Real Estate Guide
                    powered by LLM and expert knowledge in the field.
                  </div>
                  <div className="mt-4">
                    Our AI-Powered Real Estate Assistant is here to answer all
                    your questions about any property. Just ask, and we've got
                    you covered
                  </div>
                </div>
                <div className="text-base md:text-lg mt-5 text-right">
                  Could not find answer to your questions?
                </div>
                <button onKeyDown={(e)=>{
              if (e.key == "Escape") {
                // console.log(e.target);
                handleclosereach();
              }
            }} onClick={()=>sethandleCloseReach(!handleCloseReach)} className="font-bold underline text-base md:text-lg text-right">
                  Get in touch with our experts
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {
handleCloseReach && <Reachoutlayout session={session} property_name={""} handleclosereach={handleclosereach}/>
            }
      {/* Smart Filter Section */}

      {/* <section className="smart-filters-section h-screen">
        <div className="grid grid-cols-1 relative h-full m-0 p-0 md:grid-cols-2 ">
          <div
            className="row-span-1 z-0 h-80 md:h-full flex justify-center items-center py-4 md:rounded-r-md overflow-hidden"
            style={{
              backgroundImage: `url(/image2.png)`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="z-10 h-80 md:h-full  absolute rounded-lg bg-[#1D4ED8] backdrop-blur-lg backdrop-grayscale opacity-70 w-full md:w-1/2"></div>
            <div className="hidden lg:block md:mt-0 z-20">
              <div className="flex flex-wrap space-x-4 xl:pl-12 absolute left-1 bottom-[54%]">
                <div className="flex bg-white rounded-3xl p-2 border shadow-md">
                  <GiBonsaiTree className="h-8 w-8 p-1 text-green-600" />{" "}
                  <div className="p-1">Near greenery</div>
                </div>
                <div className="flex bg-white rounded-3xl p-2 border shadow-md">
                  <BsHousesFill className="h-8 w-8 p-1 text-purple-600" />
                  <div className="p-1">Quiet Neighbourhood</div>
                </div>
                <div className="flex bg-white px-4 rounded-3xl p-2 border shadow-md">
                  <MdElectricCar className="h-8 w-8 p-1 text-green-600" />
                  <div className="p-1">EV Friendly</div>
                </div>
              </div>
              <div className="flex mt-4 xl:pl-24  space-x-4 absolute left-0 bottom-[45%]">
                <div className="flex ml-16 bg-white rounded-3xl p-2 border shadow-md">
                  <FiBookOpen className="h-6 w-6 sm:h-8 sm:w-8 p-1 text-blue-600" />
                  <div className="p-1">Top Schools</div>
                </div>
                <div className="flex bg-white rounded-3xl p-2 border shadow-md">
                  <FaSubway className="h-6 w-6 sm:h-8 sm:w-8 p-1 text-purple-600" />
                  <div className="p-1">Metro Commute</div>
                </div>
                <div className="flex bg-white rounded-3xl p-2 border shadow-md">
                  <ImOffice className="h-6 w-6 sm:h-8 sm:w-8 p-1 text-blue-600" />
                  <div className="p-1">Near Office Hubs</div>
                </div>
              </div>
            </div>
            <div className="block lg:hidden md:mt-0 z-10">
              <div className="pl-5 flex flex-wrap gap-4">
                <div className="flex bg-white rounded-3xl mr-2 p-2 border shadow-md">
                  <GiBonsaiTree className="h-6 w-6 sm:h-8 sm:w-8 p-1 text-green-600" />{" "}
                  <div className="p-1 text-xs sm:text-base">Near greenery</div>
                </div>
                <div className="flex bg-white rounded-3xl p-2 border shadow-md">
                  <BsHousesFill className="h-6 w-6 sm:h-8 sm:w-8 p-1 text-purple-600" />
                  <div className="p-1 text-xs sm:text-base">
                    Quiet Neighbourhood
                  </div>
                </div>
                <div className="flex bg-white px-4 rounded-3xl p-2 border shadow-md">
                  <MdElectricCar className="h-6 w-6 sm:h-8 sm:w-8 p-1 text-green-600" />
                  <div className="p-1 text-xs sm:text-base">EV Friendly</div>
                </div>
                <div className="flex sm:ml-20 md:ml-0 bg-white rounded-3xl p-2 border shadow-md">
                  <FiBookOpen className="h-6 w-6 sm:h-8 sm:w-8 p-1 text-blue-600" />
                  <div className="p-1 text-xs sm:text-base">Top Schools</div>
                </div>
                <div className="flex bg-white rounded-3xl mr-2 p-2 border shadow-md">
                  <FaSubway className="h-6 w-6 sm:h-8 sm:w-8 p-1 text-purple-600" />
                  <div className="p-1 text-xs sm:text-base">Metro Commute</div>
                </div>
                <div className="flex bg-white rounded-3xl p-2 border shadow-md">
                  <ImOffice className="h-6 w-6 sm:h-8 sm:w-8 p-1 text-blue-600" />
                  <div className="p-1 text-xs sm:text-base">
                    Near Office Hubs
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row-span-1 pt-0 p-6">
            <div className="flex pl-6 h-full justify-end items-center">
              <div className="text-right  pr-4 text-2xl sm:text-4xl md:pr-4 lg:pr-12 xl:pr-18">
                <span className="relative font-semibold">
                  Smart Filters
                  <div className="h-1 rounded-md right-0 absolute w-48 sm:w-56 bg-purple-500"></div>
                </span>
                <div className="text-base text-right pl-6 lg:pl-12  xl:pl-28 mt-6 mb-2">
                  <div className="hidden sm:block">
                    <div className="">
                      Don’t settle for anything less than extraordinary.
                    </div>
                    <div className="">
                      Check out our smart filters to unlock a world of
                    </div>
                    <div className="">
                      high-quality, exclusive deals on premium properties in
                      gurgaon.
                    </div>
                  </div>
                  <div className="block sm:hidden">
                    Don’t settle for anything less than extraordinary. Check out
                    our smart filters to unlock a world of high-quality,
                    exclusive deals on premium properties in gurgaon.
                  </div>
                  .
                </div>
                <div className="font-bold text-base text-right">
                  Your dream home awaits!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <div className="h-60 md:hidden"></div> */}

      {/* Home Matching Section */}
      <section className="home-matching-section ">
        <div className="grid grid-cols-1 md:relative md:h-[calc(100vh-68.8px)]  m-0 p-0 md:grid-cols-2 bg-gradient-to-bl from-[#D8EDFE] via-[#FFFFFF] to-[#F2E9FF]">
          <div className="flex h-full w-full items-center pb-10">
            <div className="p-6">
              <div className="text-left pl-4 text-2xl sm:text-4xl md:pl-4 lg:pl-4 xl:pl-18">
                <span className="font-semibold z-0 relative">
                  Home Matchmaking
                  <div className="h-1 rounded-md z-10 absolute  left-0 w-64 sm:w-[21rem] bg-blue-500"></div>
                </span>

                <div className="md:hidden text-base md:text-lg text-left mt-6 mb-2">
                  Want to find a home that meets your precise needs? Just answer
                  a few questions and we’ll show the most compatible homes along
                  with a compatibility score for every listing on the site.
                </div>
                <div className="hidden md:block text-base  md:text-lg text-left mt-6 mb-2">
                  <div className="">
                    Want to find a home that meets your precise needs? Just
                    answer
                  </div>
                  <div className="">
                    {" "}
                    a few questions and we’ll show the most compatible homes
                    along
                  </div>
                  <div className="">
                    {" "}
                    with a compatibility score for every listing on the site.
                  </div>
                </div>
                <div className="font-roboto text-base  md:text-lg mb-6 text-left pr-10">
                  Get highly curated property recommendations just for you.
                </div>

                <Link href="/quiz/page" className=" text-lg p-3">
                  <div className="w-fit">
                    <div className="relative z-0 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out rounded-lg  px-3 md:px-6 text-white p-1 sm:p-2">
                      <Sparkles>Try our AI home match quiz</Sparkles>
                    </div>
                  </div>
                </Link>
                <div className="text-base md:text-2xl font-semibold mt-16">
                  We are here to revolutionize property buying experience
                </div>
              </div>
            </div>
          </div>
          <div className=" h-[26rem] relative md:h-[calc(100vh-68.8px)]  z-0">
            <div className="z-10 absolute md:rounded-l-lg md:rounded-b-none h-[26rem] md:h-[calc(100vh-68.8px)]  bg-black backdrop-blur-lg backdrop-grayscale opacity-60 w-full"></div>
            <div
              className="h-full flex justify-center items-center py-4 md:h-auto md:rounded-l-md overflow-visible"
              style={{
                height: "100%",
                backgroundImage: `url(https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-20">
                <div className="font-bold text-center my-2 text-white text-4xl">
                  Match Found!
                </div>
                <div className="text-xl w-full text-white text-center">
                  We’ve discovered homes that matches your preferences.
                </div>
                <div className="h-60  mx-auto w-full lg:w-5/6 relative flex justify-center items-center">
                  <div className="z-30 absolute shadow-lg  top-4 sm:top-8 left-0 md:-left-2 bg-black px-4 py-1 text-white rounded-lg border border-white">
                    Ready to move
                  </div>
                  <div className="absolute bg-white bottom-6 sm:bottom-4 sm:-left-2 ml-2 mr-2 sm:mx-0 px-4 py-1 text-blue-600 text-xs sm:text-sm rounded-lg border border-black">
                    <span className=" mr-2.5">#ultra luxury</span>
                    <span className=" mr-2.5">#near highway</span>
                    <span className=" mr-2.5">#near top schools</span>
                    <span className=" mr-2.5">#for NRIs</span>
                  </div>
                  <div className="absolute top-5 shadow-lg border border-black right-0 bg-white px-4 text-green-600 text-lg font-sans font-semibold rounded-lg">
                    93% match
                  </div>

                  <div className="bg-white w-11/12 h-40 sm:w-[22rem] lg:w-[28rem] sm:h-40 my-14 rounded-lg">
                    <div className="flex w-full h-full p-2">
                      <div className="w-1/3 h-full rounded-lg mr-2">
                        <div
                          className="rounded-lg"
                          style={{
                            height: "100%",
                            backgroundImage: `url(https://www.realtimerealtors.in/storage/property/gallery/56d737fc51f8fd62e4d24e0c22b3ac25_1586315574.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                      </div>
                      <div className="">
                        <div className="text-base font-semibold">
                          DLF THe Ultima
                        </div>
                        <div className="font-semibold text-blue-500  text-sm">
                          DLF Limited
                        </div>
                        <div className="text-slate-500 sm:pb-2 text-xs md:text-sm">
                          Sector 81, Gurugram
                        </div>
                        <div className="text-slate-500 sm:pb-2 text-xs md:text-sm">
                          3BHK Apt. 2132 Sq.ft
                        </div>
                        <div className="text-blue-500  font-bold">
                          INR 2.7 Cr
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section  */}
      <section
        id="collections"
        className="collection-section  h-screen  relative"
      >
        {showInterestForm && (
          <InterestForm
            onSubmit={handleInterestFormSubmit}
            handleCloseInterestForm={handleCloseInterestForm}
          />
        )}
        <div className="z-10 relative flex flex-col pb-6 h-full bg-gradient-to-tr from-[#1D4ED8] to-[#8C52FF]">
          {/* <div className=" absolute md:rounded-lg bg-blue-400 backdrop-blur-lg backdrop-grayscale opacity-50 h-full w-full"></div> */}

          <div className="z-20 flex justify-center">
            <div className="font-medium pt-5 lg:mt-10 py-6 text-4xl text-white relative">
              <span className="absolute h-1 w-full bottom-4 bg-white rounded-lg"></span>
              Smart Collections
            </div>
          </div>
          {/* top collection slider */}
          <div className="flex z-20 font-roboto mx-1 md:mx-3 relative xl:justify-center mt-6 my-2 rounded-lg mb-4 hide-scroll-bar ">
            <div className="p-1 rounded-lg text-sm scrollbar overflow-auto whitespace-nowrap ">
              <div className="inline-block mr-2 md:mr-4">
                <button
                  onClick={() => handleSmartCollectionsTagClick("luxury")}
                  className="flex bg-white text-orange-600 focus:text-white focus:bg-orange-600  rounded-3xl p-2 border shadow-md"
                >
                  <ImFire className="h-6 w-6 md:h-7 md:w-7 " />{" "}
                  <div className="p-1 font-[500]">Luxury</div>
                </button>
              </div>
              <div className="inline-block mr-2 md:mr-4">
                {" "}
                <button
                  onClick={() => handleSmartCollectionsTagClick("eco friendly")}
                  className="flex bg-white rounded-3xl p-2 border shadow-md text-green-600 focus:border-white focus:text-white focus:bg-green-600 "
                >
                  <GiBonsaiTree className="h-6 w-6 md:h-7 md:w-7 " />{" "}
                  <div className="p-1 font-[500]">Eco Friendly</div>
                </button>
              </div>
              <div className="inline-block mr-2 md:mr-4">
                <button
                  onClick={() => handleSmartCollectionsTagClick("ev friendly")}
                  className="flex bg-white p-2 rounded-3xl border text-green-600 focus:text-white focus:bg-green-600  shadow-md"
                >
                  <MdElectricCar className="h-6 w-6 md:h-7 md:w-7" />
                  <div className="p-1 font-[500]">EV Friendly</div>
                </button>
              </div>
              <div className="inline-block mr-2 md:mr-4">
                <button
                  onClick={() =>
                    handleSmartCollectionsTagClick("near top schools")
                  }
                  className="flex bg-white rounded-3xl p-2 border text-blue-600 focus:text-white focus:bg-blue-600  shadow-md"
                >
                  <FiBookOpen className="h-6 w-6 md:h-7 md:w-7 " />
                  <div className="p-1 font-[500]">Top Schools</div>
                </button>
              </div>
              <div className="inline-block mr-2 md:mr-4">
                <button
                  onClick={() => handleSmartCollectionsTagClick("near metro")}
                  className="flex bg-white rounded-3xl p-2 border text-purple-600 focus:text-white focus:bg-purple-600  shadow-md"
                >
                  <FaSubway className="h-6 w-6 md:h-7 md:w-7" />
                  <div className="p-1 font-[500]">Metro Commute</div>
                </button>
              </div>
              <div className="inline-block mr-2 md:mr-4">
                <button
                  onClick={() => handleSmartCollectionsTagClick("near airport")}
                  className="flex bg-white rounded-3xl p-2 border text-purple-600 focus:text-white focus:bg-purple-600  shadow-md"
                >
                  <ImAirplane className="h-6 w-6 md:h-7 md:w-7" />
                  <div className="p-1 font-[500]">Airport Commute</div>
                </button>
              </div>
              <div className="inline-block mr-2 md:mr-4">
                <button
                  onClick={() => handleSmartCollectionsTagClick("popular hubs")}
                  className="flex bg-white rounded-3xl p-2 border text-blue-600 focus:text-white focus:bg-blue-600 shadow-md"
                >
                  <ImOffice className="h-6 w-6 md:h-7 md:w-7" />
                  <div className="p-1 font-[500]">Popular Hubs</div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex z-20 pl-2 md:pl-6 h-full max-h-fit flex-col justify-evenly">
            <div className="flex overflow-x-scroll scrollbar pb-10 hide-scroll-bar">
              <div className="flex flex-nowrap mr-2">
                {/* {smartCollections && smartCollections?.map((val, i) => {
                  return (

                    <div
                      key={i}
                      className="h-[100%] relative mx-auto max-w-lg w-[32rem] mr-3 rounded-lg bg-[#F2F5FC] "
                    >
                      <Link
                        target="__blank"
                        href={`/propertydetails/${val?.property_name.replace(
                          / /g,
                          "-"
                        )}`}
                        className="flex w-full h-4/5 p-2 pb-0"
                      >
                        <div className="w-[35%] mr-2 h-full overflow-hidden rounded-lg">
                          <div
                            className="w-full aspect-square h-full"
                            style={{
                              height: "100%",
                              backgroundImage: `url(${val.thumbnail})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        </div>
                        <div className="w-[65%] flex flex-col justify-between">
                          <div className="flex flex-col mt-1 justify-between">
                            <div className="w-full font-bold text-sm">
                              {val.property_name}
                            </div>
                            <div className="text-blue-600 text-sm pb-2">
                              {val.builder_details?.name}
                            </div>
                          </div>

                          <div className="flex flex-col justify-between">
                            <div className="text-sm"> {val.location}</div>
                            <div className="text-slate-600 text-sm">
                              {val.configuration}
                            </div>
                          </div>

                          <div className="flex justify-between mt-2">
                            <div className="font-bold text-blue-600">
                              {val.price_range == "Price on request"
                                ? val.price_range
                                : `INR ${val.price_range}`}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="relative h-8">
                        <div className="flex sm:hidden w-full absolute -bottom-4 pl-3 py-[0.6rem] sm:py-2 text-xs sm:text-sm rounded-b-lg bg-blue-200 text-blue-500 items-end">
                          {[...new Set(val.tags)].slice(0, 3).map((tag, i) => {
                            return (
                              <div key={i} className="mr-2">
                                #{tag}
                              </div>
                            );
                          })}
                        </div>
                        <div className="hidden sm:flex w-full absolute -bottom-4 pl-3 py-[0.6rem] sm:py-2 text-xs sm:text-sm rounded-b-lg bg-blue-200 text-blue-500 items-end">
                          {[...new Set(val.tags)].slice(0, 4).map((tag, i) => {
                            return (
                              <div key={i} className="mr-2">
                                #{tag}
                              </div>
                            );
                          })}
                        </div>
                        <div className="absolute -bottom-3 rounded-lg  right-1">
                          <button
                            onClick={() => sendInterest(val.property_name)}
                            className="font-roboto text-sm p-1 px-2 border rounded-lg text-white bg-blue-700 hover:bg-blue-800"
                          >
                            Send interest
                          </button>

                        </div>
                      </div>
                    </div>
                  );
                })} */}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleBrowseSmartCollections}
                className="px-6 py-2 font-medium rounded-xl text-blue-500 bg-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Browse All{" >"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Tools Section */}
      {/* <div className="smart-tools-section z-0">
        <div className="absolute w-1/2 bg-blue-500 h-[26.5rem] -z-10"></div>
        <div className="py-12">
          <div className="flex pl-6 h-full justify-end items-center">
            <div className="text-right font-semibold pr-4 text-2xl sm:text-4xl">
              Smart Tools
              <div className="h-1 rounded-l-md absolute right-0 w-40 sm:w-56 bg-purple-500"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col m-auto p-auto">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar scrollbar">
            <div className="flex flex-nowrap lg:ml-20 md:ml-10 ml-1 ">
              <div className="inline-block relative px-3 rounded-xl">
                <div
                  style={{
                    height: "100%",
                    width: "30rem",
                    backgroundImage: `url(https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="w-[30rem] h-64 p-6 max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <div className="text-white p-2 font-medium text-4xl">
                    EMI Calculator
                  </div>
                  <div className="text-white p-2 py-4">
                    Calculate your EMI payment in just one click.
                  </div>
                  <button className="absolute bottom-4 rounded-xl bg-white px-4 py-2 text-blue-500 border border-blue-500">
                    Try out EMI Calculator
                  </button>
                </div>
              </div>
              <div className="inline-block relative px-3">
                <div
                  style={{
                    height: "100%",
                    backgroundImage: `url(https://img.freepik.com/free-photo/top-view-black-calculator-female-hands-black-table-free-space_140725-144495.jpg?size=626&ext=jpg&ga=GA1.1.1315444499.1688755986&semt=ais)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className=" w-96 h-64 p-6 max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <div className="text-white w-full p-2 font-medium text-4xl">
                    Affordability Calculator
                  </div>
                  <div className="text-white w-full p-2 py-4">
                    <div className="block">
                      Explore your new home budget with our interactive
                      affordability calculator!
                    </div>
                  </div>
                  <button className="absolute bottom-4 rounded-xl bg-white px-4 py-2 text-blue-500 border border-blue-500">
                    Try out Affordability Calculator
                  </button>
                </div>
              </div>
              <div className="inline-block relative px-3 rounded-xl">
                <div
                  style={{
                    height: "100%",
                    width: "30rem",
                    backgroundImage: `url(https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="w-[30rem] h-64 p-6 max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <div className="text-white p-2 font-medium text-4xl">
                    EMI Calculator
                  </div>
                  <div className="text-white p-2 py-4">
                    Calculate your EMI payment in just one click.
                  </div>
                  <button className="absolute bottom-4 rounded-xl bg-white px-4 py-2 text-blue-500 border border-blue-500">
                    Try out EMI Calculator
                  </button>
                </div>
              </div>
              <div className="inline-block relative px-3 rounded-xl">
                <div
                  style={{
                    height: "100%",
                    width: "30rem",
                    backgroundImage: `url(https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="w-[30rem] h-64 p-6 max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <div className="text-white p-2 font-medium text-4xl">
                    EMI Calculator
                  </div>
                  <div className="text-white p-2 py-4">
                    Calculate your EMI payment in just one click.
                  </div>
                  <button className="absolute bottom-4 rounded-xl bg-white px-4 py-2 text-blue-500 border border-blue-500">
                    Try out EMI Calculator
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Partner with us Section */}
      <div className="partner-with-us-section bg-gradient-to-bl from-[#D8EDFE] via-[#FFFFFF] to-[#F2E9FF]">
        <div className="grid grid-cols-1 md:grid-cols-2 relative h-full">
          <div className="flex h-[calc(100vh-68.8px)] justify-end items-center md:p-8 lg:pl-4 xl:pl-18 py-2 md:py-0">
            <div className="text-left pl-10 py-8 md:py-4 lg:py-24 text-2xl sm:text-4xl">
              <span className="font-semibold z-0 relative">
                Partner With Us
                <div className="h-1 rounded-md absolute z-10  left-0 w-52 sm:w-64 bg-blue-500"></div>
              </span>
              <div className="text-base lg:text-lg text-left mt-6 mb-2 pr-12 md:pr-4 lg:pr-24 xl:pr-32">
                Ready to take your projects to new heights? Partner with us and
                gain access to a pool of genuine, motivated buyers who are
                eagerly searching for for their dream homes.
              </div>
              <div className="text-base lg:text-lg mt-6 mb-2 pr-12 md:pr-4 lg:pr-24 xl:pr-32">
                Join forces with SmartNeev to launch your projects, connect with
                quality buyers, and embark on a journey of unparalleled success
                in the real estate market.
              </div>
              <Interest
                session={session}
                cssclass={
                  "font-roboto text-base p-2 px-3 mt-16 md:p-3 md:px-6 border rounded-lg text-white bg-blue-500 hover:bg-blue-700"
                }
              />
            </div>
          </div>
          <div className="flex justify-center items-center md:h-[calc(100vh-68.8px)]  bg-blue-500">
            <img
              src="https://images.unsplash.com/photo-1551361415-69c87624334f?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className=" h-[calc(100vh-68.8px)] w-full"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="stay-updated-section md:h-[calc(100vh-68.8px) bg-gradient-to-bl  from-[#D8EDFE] via-[#FFFFFF] to-[#F2E9FF]">
        <div className="py-10 relative h-full">
          <div className="flex justify-center items-center">
            <div className="text-center w-56 font-semibold text-2xl sm:text-4xl">
              Stay Updated
              <div className="h-1 rounded-md absolute w-56 sm:w-56 bg-blue-500"></div>
            </div>
          </div>
          <div className="p-1 px-4 py-4 mb-4 text-center text-base md:text-lg">
            Stay updated with the listings, property deals and price change
            information in your area with our Blog Feed.
          </div>
          <div className="flex flex-col m-auto p-auto justify-between">
            <div className="flex overflow-x-scroll overflow-y-hidden h-80 hide-scroll-bar scrollbar">
              <div className="flex flex-nowrap h-80">
                {latestblogs?.map((val, i) => (
                  <Link
                    target="__blank"
                    href={`/blog/${val.shortname}`}
                    key={i}
                    className="inline-block  w-80 h-80 relative px-3 rounded-xl"
                  >
                    <div className=" w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                      <div className=" font-medium text-4xl">
                        <Image
                          src={val.image}
                          alt=""
                          width={360}
                          height={300}
                        />
                      </div>
                      <div className="pl-4 pr-4 text-medium">
                        <div className="font-medium line-clamp-2 pt-2">
                          {val.title}
                        </div>
                        <div className=" pt-2">
                          {val.date &&
                            new Date(val.date).toLocaleDateString(
                              "en-US",
                              options
                            )}
                        </div>
                        <div className="text-blue-500 py-2">{val.category}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button className="p-2 px-3 rounded-md my-3 text-white bg-blue-500 hover:bg-blue-700">
                <Link target="__blank" href={"/blog"}>
                  Browse all
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-between">
          <div className="flex flex-col h-fit">
            <div className="flex overflow-x-scroll h-fit scrollbar hide-scroll-bar">
              <div className="flex flex-nowrap ml-2 h-fit">
                {latestblogs.map((val, i) => (
                  <Link
                    href={`/blog/${val.id}`}
                    key={i}
                    className="inline-block w-80 h-fit sm:w-96 relative px-3 rounded-xl"
                  >
                    <div className=" w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                      <div className=" font-medium text-4xl">
                        <Image
                          src={val.image}
                          alt=""
                          width={360}
                          height={300}
                        />
                      </div>
                      <div className="pl-4 pr-4 text-medium">
                        <div className="font-medium pt-2">
                          {val.title.split(" ").slice(0, 11).join(" ")}
                          {"..."}
                        </div>
                        <div className=" pt-2">
                          {val.date &&
                            new Date(val.date).toLocaleDateString(
                              "en-US",
                              options
                            )}
                        </div>
                        <div className="text-blue-500 py-2">{val.category}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

            <div className="flex justify-center pt-12">
              <button className="p-2 px-3 rounded-md my-3 text-white bg-blue-500 hover:bg-blue-700">
                <Link target="__blank" href={"/blog"}>
                  Browse Blogs
                </Link>
              </button>
          </div>
          </div> */}

      <div className="homeowners-section  h-[calc(100vh-68.8px)] ">
        <div className="md:hidden md:h-[calc(100vh-68.8px)] ">
          <Testimonial />
        </div>
        <div className="hidden md:block font-roboto">
          <section className=" h-[calc(100vh-68.8px)]  flex justify-center items-center max-h-[calc(100vh-68.8px)]  bg-gradient-to-tr from-[#1D4ED8] to-[#8C52FF]">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
              <h2 className="text-center pb-14 text-white text-2xl font-semibold tracking-tight sm:text-4xl">
                Hear it from our happy homeowners
              </h2>

              <div className="mt-8 mx-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
                <blockquote className="rounded-lg bg-gray-50 p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col justify-between h-full">
                    <div className="">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-blue-700 text-[15px]">
                            <FaQuoteLeft />
                          </div>
                        </div>
                      </div>
                      <p className="text-sm ">
                        I discovered a property that perfectly matched my
                        lifestyle and preferences. The platform’s quiz and
                        geniune listings saved me time and frustration. Truly a
                        game-changer in the real estate market!
                      </p>
                      <div className="text-blue-700 text-[15px]">
                        <FaQuoteRight className="ml-auto" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="text-center">
                        <h2 className="text-lg font-medium">
                          Devendra Jain, Gurgaon
                        </h2>
                        <p className="text-gray-600">Home Buyer</p>
                      </div>
                    </div>
                  </div>
                </blockquote>
                <blockquote className="rounded-lg bg-gray-50 p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col justify-between h-full">
                    <div className="">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-blue-700 text-[15px]">
                            <FaQuoteLeft />
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        The personalized recommendations and transparent
                        information made my search effortless. And the best part
                        is that they do not ask for your phone number and spam
                        you like other platforms. Highly recommended!
                      </p>
                      <div className="text-blue-700 text-[15px]">
                        <FaQuoteRight className="ml-auto" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="text-center">
                        <h2 className="text-lg font-medium">
                          Ravi Goel, Gurgaon
                        </h2>
                        <p className="text-gray-600">Home Buyer</p>
                      </div>
                    </div>
                  </div>
                </blockquote>
                <blockquote className="rounded-lg bg-gray-50 p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col justify-between h-full">
                    <div className="">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-blue-700 text-[15px]">
                            <FaQuoteLeft />
                          </div>
                        </div>
                      </div>
                      <p className="text-sm ">
                        This platform connected me with genuine buyers who
                        appreciated the quality and value of our projects. It
                        significantly boosted our sales and brand reputation in
                        the market!
                      </p>
                      <div className="text-blue-700 text-[15px]">
                        <FaQuoteRight className="ml-auto" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="text-center">
                        <h2 className="text-lg font-medium">Vikas, Gurgaon</h2>
                        <p className="text-gray-600">Real Estate Developer</p>
                      </div>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
