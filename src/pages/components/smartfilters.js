import imgover from "../images/overlaypg3.png"
import Image from "next/image";
import cardimg from "../images/download.jpg"
export default function Smartfilters() {
    return (
        <div className="flex flex-col bg-gradient-to-br from-emerald-200 via-white to-white lg:flex-row lg:justify-around p-12">
        <div className="flex items-center lg:items-start lg:w-2/3 flex-col  lg:px-7 pt-9 mb-4"> 
        <h1 className="font-inter-200 font-semibold  text-black text-4xl text-center lg:text-left lg:mb-6">
        Smart Filters
        </h1>
        <p className="w-full text-gray-600 py-6 text-center lg:text-left text-xl ">
        Don&apos;t settle for anything less than extraordinary. Check out our smart filters to unlock a world of high-quality, exclusive deals on premium properties in Gurgaon.
        </p>
        <h1 className="text-xl  text-gray-600 text-center lg:text-left">
        Your dream home awaits!
        </h1>
        
        </div>
       
        <div class="hidden lg:flex lg:flex-col lg:flex-grow-0 lg:items-center w-2/3 h-fit bg-transparent rounded-2xl ">
<div class="inline-flex rounded-md shadow-sm mt-4 gap-10 mb-6" role="group">
  <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-green-300 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
   Luxury Homes
  </button>
  <button type="button" class="px-4 py-2 ml-4 text-sm font-medium text-gray-900 bg-purple-300 border-t border-b rounded-lg border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
    NRI Buyers
  </button>
  <button type="button" class="px-4 py-2 ml-4 text-sm font-medium text-gray-900 bg-blue-300 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
    High Appreciation
  </button>
</div>

        {/*Card*/}
<div class="max-w-sm mb-6 bg-white border border-gray-200 rounded-2xl shadow-2xl ">
    <a href="#">
        <Image src={cardimg} alt="" className="w-full rounded-t-2xl"/>
    </a>
    <div class="p-3">
        <a href="#">
            <h5 class="mb-0 text-2xl font-semibold tracking-tight text-gray-900">DLF The Skycourt</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Sector 86, Gurugram</p>
        <p className="text-sm text-gray-700 dark:text-gray-400">3 BHK</p>
        <p className="text-sm text-gray-700 dark:text-gray-400">INR 1.5Cr - 1.6Cr</p>
    </div>
</div>

        </div>
        </div>
        
    );
}