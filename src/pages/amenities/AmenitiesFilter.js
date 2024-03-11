import {useState,useEffect} from "react";
export default function AmenitiesFilter({ onAmenitiesChange ,resetSignal}) {
  const [clicked,setClicked]=useState(true);
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
      <div className="w-full">
         <h1 className=" flex  text-black text-lg px-8 py-6"><button className="flex items-center justify-between w-full" onClick={()=>setClicked(!clicked)}><span>My Amenities</span> <span className="px-4 ml-2">{clicked ? '▼' : '▲'}</span></button></h1>
        <div className={`flex md:px-6 flex-wrap w-full ${ clicked ? 'hidden' : ''}`}>

            <div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Parking')}

            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-5 px-2 w-64 rounded-lg border items-center hover:border-transparent font-bold hover:text-white
            ${selectedAmenities.includes('Parking') ? 'bg-gray-500 text-white  ' : 'bg-transparent text-blue-700 border-blue-500'}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-p-square-fill" viewBox="0 0 16 16">
  <path d="M8.27 8.074c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97H8.27Z"/>
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm3.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5V4.002Z"/>
</svg>

  <span>Parking</span>
</button>
</div>

<div className="flex px-2 py-4 w-1/3">
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
            onClick={() => handleAmenitiesClick('Gated Access')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-4 px-3 w-64 rounded-lg items-center border hover:border-transparent  font-bold hover:text-white
            ${selectedAmenities.includes('Gated Access') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500 '}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="white">
<path d="M18,21H6c-0.6,0-1-0.4-1-1V10c0-0.6,0.4-1,1-1h12c0.6,0,1,0.4,1,1v10C19,20.6,18.6,21,18,21z" opacity=".3"></path><path d="M18 9h-2V7c0-2.2-1.8-4-4-4-1.9 0-3.5 1.3-3.9 3.2l-2-.4C6.7 3 9.2 1 12 1c3.4 0 6 2.6 6 6V9zM14 15c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2S14 13.9 14 15z"></path><path d="M18,22H6c-1.1,0-2-0.9-2-2V10c0-1.1,0.9-2,2-2h12c1.1,0,2,0.9,2,2v10C20,21.1,19.1,22,18,22z M6,10v10h12l0-10H6z"></path>
</svg>

  <span>Gate Access</span>
</button>
</div>
<div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Gas Pipeline')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-4 px-4 w-64 rounded-lg items-center border hover:border-transparent  font-bold hover:text-white
            ${selectedAmenities.includes('Gas Pipeline') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500 '}`}
            >
            <svg fill="currentcolor" width="24" height="24" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 2H9.75C12.5784 2 13.9926 2 14.8713 2.87868C15.75 3.75736 15.75 5.17157 15.75 8V16.25H17.3214C18.5246 16.25 19.5 17.2254 19.5 18.4286V18.5C19.5 18.9142 19.8358 19.25 20.25 19.25C20.6642 19.25 21 18.9142 21 18.5V13.75L19.7757 13.3419C19.1631 13.1377 18.75 12.5645 18.75 11.9189V9.5C18.75 8.67157 19.4216 8 20.25 8H21V7.62247C21 7.43743 20.9997 7.37384 20.9965 7.31573C20.9631 6.72114 20.6953 6.16405 20.2519 5.76653C20.2085 5.72768 20.1591 5.68774 20.0146 5.57215L18.7815 4.58568C18.458 4.32692 18.4056 3.85495 18.6643 3.53151C18.9231 3.20806 19.3951 3.15562 19.7185 3.41438L20.9678 4.41378C21.0901 4.51163 21.1745 4.57915 21.2531 4.64962C21.9922 5.31214 22.4384 6.24063 22.4941 7.23161C22.5 7.33702 22.5 7.44511 22.5 7.60177V18.5C22.5 19.7427 21.4926 20.75 20.25 20.75C19.0074 20.75 18 19.7427 18 18.5V18.4286C18 18.0538 17.6962 17.75 17.3214 17.75H15.75V21.25H16.8734C17.2876 21.25 17.6234 21.5858 17.6234 22C17.6234 22.4142 17.2876 22.75 16.8734 22.75H1.75C1.33579 22.75 1 22.4142 1 22C1 21.5858 1.33579 21.25 1.75 21.25H2.75V8C2.75 5.17157 2.75 3.75736 3.62868 2.87868C4.50736 2 5.92157 2 8.75 2ZM7 16.25C6.58579 16.25 6.25 16.5858 6.25 17C6.25 17.4142 6.58579 17.75 7 17.75H12C12.4142 17.75 12.75 17.4142 12.75 17C12.75 16.5858 12.4142 16.25 12 16.25H7ZM11 6H8C7.05719 6 6.58579 6 6.29289 6.29289C6 6.58579 6 7.05719 6 8C6 8.94281 6 9.41421 6.29289 9.70711C6.58579 10 7.05719 10 8 10H11C11.9428 10 12.4142 10 12.7071 9.70711C13 9.41421 13 8.94281 13 8C13 7.05719 13 6.58579 12.7071 6.29289C12.4142 6 11.9428 6 11 6Z" fill="#ffffff"></path> </g></svg>

  <span>Gas Pipeline</span>
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
            onClick={() => handleAmenitiesClick('Servant Room')} className={` hover:bg-blue-500 flex flex-col justify-between border hover:border-transparent  text-sm py-4 px-3 w-64 rounded-lg items-center font-bold hover:text-white
            ${selectedAmenities.includes('Servant Room') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500 '}`}
            >
            <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg"
            fill="currentcolor" width="30" height="30"
            viewBox="0 0 128 128"><path d="M62.633 80.879h-.941A22.518 22.518 0 0 0 47.513 69.6V19.967a5.679 5.679 0 1 0-11.357 0V69.6a22.517 22.517 0 0 0-14.179 11.279h-.941a4.267 4.267 0 0 0-1.523 8.257 22.479 22.479 0 0 0-.105 2.15v20.677a1.75 1.75 0 0 0 1.75 1.75h41.354a1.75 1.75 0 0 0 1.75-1.75V91.285c0-.725-.038-1.442-.105-2.15a4.267 4.267 0 0 0-1.523-8.257zm-22.978-11.91v-49a2.179 2.179 0 1 1 4.357 0v49c-.046 0-.091 0-.138-.007-.673-.061-1.352-.1-2.041-.1s-1.368.042-2.041.1c-.045.004-.092.002-.137.007zm-1.491 3.749c.024 0 .048 0 .072-.007a19.392 19.392 0 0 1 1.709-.249l.2-.02a18.29 18.29 0 0 1 3.372 0l.21.02c.565.058 1.131.138 1.7.249h.063a18.976 18.976 0 0 1 12.132 8.163H26.041a18.974 18.974 0 0 1 12.123-8.156zM21.036 84.379h41.6a.775.775 0 0 1 0 1.55h-41.6a.775.775 0 0 1 0-1.55zm39.726 25.833h-5.689v-6.469a1.75 1.75 0 0 0-3.5 0v6.469h-7.989v-6.469a1.75 1.75 0 0 0-3.5 0v6.469h-7.989v-6.469a1.75 1.75 0 1 0-3.5 0v6.469h-5.688V91.285c0-.627.034-1.245.094-1.856h37.667c.06.611.094 1.23.094 1.856z"/><path d="M110.339 104.225 78.763 86.65V19.967a5.679 5.679 0 1 0-11.357 0v92a1.75 1.75 0 0 0 1.75 1.75h40.333a1.75 1.75 0 0 0 1.75-1.75v-6.208a1.749 1.749 0 0 0-.9-1.534zM70.905 19.967a2.179 2.179 0 1 1 4.357 0v90.245h-4.357zm36.833 90.245H85.905v-6.469a1.75 1.75 0 0 0-3.5 0v6.469h-3.642V90.655l28.976 16.127zM97.847 59.824a1.75 1.75 0 0 0 1.75-1.75V55.4a1.75 1.75 0 0 0-3.5 0v2.675a1.75 1.75 0 0 0 1.75 1.749z"/><path d="M91.913 63.278h2.675a1.75 1.75 0 0 0 0-3.5h-2.675a1.75 1.75 0 0 0 0 3.5zM98.042 63.037a1.75 1.75 0 0 0-1.75 1.75v2.675a1.75 1.75 0 0 0 3.5 0v-2.675a1.75 1.75 0 0 0-1.75-1.75zM101.3 63.083h2.675a1.75 1.75 0 0 0 0-3.5H101.3a1.75 1.75 0 1 0 0 3.5zM21.06 35.877a1.75 1.75 0 0 0 1.75-1.75v-2.675a1.75 1.75 0 0 0-3.5 0v2.675a1.75 1.75 0 0 0 1.75 1.75zM19.551 37.581a1.75 1.75 0 0 0-1.75-1.75h-2.675a1.75 1.75 0 1 0 0 3.5H17.8a1.75 1.75 0 0 0 1.751-1.75zM23 40.84a1.75 1.75 0 0 0-3.5 0v2.675a1.75 1.75 0 0 0 3.5 0zM24.514 39.136h2.675a1.75 1.75 0 0 0 0-3.5h-2.675a1.75 1.75 0 0 0 0 3.5z"/></svg>

  <span>Servant Room</span>
</button>
</div>

<div className="flex px-2 py-4 w-1/3">
            <button
            onClick={() => handleAmenitiesClick('Gym')}
            className={` hover:bg-blue-500 flex flex-col justify-between text-sm py-5 px-2 w-64 rounded-lg items-center border hover:border-transparent  font-bold hover:text-white
            ${selectedAmenities.includes('Gym') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500 '}`}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 512 512"><path d="M441.324 118.126h-79.55a9.447 9.447 0 0 0-9.45 9.45v56.489h-2.731v-14.31a9.451 9.451 0 0 0-9.45-9.45H206.4a9.449 9.449 0 0 0-9.45 9.45v14.31h-37.28v-56.489a9.451 9.451 0 0 0-9.45-9.45H70.672a9.449 9.449 0 0 0-9.45 9.45v179.83a9.449 9.449 0 0 0 9.45 9.45h79.55a9.451 9.451 0 0 0 9.45-9.45v-56.488h2.945v29.1a9.49 9.49 0 0 0 .205 1.953c.025.107.07.208.097.321a9.848 9.848 0 0 0 .491 1.508c.073.168.177.315.259.473a9.47 9.47 0 0 0 .677 1.175c.13.18.284.337.423.51a9.386 9.386 0 0 0 .837.926c.054.05.089.11.145.16l40.314 36.22v61.16a9.449 9.449 0 0 0 9.45 9.45h99.074a9.451 9.451 0 0 0 9.45-9.45v-60.512l24.986-68.78c.047-.126.05-.262.088-.39a9.162 9.162 0 0 0 .346-1.497c.035-.242.057-.479.072-.721.013-.208.063-.407.063-.621v-.986h2.732v56.489a9.447 9.447 0 0 0 9.45 9.45h79.55a9.451 9.451 0 0 0 9.45-9.45v-179.83a9.457 9.457 0 0 0-9.453-9.45zM330.692 242.451H307v-63.246h23.692zm-71.133-63.246h28.542v63.245H259.56zm-18.904 0v35.135H215.85v-35.135zm-59.14 91.359V233.24h56.91v37.324zm124.188 48.453a9.477 9.477 0 0 0-.567 3.226v52.724h-80.174v-55.921a9.443 9.443 0 0 0-3.134-7.028l-25.103-22.55h51.15a9.452 9.452 0 0 0 9.45-9.45v-18.665h69.325z" data-name="Gym"/></svg>

  <span>Gym</span>
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
</div>




        </div>
        </div>
    );
}
