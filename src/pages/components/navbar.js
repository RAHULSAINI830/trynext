"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Avatar from "../avatar";
import logo from "../images/logo-png.png";
// import cuslogo from '../images/customlogo.jpg'
import Subscribe from "../subscribe";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCity } from "../../components/selectCity";
import { initFlowbite } from "flowbite";

export default function Navbar() {
  useEffect(() => {
    initFlowbite();
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const { selectedCity, setSelectedCity } = useCity();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  function handleCity(e) {
    const newCity = e.target.value;
    setSelectedCity(newCity);
  }

  return (
    <nav className="bg-white z-[999] min-h-[4.3rem] md:h-[4.3rem] shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <div className="flex flex-row">
          <Link
            href="https://smartneev.com/"
            className="flex min-[837px]:pl-10 min-[1007px]:pl-24 xl:pl-0 items-center"
          >
            <Image src={logo} alt="Smartneev" className="logo" />
          </Link>
        </div>
        
        <div className="flex md:order-2 min-[837px]:pr-10 min-[1007px]:pr-24 xl:pr-0">
          {session ? (
            // User is logged in, display avatar button
            <Avatar
              className=" hidden relative lg:block md:block xl:block"
              dropdownClassName="right-0"
            />
          ) : (
            // User is not logged in, display sign up and login buttons
            <>
              <Subscribe
                type="Sign Up"
                text="Sign Up"
                classDesc="hidden lg:block min-[873px]:block xl:block text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center lg:mr-3 md:mr-2"
              />
              <Subscribe
                type="Login"
                text="Login"
                classDesc=" hidden lg:block min-[873px]:block xl:block text-blue-500 bg-white hover:bg-blue-800 hover:text-white border border-blue-500 rounded-lg text-sm px-4 py-2 text-center lg:mr-3 md:mr-2"
              />
            </>
          )}

          {/* <button type="button" class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center lg:mr-3 md:mr-2 ">Sign Up to join beta</button> */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-[873px]:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 "
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
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
          className={`items-center justify-between ${
            isMenuOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-cta"
        >
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 mr-8  rounded-lg bg-transparent md:flex-row md:gap-6 md:mt-0 md:border-0 md:bg-transparent ">
            {session ? (
              // User is logged in, display avatar button
              <li>
                <Avatar
                  className="block relative md:hidden lg:hidden xl:hidden"
                  dropdownClassName="left-0"
                />
              </li>
            ) : (
              // User is not logged in, display sign up and login buttons
              <div className="flex justify-center items-center gap-4">
                <li>
                  <Subscribe
                    type="Sign Up"
                    text="Sign Up"
                    classDesc="block md:hidden lg:hidden xl:hidden text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  />
                </li>
                <li>
                  <Subscribe
                    type="Login"
                    text="Login"
                    classDesc="block md:hidden lg:hidden xl:hidden text-blue text-blue-500 bg-white hover:bg-blue-800 hover:text-white border border-blue-500 rounded-lg text-sm px-4 py-2 text-center px-5 pr-6 py-2"
                  />
                </li>
              </div>
            )}

            <li className="">
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full mt-2 md:pl-3 pr-4 text-black rounded text-lg md:bg-transparent  pl-4 md:p-0"
              >
                Search
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-2 font-medium text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <Link
                      href="/quiz/page"
                      class="block px-4 text-center py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Home Matchmaking
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Filter&Sort/FilterSearch"
                      className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      All Properties
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://smartneev.com/#collections"
                      className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Smart Collections
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="md:p-1 md:hover:bg-gray-100 rounded">
                {session ? (
                  <Link
                    href="/postProperty"
                    className=" mb-1 flex text-lg pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 mt-1"
                  >
                    Post Property
                    <div className="p-1 ml-1 text-sm strong bg-yellow-500 flex">
                      Free
                    </div>
                  </Link>
                ) : (
                  <div className="p-1 flex flex-row">
                    <Subscribe
                      type="Login"
                      text="Post Property"
                      classDesc=" flex block text-lg  pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 "
                    />
                    <div className="flex px-1 pt-1 ml-1 text-sm strong bg-yellow-500">
                      Free
                    </div>
                  </div>
                )}
              </div>
            </li>

            <li class="group">
              <div className="md:p-1 z-0 md:hover:bg-gray-100 rounded">
                <p
                  class="block mb-1   text-black rounded text-lg md:bg-transparent  md:p-0 mt-1 cursor-pointer"
                  aria-current="page"
                >
                  <Link href="/blog" className="px-4 md:px-0">
                    Blogs
                  </Link>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
//<Link href='/postProperty' className=" mb-1 flex block text-lg  pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 mt-1">Post Property<div className="p-1 ml-1 text-sm strong bg-yellow-500 flex">Free</div></Link>
