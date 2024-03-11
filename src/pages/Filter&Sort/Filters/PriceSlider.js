import { useState, useEffect, useRef } from "react";

export default function PriceSlider({onPriceChange,resetSignal}) {

//      const progressRef = useRef(null);
   const [minPrice, setMinPrice] = useState("");
   const [maxPrice, setMaxPrice] = useState("");
   const[clicked,setClicked] = useState(false);
const handleMin=(e)=>{
  const selectedValue = event.target.value;
  setMinPrice(selectedValue);
  //console.log(selectedValue);


}
const handleMax=(e)=>{
  const selectedValue = event.target.value;
  setMaxPrice(selectedValue);
  //console.log(selectedValue);

}
useEffect(() => {
  onPriceChange(minPrice,maxPrice);
}, [minPrice,maxPrice, onPriceChange]);
useEffect(() => {
   if (resetSignal) {
     // Reset your filters in this child component
     setMinPrice("");
     setMaxPrice("");
   }
 }, [resetSignal]);

    return (  <div className="flex text-black flex-col w-full">
      <div className=" bg-white  ">
        {/* <h1 className="text-left text-lg "><button className="flex items-center justify-between w-full" onClick={()=>setClicked(!clicked)}> <span>Price</span> <span className="px-4 ml-2">{clicked ? '▼' : '▲'}</span></button> </h1> */}
 			 <div class={`grid grid-cols-2 mb-4  gap-4  ${ clicked ? 'hidden' : ''}`}>
       <select value={minPrice} onChange={handleMin}class="pr-8 outline-none  py-2 w-full rounded-md bg-white border shadow border-slate-200 text-blue-700  text-sm">
         <option value="" selected disabled hidden>Min Price</option>
         <option value="10 Lac">Min</option>
         <option value="25 Lac">25 Lac</option>
         <option value="50 Lac">50 Lac</option>
         <option value="75 Lac">75 Lac</option>
         <option value="1 Cr">1 Cr</option>
         <option value="1.5 Cr">1.5 Cr</option>
         <option value="2 Cr">2 Cr</option>
         <option value="3 Cr">3 Cr</option>
         <option value="4 Cr">4 Cr</option>
         <option value="5 Cr">5 Cr</option>


       </select>

      <select value={maxPrice} onChange={handleMax} class="pr-8 py-2 w-full rounded-md bg-white border shadow border-slate-200 text-blue-700  text-sm">
        <option value="" selected disabled hidden>Max Price</option>
        <option value="50 Lac">50 Lac</option>
        <option value="75 Lac">75 Lac</option>
        <option value="1 Cr">1 Cr</option>
        <option value="1.5 Cr">1.5 Cr</option>
        <option value="2 Cr">2 Cr</option>
        <option value="3 Cr">3 Cr</option>
        <option value="4 Cr">4 Cr</option>
        <option value="5 Cr">5 Cr</option>
        <option value="6 Cr">6 Cr</option>
        <option value="7 Cr">7 Cr</option>
        <option value="15 Cr">15 Cr</option>
        <option value="50 Cr">Max</option>
      </select>





       </div>



    </div>
    </div>


    );
}
//      const priceCap=30;
//      const min=0;
//      const max=1700;
//      const step=100;
//
//
//      const handleMin = (e) => {
//       if (maxValue - minValue >= priceCap && maxValue <= max) {
//         if (parseInt(e.target.value) > parseInt(maxValue)) {
//         } else {
//           setMinValue(parseInt(e.target.value));
//         }
//       } else {
//         if (parseInt(e.target.value) < minValue) {
//           setMinValue(parseInt(e.target.value));
//         }
//       }
//      };
//
//      const handleMax = (e) => {
//       if (maxValue - minValue >= priceCap && maxValue <= max) {
//         if (parseInt(e.target.value) < parseInt(minValue)) {
//         } else {
//           setMaxValue(parseInt(e.target.value));
//         }
//       } else {
//         if (parseInt(e.target.value) > maxValue) {
//           setMaxValue(parseInt(e.target.value));
//         }
//       }
//      };
//
// useEffect(() => {
//  progressRef.current.style.left = (minValue / max) * (step) + "%";
//  progressRef.current.style.right = step - (maxValue / max) * (step) + "%";
// }, [minValue, maxValue, max, step]);

// <div className="rounded-md">
//   <span className="p-2 font-semibold"> Min(lac)</span>
//   <input
//    onChange={(e) => setMinValue(e.target.value)}
//     type="number"
//     value={minValue}
//     className="w-24 rounded-md border border-gray-400"
//   />
// </div>
// <div className=" p-8 font-semibold text-lg"> - </div>
// <div className=" ">
//   <span className="p-2 font-semibold"> Max(lac)</span>
//   <input
//     onChange={(e) => setMaxValue(e.target.value)}
//     type="number"
//     value={maxValue}
//     className="w-24 rounded-md border border-gray-400"
//   />
// </div>
// </div>
//
// <div className="mb-4">
// <div className="slider relative h-1 rounded-md bg-gray-300">
//   <div
//     className="progress bg-blue-300 absolute h-1  rounded "
//     ref={progressRef}
//   ></div>
// </div>
//
// <div className="range-input relative  ">
//   <input
//     onChange={handleMin}
//     type="range"
//     min={min}
//     step={step}
//     max={max}
//     value={minValue}
//     className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
//   />
//
//   <input
//     onChange={handleMax}
//     type="range"
//     min={min}
//     step={step}
//     max={max}
//     value={maxValue}
//     className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
//   />
// </div>
// </div>
// </div>
