import React, { useState } from "react";
import Navbar from "./components/navbar";
import Link from "next/link";
import logo from './images/logo-png.png'
import Image from "next/image";
const Propertylogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="fixed w-screen z-50">
        <Navbar />
      </div>
      <div className="w-screen h-screen bg-ghost flex justify-center items-center">
        <div className="w-[90%] md:w-[500px] h-auto p-5 shadow-xl bg-white rounded-md">
        <Image src={logo} alt="Smartneev" className="block mx-auto logo"/>
          <h1 className="text-center text-3xl font-medium">Log in</h1>
          <form onSubmit={onLogin} className="mt-8">
            <input
              type="number"
              className="w-full h-12 mt-4 py-2 px-2 border  border-blue-600 rounded-md focus:border-blue-600"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full h-12 mt-5 py-2 px-2 border  border-blue-600 rounded-md focus:border-blue-600"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="bg-col mt-10 ml-1 text-white w-full text-xl py-2 rounded-md">Login</button>
            <p className="mt-10 text-center">Don’t have an account? <Link href="/property-register" className="text-blue-600">Sign up</Link> </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Propertylogin;
