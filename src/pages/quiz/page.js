import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link'

const Quiz = () => {
  const router = useRouter();
  const city = router.query.city || 'Gurgaon'

  return (
    <div
      className="relative flex flex-col items-start justify-start h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')" }}
    >
       <div class="absolute inset-0 bg-black bg-opacity-70"></div>
       <Link
           href="../"
           className="absolute top-6 right-6 w-6 h-6 text-gray-600 text-md bg-gray-300 rounded-full flex items-center justify-center z-10"
         >
           X
         </Link>
      <div className="relative w-2/3 lg:p-10">
        <h1 className="lg:text-5xl text-4xl text-white font-bold">Take the 2 Minutes Home Matchmaking Quiz </h1>
        <p className="mt-5 mb-8 lg:text-2xl text-xl text-white">Let’s discover your ideal home by exploring your preferences! Answer a few simple questions and together we’ll find your dream home, today. </p>
        <Link className="mt-6 px-4 py-2 bg-[#8c52ff] text-white rounded-md"  href={`./page2?city=${city}`}> Let’s Begin!</Link>
      </div>

    </div>
  );
};

export default Quiz;
