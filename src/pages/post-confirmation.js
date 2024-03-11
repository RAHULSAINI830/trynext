import React from "react";
import Navbar from "./components/navbar";
import Link from "next/link";

const Postconfirmation = () => {
  return (
    <>
      <div className="fixed w-screen z-50">
        <Navbar />
      </div>
      <div className="w-screen h-screen bg-ghost flex justify-center items-center">

        <div className="w-[90%] md:w-1/2 h-auto p-5 shadow-xl bg-white">
            <img src="./SendMail.png" alt="" className="w-[100px] block mx-auto" />
            <h1 className="text-2xl font-bold text-center">Thanks for submission!</h1>
            <p className="text-center w-[90%] block mx-auto mt-4">
            Your form has been submitted. Our team will review the posting and get back to you within 24 hours in any case or questions, otherwise it will be published. Check “status” in my listing page for the status of posting.
            </p>
            <div className="flex justify-center items-center mt-4">
                <Link href="/" className="cursor-pointer bg-col text-center m-1  text-white  px-5 py-2  rounded-md">Go Home</Link>
                <Link href="/property-listing" className="cursor-pointer border border-blue-600 text-center m-1  text-blue-600  px-5 py-2  rounded-md">My Listing</Link>

            </div>
        </div>

      </div>
    </>
  );
};

export default Postconfirmation;
