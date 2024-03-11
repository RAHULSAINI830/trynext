"use client"
import React, { useEffect } from "react";
import { initFlowbite } from "flowbite";
// import Image from "next/image";
// import logo from '../images/logo-png.png'
import { useState } from 'react';
import Image from "next/image";
import Avatar from '../avatar';
import logo from '../images/logo-png.png'
// import cuslogo from '../images/customlogo.jpg'
import Subscribe from '../subscribe'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
function Navbar() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <nav className="bg-white border-gray-200 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://smartneev.com/" className="flex items-center">
          <Image
            src={logo}
            className="logo"
            alt="smartneev"
          />

        </a>
        <div className="flex md:order-2">
          <button
            type="button"
            className="hidden md:inline-block text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="hidden md:inline-block text-blue-900 hover:text-white ml-2 border border-blue-600  hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
          >
            Login
          </button>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium  md:text-lg lg:text-xl p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li className="flex justify-center md:hidden">

                <button
                  type="button"
                  className=" text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="text-blue-900 hover:text-white ml-2 border border-blue-600  hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                >
                  Login
                </button>
            </li>
            <li className="p-1 px-2 md:hover:bg-gray-200 rounded">
              <a
                href="#"
                className="block py-2 pl-3 pr-4  hover:text-white  text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-600 md:p-0 md:text-blue-500  hover:bg-blue-700"
              >
                Home
              </a>
            </li>
            <li className="p-1 px-2 md:hover:bg-gray-200 rounded">
              <a
                href="#"
                className="block py-2 pl-3 pr-4  hover:text-white  text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-600 md:p-0 md:text-blue-500  hover:bg-blue-700"
              >
                Post Property <span className="bg-amber-300 px-1 rounded text-black">Free</span>
              </a>
            </li>
            <li className="p-1 px-2 md:hover:bg-gray-200 rounded">
              <a
                href="#"
                className="block py-2 pl-3 pr-4 hover:text-white  text-gray-900 rounded hover:bg-blue-600 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 md:text-blue-500  "
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
