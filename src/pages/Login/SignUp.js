"use client";
import { useState } from 'react';
import logo from '../images/logo-png.png'
import Image from "next/image";

export default function SignUp() {
	const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
    return (

        <div className=" bottom-2 lg:bottom-6 p-4 lg:p-0 flex flex-col items-center justify-center h-fit ">

          <div className="w-full max-w-md p-7 space-y-2 rounded-xl bg-white ">

		  <a href="https://smartneev.com/" class="flex justify-center">
      <Image src={logo} alt="Smartneev" className="logo"/>

  </a>
	<h1 className="text-sm text-center text-black">Sign up to a free account to join other home addicts!</h1>
	<form novalidate="" action="" className="space-y-3 relative">
		<div className="space-y-1 text-sm">
			<label for="email" className="block text-gray-700">Email</label>
			<input type="text" name="email" id="email" placeholder="Email" className="w-full px-4 py-1 rounded-md border-gray-700 bg-white text-black focus:border-violet-400" />
		</div>
		<div className="space-y-1 text-sm">
			<label for="password" className="block text-gray-700">Password</label>
			<input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-1 rounded-md border-gray-700 bg-white text-black focus:border-violet-400" />

		</div>
		<div className="space-y-1 text-sm">
			<label for="phone" className="block text-gray-700">Phone</label>
			<input type="tel" name="phone" id="phone" placeholder="Phone" className="w-full px-4 py-1 rounded-md border-gray-700 bg-white text-black focus:border-violet-400" />
		</div>


		<div className="space-y-1 text-sm">


<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"  class="text-gray-700 w-full bg-white focus:ring-blue-300 font-medium rounded-lg border-2 border-gray-400 px-5 py-2 mt- inline-flex items-center" type="button"  onClick={toggleDropdown}>Preferred Communication Method<svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button>
{isOpen && (
<div id="dropdown" class="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-black">Phone Call</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-black">Email</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-black">WhatsApp</a>
      </li>

    </ul>
</div>
)}

		</div>


		<button className="block w-full p-2 text-center rounded-lg text-white bg-blue-600">Sign Up</button>
	</form>
	<div className="flex items-center pt-2 space-x-1">
		<div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
		<p className="px-3 text-sm text-gray-400">Sign Up with social accounts</p>
		<div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
	</div>
	<div className="flex justify-center space-x-4">

		<button aria-label="Log in with Google" className="p-0 rounded-sm">
		<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
		</button>

		<button aria-label="Log in with Facebook" className="p-0 rounded-sm">
		<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<linearGradient id="awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1" x1="6.228" x2="42.077" y1="4.896" y2="43.432" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0d61a9"></stop><stop offset="1" stop-color="#16528c"></stop></linearGradient><path fill="url(#awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1)" d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"></path><path d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z" opacity=".05"></path><path d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z" opacity=".07"></path><path fill="#fff" d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"></path>
</svg>
		</button>

	</div>
	<p className="text-xs text-center sm:px-6 text-gray-500">Already have an account?
		<a rel="noopener noreferrer" href="#" className="underline text-blue-700">Log In</a>
	</p>
</div>
        </div>
    );
}
