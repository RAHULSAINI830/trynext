import { useState, useEffect } from "react";
import { BsFillHouseFill, BsCarFrontFill } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { IoRestaurantSharp } from "react-icons/io5";
import { BiPowerOff } from "react-icons/bi";
import { PiLockKeyOpenFill } from "react-icons/pi";
import { GiTreeSwing, GiPartyPopper } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";
import { FaDumbbell, FaSwimmer } from "react-icons/fa";
import {
  MdOutlineContactPage,
  MdElevator,
  MdSportsHandball,
} from "react-icons/md";
export default function AmenitiesFilter({ onAmenitiesChange, resetSignal }) {
  const [clicked, setClicked] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const handleAmenitiesClick = (amenity) => {
    setSelectedAmenities((prevSelectedAmenities) =>
      prevSelectedAmenities.includes(amenity)
        ? prevSelectedAmenities.filter((item) => item !== amenity)
        : [...prevSelectedAmenities, amenity]
    );
  };
  useEffect(() => {
    onAmenitiesChange(selectedAmenities);
  }, [selectedAmenities, onAmenitiesChange]);
  useEffect(() => {
    if (resetSignal) {
      // Reset your filters in this child component
      setSelectedAmenities([]);
    }
  }, [resetSignal]);
  return (
    <div className="w-full px-2">
      <h1 className=" flex  text-black text-lg pl-6 font-semibold pb-3">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => setClicked(!clicked)}
        >
          <span className="text-base">Amenities</span>{" "}
          {/* <span className="px-4 ml-2">{clicked ? "▼" : "▲"}</span> */}
        </button>
      </h1>
      <div
        className={`px-4 w-full ${clicked ? "hidden" : ""}`}
      >
        <div className="grid grid-cols-3 gap-3 pb-4">
          <button
            onClick={() => handleAmenitiesClick("Garden")}
            className={`border flex justify-center items-center h-20 rounded-lg border-blue-500 bg-blue-600  ${
              selectedAmenities.includes("Garden")
                ? ""
                : "bg-gradient-to-t from-purple-500 to-blue-500"
            }`}
          >
            <div className="">
              <div className="text-white flex justify-center">
                <RiPlantFill size={"2rem"} />
              </div>
              <div className="text-white text-center text-xs">Gardens</div>
            </div>
          </button>
          <button
            onClick={() => handleAmenitiesClick("Power Backup")}
            className={`border flex justify-center items-center   h-20 rounded-lg border-blue-500 bg-blue-600  ${
              selectedAmenities.includes("Power Backup")
                ? ""
                : "bg-gradient-to-t from-purple-500 to-blue-500"
            }`}
          >
            <div className="">
              <div className="text-white flex justify-center">
                <BiPowerOff size={"2rem"} />
              </div>
              <div className="text-white text-center text-xs">Power Backup</div>
            </div>
          </button>
          <button
            onClick={() => handleAmenitiesClick("Lift")}
            className={`border flex justify-center items-center   h-20 rounded-lg border-blue-500 bg-blue-600  ${
              selectedAmenities.includes("Lift")
                ? ""
                : "bg-gradient-to-t from-purple-500 to-blue-500"
            }`}
          >
            <div className="">
              <div className="text-white flex justify-center">
                <MdElevator size={"2rem"} />
              </div>
              <div className="text-white text-center text-xs">Lift</div>
            </div>
          </button>
          <button
            onClick={() => handleAmenitiesClick("Gymnasium")}
            className={`border flex justify-center items-center  h-20 rounded-lg border-blue-500 bg-blue-600  ${
              selectedAmenities.includes("Gymnasium")
                ? ""
                : "bg-gradient-to-t from-purple-500 to-blue-500"
            }`}
          >
            <div className="">
              <div className="text-white flex justify-center">
                <FaDumbbell size={"2rem"} />
              </div>
              <div className="text-white text-center text-xs">Gym</div>
            </div>
          </button>
          <button
            onClick={() => handleAmenitiesClick("Clubhouse")}
            className={`border flex justify-center items-center h-20 rounded-lg border-blue-500 bg-blue-600  ${
              selectedAmenities.includes("Clubhouse")
                ? ""
                : "bg-gradient-to-t from-purple-500 to-blue-500"
            }`}
          >
            <div className="">
              <div className="text-white flex justify-center">
                <BsFillHouseFill size={"2rem"} />
              </div>
              <div className="text-white text-center text-xs">Club House</div>
            </div>
          </button>
          <button
            onClick={() => handleAmenitiesClick("Swimming Pool")}
            className={`border flex justify-center items-center  h-20 rounded-lg border-blue-500 bg-blue-600  ${
              selectedAmenities.includes("Swimming Pool")
                ? ""
                : "bg-gradient-to-t from-purple-500 to-blue-500"
            }`}
          >
            <div className="">
              <div className="text-white flex justify-center">
                <FaSwimmer size={"2rem"} />
              </div>
              <div className="text-white text-center text-xs">Symming Pool</div>
            </div>
          </button>
          <button
            onClick={() => handleAmenitiesClick("24 x 7 Security")}
            className={`border flex justify-center items-center h-20 rounded-lg border-blue-500 bg-blue-600  ${
              selectedAmenities.includes("24 x 7 Security")
                ? ""
                : "bg-gradient-to-t from-purple-500 to-blue-500"
            }`}
          >
            <div className="">
              <div className="text-white flex justify-center">
                <PiLockKeyOpenFill size={"2rem"} />
              </div>
              <div className="text-white text-center text-xs">
                24 x 7 Security
              </div>
            </div>
          </button>
          <button
            onClick={() => handleAmenitiesClick("Sports Court")}
            className={`border flex justify-center items-center h-20 rounded-lg border-blue-500 bg-blue-600  ${
              selectedAmenities.includes("Sports Court")
                ? ""
                : "bg-gradient-to-t from-purple-500 to-blue-500"
            }`}
          >
            <div className="">
              <div className="text-white flex justify-center">
                <MdSportsHandball size={"2rem"} />
              </div>
              <div className="text-white text-center text-xs">
                Sports Courts
              </div>
            </div>
          </button>
          <button
            onClick={() => handleAmenitiesClick("Kids Play Area")}
            className={`border flex justify-center items-center h-20 rounded-lg border-blue-500 bg-blue-600  ${
              selectedAmenities.includes("Kids Play Area")
                ? ""
                : "bg-gradient-to-t from-purple-500 to-blue-500"
            }`}
          >
            <div className="">
              <div className="text-white flex justify-center">
                <GiTreeSwing size={"2rem"} />
              </div>
              <div className="text-white text-center text-xs">
                Kids Play Area
              </div>
            </div>
          </button>
        </div>

        {/* <div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Power Backup')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-4 px-2 w-64 rounded-lg border items-center hover:border-transparent font-bold hover:text-white
            ${selectedAmenities.includes('Power Backup') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
  <path d="M7.5 1v7h1V1h-1z"/>
  <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
</svg>

  <span>Power Backup</span>
</button>
</div>

<div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Clubhouse')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-4 px-2 w-64 rounded-lg items-center border hover:border-transparent font-bold hover:text-white
            ${selectedAmenities.includes('Clubhouse') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500'}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
</svg>


  <span>Clubhouse</span>
</button>
</div>

<div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Garden')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-4 px-4 w-64 rounded-lg items-center border hover:border-transparent font-bold hover:text-white
            ${selectedAmenities.includes('Garden') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500 '}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 30" fill="currentcolor"><path d="M27 25H15v-3.09c7.91 1.12 13.19-5 11.56-12.64a1 1 0 0 0-.77-.77c-4.29-.91-8.63.25-11.1 3.95C13.47 7.24 8.51 4 2.21 5.3a1 1 0 0 0-.77.77C-.18 13.73 5.08 19.83 13 18.71V25H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1.12L4 47.13A1 1 0 0 0 5 48h18a1 1 0 0 0 1-.87L25.88 33H27a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-2.27-14.67c.89 5.8-2.86 10-8.53 9.71l5.24-5.25A1 1 0 0 0 20 13.38l-5 5c0-5.53 4.21-8.9 9.73-8.05zM3.27 7.13C9.08 6.23 13.32 10 13 15.69l-5-5a1 1 0 0 0-1.44 1.41l4.74 4.74c-5.52.06-8.88-4.19-8.03-9.71zM22.12 46H5.88L4.14 33h19.72zM26 31H2v-4h24zM39.45.11a1 1 0 0 0-.9 0A15.38 15.38 0 0 0 30 13.94V24a1 1 0 0 0 1 1h5v5.18A3 3 0 0 0 34 33v10a5 5 0 0 0 10 0V33a3 3 0 0 0-2-2.82V25h5a1 1 0 0 0 1-1V13.94A15.38 15.38 0 0 0 39.45.11zM37 32h4a1 1 0 0 1 1 1v1h-6v-1a1 1 0 0 1 1-1zm2 14a3 3 0 0 1-3-3v-7h6v7a3 3 0 0 1-3 3zm1-16h-2v-5h2zm6-7H32v-9.06a13.4 13.4 0 0 1 7-11.81 13.4 13.4 0 0 1 7 11.81z"/></svg>

  <span>Garden</span>
</button>
</div>

<div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Lift')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-4 px-4 w-64 rounded-lg items-center border hover:border-transparent font-bold hover:text-white
            ${selectedAmenities.includes('Lift') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500 '}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" width="18" height="18" viewBox="0 0 30 30"><g data-name="42-Lift"><path d="M30 30V3a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v27H0v2h32v-2zm-15 0H8V10h7zm9 0h-7V10h7zm4 0h-2V9a1 1 0 0 0-1-1h-4V5a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v3H7a1 1 0 0 0-1 1v21H4V3a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1z"/><path d="M23 4h2v2h-2zM7 4h2v2H7z"/></g></svg>

  <span>Lift</span>
</button>
</div>

<div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('24 x 7 Security')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-4 px-3 w-64 rounded-lg items-center border hover:border-transparent  font-bold hover:text-white
            ${selectedAmenities.includes('24 x 7 Security') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500 '}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
<path d="M18,21H6c-0.6,0-1-0.4-1-1V10c0-0.6,0.4-1,1-1h12c0.6,0,1,0.4,1,1v10C19,20.6,18.6,21,18,21z" opacity=".3"></path><path d="M18 9h-2V7c0-2.2-1.8-4-4-4-1.9 0-3.5 1.3-3.9 3.2l-2-.4C6.7 3 9.2 1 12 1c3.4 0 6 2.6 6 6V9zM14 15c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2S14 13.9 14 15z"></path><path d="M18,22H6c-1.1,0-2-0.9-2-2V10c0-1.1,0.9-2,2-2h12c1.1,0,2,0.9,2,2v10C20,21.1,19.1,22,18,22z M6,10v10h12l0-10H6z"></path>
</svg>

  <span>24 x 7 Security</span>
</button>
</div>

<div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Sports Court')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-4 px-4 w-64 rounded-lg items-center border hover:border-transparent  font-bold hover:text-white
            ${selectedAmenities.includes('Sports Court') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500 '}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" width="30" height="30" viewBox="0 0 30 30" ><path d="M9.82986 8.78986L7.99998 9.45588V13H5.99998V8.05H6.015L11.2834 6.13247C11.5274 6.03855 11.7922 5.99162 12.0648 6.0008C13.1762 6.02813 14.1522 6.75668 14.4917 7.82036C14.678 8.40431 14.848 8.79836 15.0015 9.0025C15.9138 10.2155 17.3653 11 19 11V13C16.8253 13 14.8823 12.0083 13.5984 10.4526L12.9008 14.4085L15 16.17V23H13V17.1025L10.7307 15.1984L10.003 19.3253L3.10938 18.1098L3.45667 16.1401L8.38071 17.0084L9.82986 8.78986ZM13.5 5.5C12.3954 5.5 11.5 4.60457 11.5 3.5C11.5 2.39543 12.3954 1.5 13.5 1.5C14.6046 1.5 15.5 2.39543 15.5 3.5C15.5 4.60457 14.6046 5.5 13.5 5.5Z"></path></svg>

  <span>Sports Court</span>
</button>
</div>


<div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Gymnasium')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-5 px-2 w-64 rounded-lg items-center border hover:border-transparent  font-bold hover:text-white
            ${selectedAmenities.includes('Gymnasium') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500 '}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 512 512"><path d="M441.324 118.126h-79.55a9.447 9.447 0 0 0-9.45 9.45v56.489h-2.731v-14.31a9.451 9.451 0 0 0-9.45-9.45H206.4a9.449 9.449 0 0 0-9.45 9.45v14.31h-37.28v-56.489a9.451 9.451 0 0 0-9.45-9.45H70.672a9.449 9.449 0 0 0-9.45 9.45v179.83a9.449 9.449 0 0 0 9.45 9.45h79.55a9.451 9.451 0 0 0 9.45-9.45v-56.488h2.945v29.1a9.49 9.49 0 0 0 .205 1.953c.025.107.07.208.097.321a9.848 9.848 0 0 0 .491 1.508c.073.168.177.315.259.473a9.47 9.47 0 0 0 .677 1.175c.13.18.284.337.423.51a9.386 9.386 0 0 0 .837.926c.054.05.089.11.145.16l40.314 36.22v61.16a9.449 9.449 0 0 0 9.45 9.45h99.074a9.451 9.451 0 0 0 9.45-9.45v-60.512l24.986-68.78c.047-.126.05-.262.088-.39a9.162 9.162 0 0 0 .346-1.497c.035-.242.057-.479.072-.721.013-.208.063-.407.063-.621v-.986h2.732v56.489a9.447 9.447 0 0 0 9.45 9.45h79.55a9.451 9.451 0 0 0 9.45-9.45v-179.83a9.457 9.457 0 0 0-9.453-9.45zM330.692 242.451H307v-63.246h23.692zm-71.133-63.246h28.542v63.245H259.56zm-18.904 0v35.135H215.85v-35.135zm-59.14 91.359V233.24h56.91v37.324zm124.188 48.453a9.477 9.477 0 0 0-.567 3.226v52.724h-80.174v-55.921a9.443 9.443 0 0 0-3.134-7.028l-25.103-22.55h51.15a9.452 9.452 0 0 0 9.45-9.45v-18.665h69.325z" data-name="Gym"/></svg>

  <span>Gym</span>
</button>
</div>

<div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Kids Play Area')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-5 px-2 w-64 rounded-lg items-center border hover:border-transparent  font-bold hover:text-white
            ${selectedAmenities.includes('Kids Play Area') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500 '}`}
            >
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 384 512" fill="currentColor"><path d="M120 72c0-39.765 32.235-72 72-72s72 32.235 72 72c0 39.764-32.235 72-72 72s-72-32.236-72-72zm254.627 1.373c-12.496-12.497-32.758-12.497-45.254 0L242.745 160H141.254L54.627 73.373c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255L104 213.254V480c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V368h16v112c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V213.254l94.627-94.627c12.497-12.497 12.497-32.757 0-45.254z"/></svg>

  <span>Kids Play Area</span>
</button>
</div>

<div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Swimming Pool')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-4 px-2 w-64 rounded-lg items-center border hover:border-transparent  font-bold hover:text-white
            ${selectedAmenities.includes('Swimming Pool') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500'}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 32 32"><path d="M27.07 26.3a3.15 3.15 0 0 0-4.08.29l-.2.2a1 1 0 0 1-.26.2 1.12 1.12 0 0 1-1.32-.2 3.2 3.2 0 0 0-4.42 0 1.13 1.13 0 0 1-1.58 0 3.14 3.14 0 0 0-4.42 0 1.11 1.11 0 0 1-1.58 0l-.2-.2a3.15 3.15 0 0 0-4.08-.29L2.4 28.2a1 1 0 0 0 1.2 1.6l2.53-1.9a1.13 1.13 0 0 1 1.46.1l.2.2a3.14 3.14 0 0 0 4.42 0 1.11 1.11 0 0 1 1.58 0 3.14 3.14 0 0 0 4.42 0 1.13 1.13 0 0 1 1.58 0 3.11 3.11 0 0 0 3.68.54 3 3 0 0 0 .74-.54l.2-.2a1.13 1.13 0 0 1 1.46-.11l2.53 1.9a1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4 1 1 0 0 0-.2-1.4zM3.6 25.12l2.53-1.9a1.13 1.13 0 0 1 1.46.11l.2.2a3.14 3.14 0 0 0 4.42 0 1.11 1.11 0 0 1 1.58 0 3.14 3.14 0 0 0 4.42 0 1.11 1.11 0 0 1 1.58 0 3.14 3.14 0 0 0 4.42 0l.2-.2a1.13 1.13 0 0 1 1.46-.11l2.53 1.9a1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4 1 1 0 0 0-.2-1.4l-2.53-1.9a3.15 3.15 0 0 0-4.08.29l-.2.2a1.11 1.11 0 0 1-.79.33V5a1 1 0 0 1 2 0 1 1 0 0 0 2 0 3 3 0 0 0-6 0v8H9v-3h8a1 1 0 0 0 0-2H9V5a1 1 0 0 1 2 0 1 1 0 0 0 2 0 3 3 0 0 0-6 0v16a3.19 3.19 0 0 0-2.07.61L2.4 23.52a1 1 0 0 0 1.2 1.6zm13.19-3a1.13 1.13 0 0 1-1.58 0 3.14 3.14 0 0 0-4.42 0 1.11 1.11 0 0 1-1.58 0l-.2-.2H9V20h11v1.38a3.13 3.13 0 0 0-3.21.73zM20 15v3H9v-3z"/></svg>

  <span>Swimming Pool</span>
</button>
</div> */}
      </div>
    </div>
  );
}
