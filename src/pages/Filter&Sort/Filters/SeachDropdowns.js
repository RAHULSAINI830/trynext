import {useState,useEffect} from "react"

export default function SearchDropdowns({open, setOpen, onFilterChange,resetSignal}) {

  const[bhk,setBhk]= useState("");
  const[property,setProperty]=useState("");
  const[status,setStatus]=useState("");
  const[furnish,setFurnish]=useState("");
  const[sale,setSale]=useState("");
  const[clicked,setClicked]=useState(false);


 // Effect to reset selected option when resetSignal changes
 useEffect(() => {
   if (resetSignal) {
     // setSelectedOption1('');
     // setSelectedOption2('');
     // setSelectedOption3('');
     // setSelectedOption4('');
     // setSelectedOption5('');
     setBhk("");
     setProperty("");
     setStatus("");
     setFurnish("");
     setSale("");
   }
 }, [resetSignal]);
 useEffect(() => {
  if (clicked) {
    console.log("Scrolling to the bottom...", document.body.scrollHeight);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    setClicked(false); // Reset the clicked state after scrolling
  }
}, [clicked]);

const handleBHK = (event) => {
  const selectedValue = event.target.value;
  setBhk(selectedValue);
  onFilterChange({ bhk: selectedValue, property, status, furnish, sale });
  setClicked(true);
  console.log("Dropdown clicked:", clicked);
};
  const handleProperty = (event) => {
  const selectedValue = event.target.value;
  setProperty(selectedValue);
  onFilterChange({ bhk, property: selectedValue, status, furnish, sale });
  }
  const handleStatus = (event) => {
  const selectedValue = event.target.value;
  setStatus(selectedValue);
  onFilterChange({ bhk, property, status: selectedValue, furnish, sale });
  }
  const handleFurnish = (event) => {
  const selectedValue = event.target.value;
  setFurnish(selectedValue);
  onFilterChange({ bhk, property, status, furnish: selectedValue, sale });
  }
  const handleSale = (event) => {
  const selectedValue = event.target.value;
  setSale(selectedValue);
  onFilterChange({ bhk, property, status, furnish, sale: selectedValue });
  }



    return (
        <div>
            <div className="px-8 pb-6 pt-4">
	<div class="  mt-4">
	  <h1 class=" text-black text-lg">
		 <button className="flex items-center justify-end w-full"><span> Filters</span></button>
	  </h1>
	</div>

	<div>
	    <div class={`grid grid-cols-2  gap-4 mt-4 ${ !open ? 'hidden' : ''}`}>
	  <select value={bhk} onChange={handleBHK}class="pr-8 py-2 w-full rounded-md bg-white border-2 border-blue-500 text-blue-700  text-sm">
		  <option value="" selected disabled hidden>BHK</option>
		  <option value="2">2 BHK</option>
		  <option value="3">3 BHK</option>
		  <option value="4">4 BHK</option>


		</select>

		<select value={property} onChange={handleProperty}class="pr-8 py-2 w-full rounded-md bg-white border-2 border-blue-500 text-blue-700  text-sm">

		<option value="" selected disabled hidden>Property Type</option>
<option value="Apartment">Apartment</option>
<option value="Villa">Villa</option>
<option value="Builder Floor">Builder Floor</option>
<option value="Penthouse">Penthouse</option>
<option value="Plot">Plot</option>
<option value="Studio">Studio</option>
</select>


<select value={status} onChange={handleStatus}class="pr-8 py-2 w-full rounded-md bg-white border-2 border-blue-500 text-blue-700  text-sm">
		  <option value="" selected disabled hidden>Property Status</option>
		  <option value="Ready to Move">Ready to Move In</option>
		  <option value="Under Construction">Under Construction</option>
		  <option value="New Launch">New Launch</option>
      <option value="Near Possession">Near Possession</option>

		</select>

		{/* <select value={furnish} onChange={handleFurnish} class="pr-8 py-2 w-full rounded-md bg-white border-2 border-blue-500 text-blue-700  text-sm">
		<option value="" selected disabled hidden>Furnish type</option>
		  <option value="Fully-Furnished">Fully-Furnished</option>
		  <option value="Semi-Furnished">Semi-Furnished</option>
		  <option value="Unfurnished">Unfurnished</option>
		</select> */}
		<select value={sale} onChange={handleSale} class="pr-8 py-2 w-full rounded-md bg-white border-2 border-blue-500 text-blue-700  text-sm">
		<option value="" selected disabled hidden>Sale Type</option>
		  <option value="New">New</option>
		  <option value="Resale">Resale</option>
		</select>

	  </div>
	</div>
</div>
        </div>
    );
}
