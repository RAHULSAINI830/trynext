import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Preferable({tags, onPreferChange, resetSignal }) {
  const router = useRouter();
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [boxesStatus, setBoxesStatus] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    // ... add more checkboxes as needed
  });

  useEffect(() => {
    setBoxesStatus({
      checkbox1: router.query.tags?.includes("near airport"),
      checkbox2: router.query.tags?.includes("near top schools"),
      checkbox3: router.query.tags?.includes("popular hubs"),
      checkbox4: router.query.tags?.includes("eco friendly"),
      checkbox5: router.query.tags?.includes("near metro"),
      checkbox6: router.query.tags?.includes("luxury"),
      checkbox7: router.query.tags?.includes("ev friendly"),
    });
  }, [router.query]);

  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (resetSignal) {
      setCheckedBoxes([]);
      // Create a new object with all checkboxes set to false
      const resetCheckboxes = Object.keys(boxesStatus).reduce(
        (acc, checkbox) => {
          acc[checkbox] = false;
          return acc;
        },
        {}
      );

      setBoxesStatus(resetCheckboxes);
    }
  }, [resetSignal]);
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to the array
      setCheckedBoxes((prevChecked) => [...prevChecked, value]);
    } else {
      // If checkbox is unchecked, remove it from the array
      setCheckedBoxes((prevChecked) =>
        prevChecked.filter((item) => item !== value)
      );
    }
    const { name, checked } = event.target;
    setBoxesStatus((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };
  useEffect(() => {
    onPreferChange(checkedBoxes);
  }, [checkedBoxes, onPreferChange]);

  return (
    <div className="bg-white w-full">
      <h1 className=" pb-2 text-black text-lg ">
        {" "}
        <button
          className="flex items-center justify-between w-full"
          onClick={() => setClicked(!clicked)}
        >
          {" "}
          <span className="font-semibold text-base"> Preferences </span>{" "}
          {/* <span className="px-4 ml-2">{clicked ? "▼" : "▲"}</span> */}
        </button>{" "}
      </h1>
      <div class={`flex flex-wrap ${clicked ? "hidden" : ""}`}>
        <div class="flex items-center w-1/2 py-1">
          <input
            id="default-checkbox"
            type="checkbox"
            name="checkbox1"
            value="near airport"
            checked={boxesStatus.checkbox1}
            onChange={handleCheckboxChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
          />
          <label
            for="default-checkbox"
            class="ml-2 text-sm lg:text-md font-medium text-gray-900 "
          >
            Near Airport
          </label>
        </div>
        <div class="flex items-center w-1/2  py-1">
          <input
            id="checked-checkbox"
            type="checkbox"
            name="checkbox2"
            value="near top schools"
            checked={boxesStatus.checkbox2}
            onChange={handleCheckboxChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
          />
          <label
            for="checked-checkbox"
            class="ml-2 text-sm lg:text-md font-medium text-gray-900 0"
          >
            Near Top Schools
          </label>
        </div>
        <div class="flex items-center w-1/2   py-1">
          <input
            id="checked-checkbox"
            type="checkbox"
            name="checkbox3"
            value="popular hubs"
            checked={boxesStatus.checkbox3}
            onChange={handleCheckboxChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
          />
          <label
            for="checked-checkbox"
            class="ml-2 text-sm lg:text-md font-medium text-gray-900 0"
          >
            Popular Hubs
          </label>
        </div>
        <div class="flex items-center w-1/2  py-1">
          <input
            id="checked-checkbox"
            type="checkbox"
            name="checkbox4"
            value="eco friendly"
            checked={boxesStatus.checkbox4}
            onChange={handleCheckboxChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
          />
          <label
            for="checked-checkbox"
            class="ml-2 text-sm lg:text-md font-medium text-gray-900 0"
          >
            Eco Friendly
          </label>
        </div>
        <div class="flex items-center w-1/2  py-1">
          <input
            id="checked-checkbox"
            type="checkbox"
            name="checkbox5"
            value="near metro"
            checked={boxesStatus.checkbox5}
            onChange={handleCheckboxChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
          />
          <label
            for="checked-checkbox"
            class="ml-2 text-sm lg:text-md font-medium text-gray-900 0"
          >
            Near Metro Station
          </label>
        </div>
        <div class="flex items-center w-1/2  py-1">
          <input
            id="checked-checkbox"
            type="checkbox"
            name="checkbox6"
            value="luxury"
            checked={boxesStatus.checkbox6}
            onChange={handleCheckboxChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
          />
          <label
            for="checked-checkbox"
            class="ml-2 text-sm lg:text-md font-medium text-gray-900 0"
          >
            Luxury Amenities
          </label>
        </div>
        <div class="flex items-center w-1/2   py-1">
          <input
            id="checked-checkbox"
            type="checkbox"
            name="checkbox7"
            value="ev friendly"
            checked={boxesStatus.checkbox7}
            onChange={handleCheckboxChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
          />
          <label
            for="checked-checkbox"
            class="ml-2 text-sm lg:text-md font-medium text-gray-900 0"
          >
            EV Friendly
          </label>
        </div>
      </div>
    </div>
  );
}
