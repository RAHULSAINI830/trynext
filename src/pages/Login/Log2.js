import Navbar from "@/components/navbar";
import Card from "../../components/cards/Card";
export default function Log2() {
    return (
        <div>
        <div className="fixed w-screen z-50">

        <Navbar/></div>
        <div className="flex flex-col justify-between items-center min-h-screen bg-white">
            <div className="text-center mt-28 p-4">
        <h1 className="lg:text-4xl text-3xl text-purple-500 font-bold mb-4">Match Found!</h1>
        <h2 className="lg:text-md text-lg text-black mb-10">
        We’ve discovered homes that matches your dream. Sign up to get personalised details right into your hands via mail, whatsapp, etc. <br/>[Note: Browsing search screen is under development & will be launched soon]</h2>
        {/*<div className="flex flex-col lg:flex-row gap-4 p-4">
        <Card/>
        <Card/>
    </div>*/}
        </div>
        <div className="flex gap-4 mb-24">
        <button className=" py-3 px-9 text-center rounded-lg text-white bg-blue-600">Log In</button>
        <button className=" py-3 px-8 text-center rounded-lg text-white bg-blue-600">Sign Up</button>
        </div>

      </div>
      </div>
    );

}
