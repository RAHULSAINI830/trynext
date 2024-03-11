import Preferable from "./Filters/Preferable";
import AreaSlider from "./Filters/AreaSlider";
import PriceSlider from "./Filters/PriceSlider";
import SelectedFilter from "./Filters/SelectedFilter";
import FilterDropdowns from "./Filters/FilterDropdowns";
import AmenitiesFilter from "./Filters/AmenitiesFilter";
import SaveView from "./Filters/SaveView";
import {useState} from "react";
export default function FilterOpt({data,onSaveClick,deleteFilters}) {

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    bhk:'',
    property:'',
    status:'',
    furnish: '',
    sale:''
  });
  const [selectedPrefer,setSelectedPrefer] = useState([]);
  const [minArea, setMinArea] = useState("200"); // Default min Area
  const [maxArea, setMaxArea] = useState("12000"); //Default max Area
  const[minPrice,setMinPrice]= useState("15 Lac");
  const[maxPrice,setMaxPrice] = useState("50 Cr");
 const [resetSignal, setResetSignal] = useState(false);


  const handleSaveit=()=>{
    onSaveClick(selectedAmenities,selectedFilters,selectedPrefer,minArea,maxArea,minPrice,maxPrice);
    setResetSignal(false);
  }
 // This function will be passed to the child component
 const handleAmenitiesChange = (selectedAmenities) => {
   setSelectedAmenities(selectedAmenities);

 };
 const handleFilterChange = (selectedFilters) =>{
   setSelectedFilters(selectedFilters);

 }
 const handlePreferChange = (selectedPrefer) =>{
   setSelectedPrefer(selectedPrefer);

 }
 const handleAreaChange = (minValue, maxValue) => {
    setMinArea(minValue);
    setMaxArea(maxValue);

  };
  const handlePriceChange = (minPrice, maxPrice) => {
     setMinPrice(minPrice);
     setMaxPrice(maxPrice);

   };

  const handleReset= ()=>{
    deleteFilters();
    setSelectedPrefer([]);
    setMinArea('');
    setMaxArea('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedAmenities([]);
    setSelectedFilters({
      bhk:'',
      property:'',
      status:'',
      furnish: '',
      sale:''
    })
    setResetSignal(!resetSignal);

  };








    return (

        <div className="flex flex-col items-center ">
          <div class="w-full shadow p-2 rounded-lg bg-white overflow-y-auto max-h-[600px]">

		  <div className="flex p-8 justify-center">
		<SelectedFilter totalData={data} />
  </div>
  <div className="flex-1 h-px w-full bg-gray-300"></div>

		  <div className="flex p-8 justify-center">
	<PriceSlider onPriceChange={handlePriceChange} resetSignal={resetSignal} />
	</div>

	<div className="flex-1 h-px w-full bg-gray-300"></div>

		  <div className="flex p-8 justify-center">
	<AreaSlider  onAreaChange={handleAreaChange} resetSignal={resetSignal}/>
	</div>

	<div className="flex-1 h-px w-full bg-gray-300"></div>

	<FilterDropdowns onFilterChange={handleFilterChange} resetSignal={resetSignal}/>

	<div className="flex-1 h-px w-full bg-gray-300"></div>

	<div className="flex p- justify-center">
<AmenitiesFilter onAmenitiesChange={handleAmenitiesChange} resetSignal={resetSignal} />
		</div>


		<div className="flex-1 h-px w-full bg-gray-300"></div>

	<div className="flex p-8 justify-center">
	<Preferable onPreferChange={handlePreferChange} resetSignal={resetSignal}/>
	</div>




          </div>
          <div className="relative bottom-0 w-full bg-white pt-2 pb-1 px-4  flex justify-center">
          <button type="button" onClick={handleSaveit} className="flex px-4 mr-4 py-4 bg-gray-400 hover:bg-blue-500 hover:text-white text-black  text-sm font-medium rounded-md">
            Apply Filters
          </button>
          <button onClick={handleReset} className="flex bg-gray-400 hover:bg-blue-500 hover:text-white text-black py-4 px-4 text-sm font-medium  border border-transparent rounded-lg focus:outline-none">
            Reset Filters
          </button>

  </div>
        </div>
    );
}
