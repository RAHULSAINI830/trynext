import React, { useEffect } from 'react';
import LoadingCarousel from '../../components/quizLoadingCarousel/LoadingCarousel';

const Loader = () => {
  useEffect(() => {
    // Use a setTimeout to simulate a 5-second delay
    const timeout = setTimeout(() => {
      // Your code to do something after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-screen overflow-hidden">
      <div class="text-white text-center">
        <h1 class="text-4xl font-bold mb-4">Discover Your Dream Home</h1>
        <p class="text-xl mb-8">Unveiling the Perfect Abode</p>
        <div class="">
        <LoadingCarousel />
        </div>
    </div>

      </div>
    </div>
  );
};

export default Loader;
