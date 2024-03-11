import Preferable from "./Filters/Preferable";
import AreaSlider from "./Filters/AreaSlider";
import PriceSlider from "./Filters/PriceSlider";
import SelectedFilter from "./Filters/SelectedFilter";
import FilterDropdowns from "./Filters/FilterDropdowns";
import AmenitiesFilter from "./Filters/AmenitiesFilter";
import SaveView from "./Filters/SaveView";
import {FaMagnifyingGlass} from 'react-icons/fa6'
import {LuListFilter} from 'react-icons/lu'
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
export default function FilterOpt({ data, onSaveClick, deleteFilters, showSidebar, setShowSidebar }) {
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
      bhk: "",
      property: "",
      status: "",
      furnish: "",
      sale: "",
    });
    const [selectedPrefer, setSelectedPrefer] = useState([]);
    const [minArea, setMinArea] = useState("200"); // Default min Area
    const [maxArea, setMaxArea] = useState("12000"); //Default max Area
    const [minPrice, setMinPrice] = useState("15 Lac");
    const [maxPrice, setMaxPrice] = useState("50 Cr");
    const [resetSignal, setResetSignal] = useState(false);

    const handleSaveit = () => {
      onSaveClick(
        selectedAmenities,
        selectedFilters,
        selectedPrefer,
        minArea,
        maxArea,
        minPrice,
        maxPrice
      );
      setResetSignal(false);
    };
    // This function will be passed to the child component
    const handleAmenitiesChange = (selectedAmenities) => {
      setSelectedAmenities(selectedAmenities);
    };
    const handleFilterChange = (selectedFilters) => {
      setSelectedFilters(selectedFilters);
    };
    const handlePreferChange = (selectedPrefer) => {
      setSelectedPrefer(selectedPrefer);
    };
    const handleAreaChange = (minValue, maxValue) => {
      setMinArea(minValue);
      setMaxArea(maxValue);
    };
    const handlePriceChange = (minPrice, maxPrice) => {
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
    };

    const handleReset = () => {
      deleteFilters();
      setSelectedPrefer([]);
      setMinArea("");
      setMaxArea("");
      setMinPrice("");
      setMaxPrice("");
      setSelectedAmenities([]);
      setSelectedFilters({
        bhk: "",
        property: "",
        status: "",
        furnish: "",
        sale: "",
      });
      setResetSignal(!resetSignal);
    };
  

  return (
    <>
    <div className="px-3 py-2 md:px-20 lg:px-28 xl:px-52">
    <div className="w-full flex justify-between gap-1">
    <button className="flex gap-2 justify-between px-2 rounded-md text-[1rem] font-semibold py-1.5 text-white bg-blue-500 hover:bg-blue-700 focus:bg-blue-700" onClick={() => setShowSidebar(!showSidebar)}>
      <span className="hidden min-[420px]:block">Filter</span>
      <div className="flex justify-center h-full items-center"><LuListFilter size={"1.5rem"}/></div>
    </button>
    <input type="text" placeholder="Search Locations, Projects, and More..." className=" min-w-fit w-full outline-none shadow-lg rounded-lg border border-slate-200" />
    <button className="flex justify-between gap-2 px-2 rounded-md text-[1rem] font-semibold py-1.5 text-white bg-blue-500 hover:bg-blue-700 focus:bg-blue-700">
      <div className="flex justify-center h-full items-center"><FaMagnifyingGlass size={"1.5rem"}/></div>
      <div className="hidden min-[420px]:flex">Match</div>
    </button>
    </div>
    </div>
    
    <div
      className={`top-0 right-[100%] w-full md:w-[55vw] lg:w-[40vw] xl:w-[35vw] fixed h-screen z-40 ease-in-out duration-300 ${
        showSidebar ? "" : "translate-x-full"
      }`}
    >
      <button
        className="flex text-black items-center cursor-pointer absolute right-3 top-3 "
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <RxCrossCircled size={"2rem"} />
      </button>
      <div class="w-full shadow p-2 bg-white hide-v-scrollbar overflow-y-auto h-full">
       {/* <div className="">sidebar</div> */}
       <div className="flex p-8 justify-center">
         <SelectedFilter totalData={data} />
       </div>
       <div className="flex-1 h-px w-full bg-gray-300"></div>

       <div className="flex p-8 justify-center">
          <PriceSlider
            onPriceChange={handlePriceChange}
            resetSignal={resetSignal}
          />
        </div>

        <div className="flex-1 h-px w-full bg-gray-300"></div>

        <div className="flex p-8 justify-center">
          <AreaSlider
            onAreaChange={handleAreaChange}
            resetSignal={resetSignal}
          />
        </div>

        <div className="flex-1 h-px w-full bg-gray-300"></div>

        <FilterDropdowns
          onFilterChange={handleFilterChange}
          resetSignal={resetSignal}
        />

        <div className="flex-1 h-px w-full bg-gray-300"></div>

        <div className="flex justify-center">
          <AmenitiesFilter
            onAmenitiesChange={handleAmenitiesChange}
            resetSignal={resetSignal}
          />
        </div>

        <div className="flex-1 h-px w-full bg-gray-300"></div>

        <div className="flex p-8 justify-center">
          <Preferable
            onPreferChange={handlePreferChange}
            resetSignal={resetSignal}
          />
        </div>
        <div className=" w-full bg-white pt-2 px-4  flex justify-center">
        <button
          type="button"
          onClick={handleSaveit}
          className="flex px-4 mr-4 py-4 bg-gray-400 hover:bg-blue-500 hover:text-white text-black  text-sm font-medium rounded-md"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="flex bg-gray-400 hover:bg-blue-500 hover:text-white text-black py-4 px-4 text-sm font-medium  border border-transparent rounded-lg focus:outline-none"
        >
          Reset Filters
        </button>
      </div>
      </div>
      
    </div>
  </>
  );
}
