import { ImLocation } from "react-icons/im";
import Text from "../../components/carouselComponents/text";
import Image from "next/image";
import Photo from "../../components/carouselComponents/photo";
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
import { CgGames } from "react-icons/cg";
import { IoRestaurantSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { VscBellDot } from "react-icons/vsc";
import { BiPowerOff } from "react-icons/bi";
import { PiLockKeyOpenFill } from "react-icons/pi";
import { GiVacuumCleaner, GiTreeSwing, GiPartyPopper } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";
import { FaDumbbell, FaHome, FaSwimmer, FaGasPump, FaChild } from "react-icons/fa";
import {
  MdOutlineContactPage,
  MdElevator,
  MdSportsHandball,
} from "react-icons/md";
import Link from "next/link";
import Navbar from "../components/navbar";


export default function propertydetails() {
  console.log("ssr");

  const images = [
    {
      original:
        "https://res.cloudinary.com/smartneev/image/upload/c_scale,h_300,w_600/v1695136641/Blog%20Pics/top_cities_f68zje.png",
      thumbnail:
        "https://res.cloudinary.com/smartneev/image/upload/c_scale,h_150,w_250/v1695136641/Blog%20Pics/top_cities_f68zje.png",
    },
    {
      original: "https://picsum.photos/id/1015/600/300/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/600/300/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/600/300/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/600/300/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/600/300/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/600/300/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/600/300/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/600/300/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/600/300/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1020/600/300/",
      thumbnail: "https://picsum.photos/id/1020/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/600/300/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/600/300/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/600/300/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/600/300/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/600/300/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1018/600/300/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/600/300/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
  ];
  return (
    <div className="bg-white font-roboto">
      <NextNProgress color="#4f6df3" height={5}/>
      <Navbar />
      <div className="pt-4 pl-3 md:px-12 lg:px-28">
          <div className="flex justify-normal">
          <Link href={"/"}><FaHome className="m-1"/></Link><IoIosArrowForward className="m-1"/><Link href="/Filter&Sort/FilterSearch" className="text-sm font-medium mt-[0.05rem]">Property Details</Link><IoIosArrowForward className="m-1"/><span className="text-sm font-medium mt-[0.05rem]">Property Name xyz</span>
          </div>
        </div>
        <div className=" py-4 pt-6 md:px-12 lg:px-28">
        {/* <Photo images={images} /> */}
      </div>
      <div className="flex overflow-hidden font-roboto px-3 md:px-12 lg:px-28 relative xl:justify-center my-2 rounded-lg mb-4 hide-scroll-bar ">
        <div className="p-1 navigationsproperty rounded-lg w-full scrollbar  overflow-auto whitespace-nowrap bg-[#F2F5FC]">
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
              href={"#ratings"}
              className="flex w-40 sm:w-48 justify-center text-sm sm:text-base p-2 sm:p-4 sm:py-2 h-full focus:bg-blue-500 focus:text-white font-semibold overflow-hidden rounded-lg focus:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <div className="text-center">Ratings and Reviews</div>
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

      <div className="flex overflow-hidden pb-3 font-roboto pl-7 md:pl-16 lg:pl-28 gap-3">
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
          <span className="font-[400]">Ready To Move</span>
        </div>
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
          <span className="font-[400] ">93% Match</span>
        </div>
      </div>
      <div className="grid overflow-hidden font-roboto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3 md:px-12 lg:px-24">
        <div className="header sm:col-span-1 animate__animated animate__fadeUp animate__delay-2s md:col-span-2 lg:col-span-3 px-4 py-2">
          <div className="text-xl md:text-2xl lg:text-3xl mb-2 font-bold">
            Parsvnath Paramount Penthouse
          </div>
          <div className="text-slate-500 mb-2 text-sm">
            By Parsvnath Developers Limited
          </div>
          <div className="text-sm pt-1 text-slate-500 mb-2">
            <span>
              <ImLocation className="inline mr-1 mb-1" size={"1rem"} />
            </span>
            <span className="mr-5">Gurgaon{"   "}</span>{" "}
            <span>3, 4, 5 BHK Apts</span>
          </div>
          <div className="texl-xl mb-2 md:text-2xl font-semibold">
            ₹ 3.09 Cr - 4.5 Cr
          </div>
          <div className="mb-1">
            <span className="font-semibold">Highlights: </span>
            <span className="font-semibold text-blue-500">
              #near airport #near airport #near airport #near airport
            </span>
          </div>
          {/* <div className="flex">
            <div className="border text-sm px-2 my-1 text-blue-500 font-bold rounded-xl border-blue-500 p-1 bg-blue-50">
              +3 more
            </div>
          </div> */}
        </div>
        <div className="font-roboto sm:col-span-1 p-3">
          <div className="grid grid-cols-1">
            <div className="flex justify-between">
              <Link href={"/"} className="rounded-xl bg-white m-1 shadow-lg p-3">
                <VscBellDot size={"1.5rem"} />
              </Link>
              <Link
                href={"/"}
                className="rounded-xl bg-white m-1 shadow-lg p-3"
              >
                <BsHeart size={"1.5rem"} />
              </Link>
              <Link
                href={"/"}
                className="rounded-xl bg-white m-1 shadow-lg p-3"
              >
                <BsShareFill size={"1.5rem"} />
              </Link>
              <Link
                href={"/"}
                className="rounded-xl bg-white m-1 shadow-lg p-3"
              >
                <MdOutlineContactPage size={"1.5rem"} />
              </Link>
            </div>
          </div>
          <div className="mt-2 shadow-lg bg-white rounded-xl py-4 ">
            <div className="flex justify-center">
              <div className="font-semibold text-xl">Get Best Deals</div>
            </div>
            <div className="flex justify-center">
              <div className="text-md text-center py-2 font-semibold px-auto">
                Send interest to get best deals.
              </div>
            </div>
            <div className="flex my-1 mb-2 justify-center">
              <button className="px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700" >Send Interest</button>

            </div>
          </div>
        </div>
      </div>

      {/* About Penthouse */}
      <div
        id="aboutproject"
        className="font-roboto mx-3 md:mx-12 lg:mx-24 my-4 md:my-10 max-h-100vh"
      >
        <div className="bg-[#F2F5FC] p-4 md:p-8 rounded-lg shadow-xl">
          <div className="font-bold mb-3 md:pl-6  text-xl md:text-2xl lg:text-3xl ">
            About Penthouse
          </div>
          <div className="md:pl-6">
            <Text
              text={
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit eum dolor maxime excepturi aperiam ea temporibus natus odio voluptatum impedit! Veritatis, fugit impedit porro nobis aspernatur repudiandae saepe dignissimos. Repudiandae ratione illum dolore neque eum! Aliquam, pariatur id hic voluptates molestiae deleniti illum, repellendus quasi sequi temporibus voluptate dicta asperiores magnam. Corrupti aperiam unde fugit adipisci saepe, ducimus labore illo ipsam itaque molestiae veniam ipsa quae assumenda vitae, expedita perspiciatis rem amet velit porro laborum a impedit vel. Laudantium, ipsa fugiat. Maxime beatae vel dolore pariatur! Exercitationem, quas doloribus, debitis quo eum provident fugiat ratione optio temporibus nihil, velit laboriosam!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit eum dolor maxime excepturi aperiam ea temporibus natus odio voluptatum impedit! Veritatis, fugit impedit porro nobis aspernatur repudiandae saepe dignissimos. Repudiandae ratione illum dolore neque eum! Aliquam, pariatur id hic voluptates molestiae deleniti illum, repellendus quasi sequi temporibus voluptate dicta asperiores magnam. Corrupti aperiam unde fugit adipisci saepe, ducimus labore illo ipsam itaque molestiae veniam ipsa quae assumenda vitae, expedita perspiciatis rem amet velit porro laborum a impedit vel. Laudantium, ipsa fugiat. Maxime beatae vel dolore pariatur! Exercitationem, quas doloribus, debitis quo eum provident fugiat ratione optio temporibus nihil, velit laboriosam!"
              }
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Status</div>
              <div className="font-semibold text-blue-500 text-lg">
                New Launch
              </div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Launch Date</div>
              <div className="font-semibold text-blue-500 text-lg">July 16</div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Total Units</div>
              <div className="font-semibold text-blue-500 text-lg">21</div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Property Type</div>
              <div className="font-semibold text-blue-500 text-lg">Flat</div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Project Area</div>
              <div className="font-semibold text-blue-500 text-lg">
                1400 Sq-yrd
              </div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Sale Type</div>
              <div className="font-semibold text-blue-500 text-lg">New</div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Full Address</div>
              <div className="font-semibold text-blue-500 text-lg">
                Khyber pass, magazine road, civil lines, Gurgaon
              </div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Pincode</div>
              <div className="font-semibold text-blue-500 text-lg">110059</div>
            </div>
            <div className="p-3 md:p-6">
              <div className="text-slate-800">Project Website</div>
              <button
                href={"/"}
                className="flex font-semibold  py-1 text-blue-500 text-sm"
              >
                {" "}
                <div className="bg-blue-200 px-3 rounded-xl shadow-xl flex">
                  <BsLink className="w-8 h-8" />
                  <span className="pt-1 w-24 text-center">Website Link</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div
        id="amenities"
        className=" font-roboto px-3 md:px-12 lg:px-24 py-4 md:py-10"
      >
        <div className=" bg-[#F2F5FC] p-4 md:p-8 lg:p-12 rounded-lg shadow-xl">
          <div className="mb-5 font-bold text-xl md:text-2xl lg:text-3xl ">
            Amenities in Parsvnath Paramount Penthouse
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
            <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
              <div className="">
                <div className="text-white flex justify-center">
                  <RiPlantFill size={"2rem"} />
                </div>
                <div className="text-white text-center text-xs">Gardens</div>
              </div>
            </div>
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
            <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
              <div className="">
                <div className="text-white flex justify-center">
                  <MdElevator size={"2rem"} />
                </div>
                <div className="text-white text-center text-xs">Lift</div>
              </div>
            </div>
            <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
              <div className="">
                <div className="text-white flex justify-center">
                  <FaDumbbell size={"2rem"} />
                </div>
                <div className="text-white text-center text-xs">Gym</div>
              </div>
            </div>
            <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
              <div className="">
                <div className="text-white flex justify-center">
                  <BsFillHouseFill size={"2rem"} />
                </div>
                <div className="text-white text-center text-xs">Club House</div>
              </div>
            </div>
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
            {/* <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
              <div className="">
                <div className="text-white flex justify-center">
                  <FaGasPump size={"2rem"} />
                </div>
                <div className="text-white text-center text-xs">
                  Gas Pipeline
                </div>
              </div>
            </div> */}
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
            {/* <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
              <div className="">
                <div className="text-white flex justify-center">
                  <GiVacuumCleaner size={"2rem"} />
                </div>
                <div className="text-white text-center text-xs">
                  Servant Room
                </div>
              </div>
            </div> */}
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
            <div className="border flex justify-center items-center  w-[7rem] md:w-[7.6rem] h-20 rounded-lg border-blue-500 bg-blue-400 bg-gradient-to-t from-purple-500 to-blue-500">
              <div className="">
                <div className="text-white flex justify-center">
                  <GiPartyPopper size={"2rem"} />
                </div>
                <div className="text-white text-center text-xs">Party Hall</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specification */}
      <div
        id="specifications"
        className="font-roboto px-3 md:px-12 lg:px-24 py-4 md:py-10 max-h-100vh"
      >
        <div className="bg-[#F2F5FC] p-4 md:p-8 lg:p-12 rounded-lg shadow-xl">
          <div className="font-bold text-xl md:text-2xl lg:text-3xl ">
            Specifications
          </div>
          <div className="flex justify-between bg-blue-100 font-semibold my-4 rounded-lg overflow-hidden">
            <Link
              href={"/"}
              className="text-center w-full h-full focus:text-white py-3 focus:bg-blue-500 transition-all duration-500"
            >
              3 BHK
            </Link>
            <Link
              href={"/"}
              className="text-center w-full h-full focus:text-white py-3 focus:bg-blue-500 transition-all duration-500"
            >
              4 BHK
            </Link>
            <Link
              href={"/"}
              className="text-center w-full h-full focus:text-white py-3 focus:bg-blue-500 transition-all duration-500"
            >
              5 BHK
            </Link>
          </div>
          <div className="grid pl-8 grid-cols-1 gap-4 lg:gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((key, val) => (
              <div key={key} className="flex justify-center w-full h-30">
                <div className="w-1/2 h-full">
                  <Image
                    width={500}
                    height={500}
                    className="rounded-lg border border-black w-full h-full"
                    src="https://res.cloudinary.com/smartneev/image/upload/v1695136640/Blog%20Pics/Property_registeration_jypkxo.png"
                    alt="img"
                  />
                </div>
                <div className="flex justify-center items-center h-full w-full">
                  <div className="ml-4 w-full">
                    <div className="underline font-medium mb-2">Layout</div>
                    <div className="flex">
                      <div className="font-medium text-sm">Size: </div>
                      <div className="font-medium text-sm">4835 Sq.ft.</div>
                    </div>
                    <div className="flex">
                      <div className="font-medium text-sm">Price: </div>
                      <div className="font-medium text-sm">₹ 3.09 Cr.</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Properties in Parsvnath Paramount Penthouse */}
      {/*
      <div className="font-roboto md:pb-3 md:pt-10 px-3 md:pl-12 lg:pl-24 texl-xl  md:text-2xl lg:text-4xl font-bold">
        Properties in Parsvnath Paramount Penthouse
      </div>
      <div className="flex px-3 md:pl-12 lg:pl-24">
        <Link
          href={"/"}
          className=" rounded-lg px-2 my-4 mr-3 border border-blue-500 bg-blue-300"
        >
          {" "}
          All{" "}
        </Link>
        <Link
          href={"/"}
          className="focus:bg-blue-300 focus:border-blue-500 transition-all duration-500 rounded-lg px-2 my-4 mr-3 border border-black bg-slate-300"
        >
          {" "}
          3 BHK{" "}
        </Link>
        <Link
          href={"/"}
          className="focus:bg-blue-300 focus:border-blue-500 transition-all duration-500 rounded-lg px-2 my-4 mr-3 border border-black bg-slate-300"
        >
          {" "}
          4 BHK{" "}
        </Link>
        <Link
          href={"/"}
          className="focus:bg-blue-300 focus:border-blue-500 transition-all duration-500 rounded-lg px-2 my-4 mr-3 border border-black bg-slate-300"
        >
          {" "}
          5 BHK{" "}
        </Link>
      </div>
      <div className="font-roboto flex px-3 md:pl-12 lg:pl-24 flex-col">
        <div className="flex overflow-x-scroll scrollbar pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap mr-2">
            {[1, 2, 3, 4, 5].map((val, i) => (
              <div
                key={i}
                className="h-full relative mx-auto w-[28rem] mr-3 rounded-lg bg-white"
              >
                <div className="flex w-full p-2">
                  <div className="w-2/5 mr-2 overflow-hidden rounded-lg">
                    <div
                      className=""
                      style={{
                        height: "100%",
                        backgroundImage: `url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                  <div className="w-3/5">
                    <div className="flex justify-between">
                      <div className="font-bold text-blue-600">रु. 3.09 Cr</div>
                    </div>

                    <div className="text-slate-300 sm:pb-2 text-sm">
                      18000/Sq.ft
                    </div>
                    <div className="text-blue-600 text-sm">
                      Parsvnath Developers Limited
                    </div>
                    <div className="font-bold text-sm">
                      Parsvanth Pramount Penthouse
                    </div>
                    <div className="text-sm">
                      Khyber Pass, Magazine Road, Civil lines
                    </div>
                    <div className="text-slate-300 sm:pb-2 text-sm">
                      3BHK Apt. {"  "}4835 Sq.ft
                    </div>
                  </div>
                </div>
                <div className="flex pl-3 py-[0.6rem] sm:py-2 text-xs sm:text-sm rounded-b-lg bg-blue-200 text-blue-500 items-end">
                  #near airport #near airport #near airport
                </div>
                <div className="absolute bottom-1.5 rounded-lg  right-1">
                <Link className="font-roboto text-sm p-1 px-2 border rounded-lg text-white bg-blue-700 hover:bg-blue-800" href={"/"}>Send interest</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
*/}
      {/* About Developer Section */}
      <div
        id="aboutdeveloper"
        className="font-roboto px-3 py-4 md:py-10 md:px-12 lg:px-24"
      >
        <div className="md:flex w-full gap-4">
          <div className="w-full p-4 md:p-8 lg:p-12 rounded-xl shadow-lg bg-[#F2F5FC] ">
            <div className="mb-3 font-bold text-xl md:text-2xl lg:text-3xl ">
              About Developer
            </div>
            {/* <div className="mb-1 font-semibold text-xl">
              Parasvnath Developer Limited
            </div>
            <div className="mb-3 font-semibold text-slate-400 text-sm">
              New Delhi, delhi
            </div> */}
            <div className="text-md">
              <Text text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, consequuntur beatae ex, provident vitae facilis consectetur eum ipsa facere voluptates, quasi reprehenderit sit doloribus cupiditate. Autem id obcaecati, maxime asperiores in dolor minus quo eos similique praesentium inventore esse vitae reiciendis ab labore, porro deleniti mollitia eligendi voluptas aperiam facilis ipsum. Neque, eum deserunt quasi natus pariatur laborum placeat saepe illum vero nemo ad esse. Praesentium possimus, aperiam illo ratione earum provident beatae, amet eligendi neque culpa assumenda. Dolore rerum corporis impedit modi tenetur quia labore! Nostrum nulla quo, ipsam maiores tempore eius ea possimus laboriosam, nemo veniam, assumenda voluptatibus."}/>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <div className="p-3 pl-0 md:pl-0 md:p-6">
                <div className="text-slate-800">Developer&apos;s Name</div>
                <div className="font-semibold text-blue-500 text-lg">
                  xyz developer
                </div>
              </div>
              <div className="p-3 pl-0 md:pl-0 md:p-6">
                <div className="text-slate-800">Experience</div>
                <div className="font-semibold text-blue-500 text-lg">
                  xyz years
                </div>
              </div>
              <div className="p-3 pl-0 md:pl-0 md:p-6">
                <div className="text-slate-800">Total Properties</div>
                <div className="font-semibold text-blue-500 text-lg">21</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Rating and Reviews Section */}
      {/* <div
        id="ratings"
        className="font-roboto mt-10 group-autofill:flex px-6 py-4 md:py-10 md:pl-16 lg:pl-28 flex-col"
      >
        <div className="font-bold text-xl mb-3 md:mb-6 md:text-2xl lg:text-4xl">
          Rating and Reviews
        </div>
        <div className="flex overflow-x-scroll scrollbar pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap mr-2">
            {[1, 2, 3, 4, 5].map((val, i) => (
              <div
                key={i}
                className="inline-block  w-[19.2rem] sm:w-96 relative pr-3 rounded-xl"
              >
                <div class="p-4 md:p-6 h-full bg-white w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <div className="flex justify-between">
                    <div className="text-blue-500">
                      <AiFillMessage size={"2.5rem"} />
                    </div>
                    <div className="">
                      <div className="flex">
                        <BsStarFill
                          className=" text-[#e8d260] mx-1"
                          size={"2rem"}
                        />
                        <BsStarFill
                          className=" mx-1 text-[#e8d260]"
                          size={"2rem"}
                        />
                        <BsStarFill
                          className="  mx-1 text-[#e8d260]"
                          size={"2rem"}
                        />
                        <BsStarFill
                          className=" mx-1 text-[#e8d260]"
                          size={"2rem"}
                        />
                        <BsStarFill
                          className=" mx-1 text-slate-300"
                          size={"2rem"}
                        />
                      </div>
                      <div className="float-right p-2 text-xs">30 reviews</div>
                    </div>
                  </div>
                  <div className="py-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt porro praesentium saepe cumque facere,
                    reprehenderit laudantium eveniet dolores, voluptatum rerum
                    illum inventore itaque natus architecto commodi optio
                    assumenda voluptatem error perspiciatis consectetur incidunt
                    repellendus exercitationem? Sequi, enim ratione? Aperiam
                    adipisci odio itaque commodi soluta perferendis repellendus
                    nihil quam error. Inventore molestias soluta facere hic
                    saepe dolorum mollitia ad, voluptates esse.
                  </div>
                  <div className="font-semibold">Home Buyer</div>
                  <div className="font-semibold">Sonjor, Gurgaon.</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div id="reachout" className=""></div>
      {/* Reachout */}
      <div className="font-roboto  px-3 md:px-12 lg:px-24 py-4 md:py-10 max-h-100vh">
        <div className="bg-[#F2F5FC] p-3 md:p-6 rounded-lg shadow-xl">
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-700 p-2">
              <BsFillEnvelopeFill className=" text-white" size={"2rem"} />
            </div>
            <div className="font-semibold p-2 text-blue-600 text-sm pt-3 md:pt-2 md:text-xl">
              Reach Out To Us For Assistance
            </div>
          </div>
          <div className="text-center text-sm md:text-base py-2">
            Ask a question about the property and we will get back to you within
            24 hours!
          </div>
          <div class="mb-6 flex justify-center">
            <textarea
              placeholder="Ask a Question..."
              className=" border-white rounded-lg bg-blue-300"
              id="w3review"
              name="w3review"
              rows="8"
              cols="100"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
            >
              Send Message
            </button>
          </div>
          {/*<div className="text-center py-2 text-slate-500 text-sm md:text-base">
            By sending message, you agree that..........
          </div>*/}
        </div>
      </div>
      {/* Nearby Properties */}
      <div
        id="NearbyProperties"
        className="font-roboto pb-3 md:pb-6 md:pt-10 px-3 md:pl-12 lg:pl-24 texl-xl  md:text-2xl lg:text-3xl font-bold"
      >
        Nearby Properties
      </div>
      <div className="flex px-3 md:pl-12 lg:pl-24 flex-col">
        <div className="flex overflow-x-scroll scrollbar pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap mr-2">
            {[1,2,3,4].map((val, i) => {
              return (
                <div
                  key={i}
                  className="h-full relative mx-auto w-[29rem] mr-3 rounded-lg bg-[#F2F5FC] "
                >
                  <Link
                    href={`/propertydetails`}
                    className="flex w-full h-4/5 p-2 pb-0"
                  >
                    <div className="w-40 h-full mr-2 overflow-hidden rounded-lg">
                      <div
                        className="w-full h-full"
                        style={{
                          height: "100%",
                          backgroundImage: `url()`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                    </div>
                    <div className="w-3/5">
                      <div className="flex justify-between">
                        <div className="font-bold text-blue-600">
                        रु. 3.09 Cr
                        </div>
                      </div>

                      <div className="text-slate-600 sm:pb-2 text-sm">
                        18000/Sq.ft
                      </div>
                      
                      <div className="font-bold text-sm">
                      Parsvanth Pramount Penthouse
                      </div>
                      <div className="text-blue-600 text-sm">
                      Parsvnath Developers Limited
                      </div>
                      <div className="text-sm"> Khyber Pass, Magazine Road, Civil lines</div>
                      <div className="text-slate-600 text-sm">
                      3BHK Apt. 4835 Sq.ft
                      </div>
                    </div>
                  </Link>
                  <div className="relative h-8">
                    <div className="flex w-full absolute -bottom-4 pl-3 py-[0.6rem] sm:py-2 text-xs sm:text-sm rounded-b-lg bg-blue-200 text-blue-500 items-end">
                      #near airport #near airport #near airport
                    </div>
                    <div className="absolute -bottom-2.5 rounded-lg  right-1">
                      <Link
                        className="font-roboto text-sm p-1 px-2 border rounded-lg text-white bg-blue-700 hover:bg-blue-800"
                        href={"/"}
                      >
                        Send interest
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
    </div>
  );
}
