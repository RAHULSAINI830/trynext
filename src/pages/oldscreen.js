import Image from 'next/image'
import { Imprima, Inter } from 'next/font/google'
//import { useRef } from "react";
import Profile from './Login/profile.js';
import Navbar from './components/navbar.js'
import Insights from "./components/insights.js";
import Homematch from "./components/homematch.js";
import Smartfilters from "./components/smartfilters.js";
import Partner from "./components/partnerwith.js"
import Reviews from "./components/reviews.js";
import Footer from "./components/footer.js";
import Subscribe from "./subscribe.js";
import Link from 'next/link'
import Log1 from './Login/log1.js';
import Log2 from './Login/Log2.js';
import SignUp from './Login/SignUp.js';
import Quiz from './quiz/page.js';
import ForgotPwd from './Login/forgotpwd.js';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCity } from '../components/selectCity.js';
//import Login from './Login/Login.js';
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
    const router = useRouter();
    const { selectedCity } = useCity();

    const handleNavigate = () => {
        // Pass the selected city as a query parameter
        router.push({
            pathname: '/quiz/page',
            query: { city: selectedCity },
        });
    };

    return (
        <div>

            <div>
                <div className="fixed w-screen z-50">

                    <Navbar /></div>



                <section class="relative">

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 absolute z-0 inset-0 over overflow-hidden bg-black brightness-50">
                        <div class="absolute inset-0 bg-purple-400 bg-opacity-30"></div>
                        <div class="grid gap-4 lg:gap-0">
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60" alt="" />
                            </div>
                        </div>
                        <div class="grid lg:gap-0 gap-4">
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1580041065738-e72023775cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1619994121345-b61cd610c5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" alt="" />
                            </div>
                        </div>
                        <div class="grid gap-4">
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1524549207884-e7d1130ae2f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://images.pexels.com/photos/1042594/pexels-photo-1042594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="" />
                            </div>
                        </div>
                        <div class="grid gap-4">
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class='z-10'>
                        <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-900" >

                            <h1 className="relative text-5xl mt-10 font-bold leadi lg:text-6xl xl:max-w-3xl text-white">Discover your dream home, today</h1>

                            <p className="relative mt-6 mb-8 text-xl lg:text-3xl sm:mb-12 xl:max-w-3xl drop-shadow-lg text-white ">Get exclusive, verified, and personalized recommendations just for you</p>
                            <div className="flex flex-wrap justify-center lg:gap-10">
                                <Link class="relative text-lg px-8 py-2 ml-4 overflow-hidden font-semibold text-blue-700 rounded-xl bg-white border-2 border-blue-700 " onClick={handleNavigate} href="/quiz/page">Take our Home Matchmaking Quiz</Link>

                            </div>
                        </div>
                    </div>

                </section>


            </div>
            <Insights />
            <Homematch />
            <Smartfilters />
            <Partner id="hlopartner" />
            <Reviews />
            <Footer />
        </div>
    );
}
