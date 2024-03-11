import Preferable from "./Filters/Preferable";
import AreaSlider from "./Filters/AreaSlider";
import PriceSlider from "./Filters/PriceSlider";
import SelectedFilter from "./Filters/SelectedFilter";
import FilterDropdowns from "./Filters/FilterDropdowns";
import AmenitiesFilter from "./Filters/AmenitiesFilter";
import SaveView from "./Filters/SaveView";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LuListFilter } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
export default function FilterOpt({
  data,
  onSaveClick,
  deleteFilters,
  showSidebar,
  setShowSidebar,
}) {
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

  useEffect(() => {
    handleSaveit();
  },[resetSignal])

  return (
    <>
      <div class="w-full h-[calc(100dvh-65px)] font-inter v-scrollbar relative overflow-y-auto z-40 ease-in-out duration-300 bg-white">
        {/* <div className="">sidebar</div> */}
        
        <div className="flex px-6 items-start sticky top-0 bg-white justify-center">
          <SelectedFilter totalData={data} />
          <button
          className={`pt-4 z-50 right-2 block lg:hidden`}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <RxCrossCircled size={"2rem"} />
        </button>
        </div>
        {/* <div className="flex-1 h-px w-full bg-gray-300"></div> */}

        <div className="flex py-4 px-6 justify-center">
          <PriceSlider
            onPriceChange={handlePriceChange}
            resetSignal={resetSignal}
          />
        </div>

        {/* <div className="flex-1 h-px w-full bg-gray-300"></div> */}

        <div className="flex px-6 justify-center">
          <AreaSlider
            onAreaChange={handleAreaChange}
            resetSignal={resetSignal}
          />
        </div>

        {/* <div className="flex-1 h-px w-full bg-gray-300"></div> */} 

        <FilterDropdowns
          onFilterChange={handleFilterChange}
          resetSignal={resetSignal}
        />

        {/* <div className="flex-1 h-px w-full bg-gray-300"></div> */}

        <div className="flex justify-center">
          <AmenitiesFilter
            onAmenitiesChange={handleAmenitiesChange}
            resetSignal={resetSignal}
          />
        </div>

        {/* <div className="flex-1 h-px w-full bg-gray-300"></div> */}

        <div className="flex p-8 justify-center">
          <Preferable
            onPreferChange={handlePreferChange}
            resetSignal={resetSignal}
          />
        </div>
        <div className="w-full pb-4 sticky bottom-0 bg-white p-2 px-4 md:px-8 flex justify-between">
          <button
            type="button"
            onClick={handleSaveit}
            className="flex p-2  text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-300 hover:text-white text-sm font-medium rounded-md"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="flex p-2 bg-blue-500 hover:bg-blue-700 transition-colors duration-300 hover-text-white text-white text-sm font-medium border border-transparent rounded-md focus:outline-none"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </>
  );
}
