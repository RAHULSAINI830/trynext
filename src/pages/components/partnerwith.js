import Image from "next/image";
import Partner from "../partner.js"
import img1 from '../images/download (1).jpg'
import img2 from '../images/download.jpg'
import img3 from '../images/ip9lxj.jpg'
export default function Partnerwith() {
    return (
        <div className="flex flex-col bg-gradient-to-tl from-white via-purple-100 to-white min-h-screen">
            <div className="hidden lg:flex lg:flex-row w-full">
            <Image alt="partner img" src={img1} className="w-1/3 p-10 ml-10"/>
            <Image  alt="partner img" src={img2} className="w-1/3 p-10 "/>
            <Image alt="partner img"  src={img3} className="w-1/3 p-10 mr-10"/>
            </div>
            <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/3 lg:p-10 lg:ml-10 p-4">
                <p className="text-4xl text-black font-semibold  lg:text-left text-center mb-8">Partner with us</p>
                <Partner classDesc="px-12 py-4 mx-auto text-lg border rounded-xl text-white bg-blue-700 hover:bg-blue-800 "/>
                </div>
                <div className="lg:w-2/3 p-10 text-xl text-center lg:text-left text-gray-600">

                Ready to take your projects to new heights? Partner with us and gain access to a pool of genuine, motivated buyers who are eagerly searching for their dream homes.

                <br/><br/>
                Join forces with SmartNeev to launch your projects, connect with quality buyers, and embark on a journey of unparalleled success in the real estate market.
                </div>
            </div>

        </div>
    );
}
