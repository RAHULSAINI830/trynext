import { useState, useEffect, useRef } from "react";

export default function AreaSlider({ onAreaChange,resetSignal }) {
	const [minArea, setMinArea] = useState("");
	const [maxArea, setMaxArea] = useState("");
	const [clicked,setClicked] = useState(false);
const handleMin=(e)=>{
 const selectedValue = event.target.value;
 setMinArea(selectedValue);
 //console.log(selectedValue);


}
const handleMax=(e)=>{
 const selectedValue = event.target.value;
 setMaxArea(selectedValue);
 //console.log(selectedValue);

}
useEffect(() => {
 onAreaChange(minArea,maxArea);
}, [minArea,maxArea, onAreaChange]);
useEffect(() => {
	if (resetSignal) {
		// Reset your filters in this child component
		setMinArea("");
		setMaxArea("");
	}
}, [resetSignal]);

	 return (  <div className="flex text-black flex-col w-full">
		 <div className=" bg-white  ">
			 {/* <h1 className="text-left text-lg "><button className="flex items-center justify-between w-full" onClick={()=>setClicked(!clicked)}><span> Build Up Area</span><span className="px-4 ml-2">{clicked ? '▼' : '▲'}</span></button> </h1> */}
			 <div class={`grid grid-cols-2 mb-4 gap-4 ${ clicked ? 'hidden' : ''}`}>
			<select value={minArea} onChange={handleMin} className="pr-8  py-2 w-full rounded-md bg-white border shadow border-slate-200 text-blue-700  text-sm">
				<option value="" selected disabled hidden>Min Area</option>
				<option value="250">250 sqft</option>
				<option value="500">500 sqft</option>
				<option value="750">750 sqft</option>
				<option value="1000">1000 sqft</option>
				<option value="1500">1500 sqft</option>
				<option value="2000">2000 sqft</option>
				<option value="2500">2500 sqft</option>
				<option value="3000">3000 sqft</option>
				<option value="3500">3500 sqft</option>
				<option value="4000">4000 sqft</option>
				<option value="4500">4500 sqft</option>
				<option value="5000">5000 sqft</option>
				<option value="7000">7000 sqft</option>
				<option value="8000">8000 sqft</option>
				<option value="9000">9000 sqft</option>
			</select>

		 <select value={maxArea} onChange={handleMax} class="pr-8 py-2 w-full rounded-md bg-white border shadow border-slate-200 text-blue-700  text-sm">
			 <option value="" selected disabled hidden>Max Area</option>
			 <option value="500">500 sqft</option>
			 <option value="750">750 sqft</option>
			 <option value="1000">1000 sqft</option>
			 <option value="1500">1500 sqft</option>
			 <option value="2000">2000 sqft</option>
			 <option value="2500">2500 sqft</option>
			 <option value="3000">3000 sqft</option>
			 <option value="3500">3500 sqft</option>
			 <option value="4000">4000 sqft</option>
			 <option value="4500">4500 sqft</option>
			 <option value="5000">5000 sqft</option>
			 <option value="7000">7000 sqft</option>
			 <option value="8000">8000 sqft</option>
			 <option value="9000">9000 sqft</option>
			 <option value="12000">12000 sqft</option>
		 </select>





			</div>



	 </div>
	 </div>


	 );
  }
	// <div className="flex flex-col w-full">
	// <h1 className="text-black text-left text-lg pb-8">Build Up Area(Sq.ft)</h1>
	// <div className="flex justify-center">
	// 	<fieldset className="w-96 text-gray-500"> {/* Increase the width to 96 */}
	// 	<input type="range" className="w-full accent-blue-600" min="1" max="5" />
	// 	<div aria-hidden="true" className="flex justify-between px-2">
	// 	<span className="text-sm">0</span>
	// <span className="text-sm">1000</span>
	// <span className="text-sm ">2000</span>
	// <span className="text-sm">3000</span>
	// <span className="text-sm">Any</span>
	// 	</div>
	// 	</fieldset>
	// </div>
	// </div>
