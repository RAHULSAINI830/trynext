import Map from "./map";
import React, { use } from "react";
import { BsBank2 } from 'react-icons/bs';
import { PiParkFill } from 'react-icons/pi';
import { RiHealthBookFill } from 'react-icons/ri';
import { FaDumbbell, FaTrain } from "react-icons/fa";
import { MdSchool, MdLocalCafe, MdLocalMall } from "react-icons/md";
import { useState, useEffect } from "react";
import { baseurl } from "../../../public/url";
const MapContainer = ({ address }) => {
  const api = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [amenityType, setAmenityType] = useState(null); // Default amenity type is null
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${api}`
        );
        const data = await response.json();

        if (data.status === "OK") {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            data.status
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCoordinates();
  }, [address, api]); // Trigger the effect whenever address or API key changes

  useEffect(() => {
    const fetchAmenities = async () => {
      if (!amenityType || !location) {
        // If amenityType or location is null, do not fetch amenities
        return;
      }

      const radius = 5000; // 5 Km radius (in meters)
      const apiUrl = `/api/amenities?location=${location.lat},${location.lng}&radius=5000&type=${amenityType}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "OK") {
          const amenities = data.results.map((result) => ({
            name: result.name,
            address: result.vicinity,
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          }));
          setAmenitiesData(amenities);
        } else {
          setAmenitiesData([]);
          alert(`No Results for ${amenityType == 'subway_station' ? 'Metro Station' : amenityType} within ${radius / 1000} Km`);
          console.error("Error fetching amenities:", data.status);
        }
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };

    fetchAmenities();
  }, [amenityType, location]);

  return (
    <div className="flex flex-col">
      {/* Nearby */}
      <div className="flex px-2 md:px-6 lg:px-10 flex-col">
        <div className="text-md font-semibold">What&apos;s nearby?</div>
        <div className="flex overflow-x-scroll scrollbar hide-scroll-bar">
          <div className="flex text-xs md:text-sm flex-nowrap mr-2">
            <button
              onClick={() => setAmenityType("school")}
              className="m-2 ml-0 px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
            >
              <div className="flex"><MdSchool className="mr-2" size={"1.2rem"} /><span className="mt-0.5 md:mt-0">School</span></div>
            </button>
            <button
              onClick={() => setAmenityType("hospital")}
              className="m-2 ml-0 px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
            >
              <div className="flex"><RiHealthBookFill className="mr-2" size={"1.2rem"} /><span className="mt-0.5 md:mt-0">Healthcare</span></div>

            </button>
            <button
              onClick={() => setAmenityType("subway_station")}
              className="m-2 ml-0 px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
            >
              <div className="flex"><FaTrain className="mr-2" size={"1.2rem"} /><span className="mt-0.5 md:mt-0">Metro</span></div>
            </button>
            <button
              onClick={() => setAmenityType("restaurant")}
              className="m-2 ml-0 px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
            >
              <div className="flex"><MdLocalCafe className="mr-2" size={"1.2rem"} /><span className="mt-0.5 md:mt-0">Restaurants/Cafes</span></div>

            </button>

            <button
              onClick={() => setAmenityType("shopping_mall")}
              className="m-2 ml-0 px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
            >
              <div className="flex"><MdLocalMall className="mr-2" size={"1.2rem"} /><span className="mt-0.5 md:mt-0">Malls</span></div>
            </button>
            <button
              onClick={() => setAmenityType("gym")}
              className="m-2 ml-0 px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
            >
              <div className="flex"><FaDumbbell className="mr-2" size={"1.2rem"} /><span className="mt-0.5 md:mt-0">Gym</span></div>
            </button>
            <button
              onClick={() => setAmenityType("bank")}
              className="m-2 ml-0  px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
            >
              <div className="flex"><BsBank2 className="mr-2" size={"1.2rem"} /><span className="mt-0.5 md:mt-0">Bank</span></div>
            </button>
            <button
              onClick={() => setAmenityType("park")}
              className="m-2 ml-0 px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
            >
              <div className="flex"><PiParkFill className="mr-2" size={"1.2rem"} /><span className="mt-0.5 md:mt-0">Park</span></div>
            </button>
          </div>
        </div>
      </div>
      {location && (
        <div className="relative w-full h-full px-3 md:px-6 lg:px-10">
          <Map location={location} amenitiesData={amenitiesData} />
        </div>
      )}
    </div>
  );
};

export default MapContainer;
