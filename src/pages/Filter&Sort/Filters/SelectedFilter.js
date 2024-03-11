import {useState} from 'react';

export default function SelectedFilter({totalData}) {

  const mapBedrooms = (value) => {
    if (value === '2' || value === '3' || value === '4') {
      return value + ' BHK';
    } else if (value === '4+') {
      return '4+ BHK';
    } else {
      return value; // If the value doesn't match any condition, return it as is
    }
  };
  const[clicked,setClicked]=useState(true);

  return (
        <div className="flex flex-col w-full">
          <div className="text-left pt-6 font-inter text-lg text-black  font-semibold">Filters</div>
            {/* <h1 className="text-left text-black text-lg pb-4"> <button className="flex items-center justify-between w-full" onClick={()=>setClicked(!clicked)}><span> Applied Filters</span> <span className="px-4 ">{clicked ? '▼' : '▲'}</span></button> </h1> */}
            <div class={`grid grid-cols-2 gap-4 ${ clicked ? 'hidden' : ''}`}>

            {totalData?.map((item, index) => (
      <div key={index} class="flex flex-row text-blue-200 shadow-inner rounded-full px-2 py-1 bg-blue-300 ">
        <p class="self-center text-sm text-black px-2">{mapBedrooms(item)}</p>
      </div>
    ))}
            </div>
        </div>
    );
}
// <div class="flex justify-between text-blue-200 shadow-inner rounded-full px-2 py-1 bg-blue-300">
//   <p class="self-center text-sm text-black px-2">Max 4 Cr</p>
//   <strong class="text-sm pr-2 text-black align-center cursor-pointer alert-del">&times;</strong>
// </div>
