import React, { useState } from "react";
import Log1 from '../Login/log1'
import Link from 'next/link'
import { useRouter } from 'next/router';
import LoadingSpinner from '../loadingSpinner';
import Loader from "./loader";


const Page2 = () => {
  function generateRandomPin() {
    // Generate a random number between 1000 and 9999 (4-digit PIN)
    const min = 1000;
    const max = 9999;
    const randomPin = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomPin;
  }

  const key = generateRandomPin();
  //console.log(`Random PIN: ${randomPin}`);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0)
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedBedRoom, setSelectedBedRoom] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedApar, setSelectedApar] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedProximity, setSelectedProximity] = useState(null);
  const [isButtonClicked1, setIsButtonClicked1] = useState(false);
  const [isButtonClicked2, setIsButtonClicked2] = useState(false);
  const [isButtonClicked3, setIsButtonClicked3] = useState(false);

  const handlePriceClick = (buttonText) => {
    setSelectedPrice({ buttonText });
    setStep(step + 1);
  };
  const handleBedRoomClick = (buttonText) => {
    setSelectedBedRoom({ buttonText });
    setStep(step + 1);
  };
  const handleFlightClick = (buttonText) => {
    setSelectedFlight({ buttonText });
    setStep(step + 1);
  };
  const handleTransportClick = (buttonText) => {
    setSelectedTransport({ buttonText });
    setStep(step + 1);
  };
  const handleFamilyClick = (buttonText) => {
    setSelectedFamily({ buttonText });
    setStep(step + 1);
  };
  const handleAparClick = (buttonText) => {
    setSelectedApar({ buttonText });
    setStep(step + 1);
  };
  const handleAmenitiesClick = (amenity) => {
    setSelectedAmenities((prevSelectedAmenities) =>
      prevSelectedAmenities.includes(amenity)
        ? prevSelectedAmenities.filter((item) => item !== amenity)
        : [...prevSelectedAmenities, amenity]
    );
  };
  const handleProximityClick = (buttonText) => {
    setSelectedProximity({ buttonText });
    if (buttonText === 'Not Important') {
      setIsButtonClicked1(true);
      setIsButtonClicked2(false);
      setIsButtonClicked3(false);
    }

    else if (buttonText === 'Important') {
      setIsButtonClicked1(false);
      setIsButtonClicked2(true);
      setIsButtonClicked3(false);
    }

    else if (buttonText === 'Very Important') {
      setIsButtonClicked1(false);
      setIsButtonClicked2(false);
      setIsButtonClicked3(true);
    }

  };
  const router = useRouter();
  const city = router.query.city;
  const homeMatchData = { key, selectedPrice, selectedBedRoom, selectedFlight, selectedTransport, selectedFamily, selectedApar, selectedAmenities, selectedProximity, city }




  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Make a POST request to the submitForm API route

      const response = await fetch('/api/homeMatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(homeMatchData),
      });
      if (response.status === 200) {
        const { message, data } = await response.json();
        console.log(data)
        localStorage.setItem('house_matches', JSON.stringify(data))
        // alert(message);
        router.push({
          pathname: '../Login/log1',
          query: { key },
        });
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("An error occurred while submitting the form.");
      router.push({
        pathname: './page',
      });
    } finally {
      setIsLoading(false);
    }
  };




  const Price = () => {
    return (
      <div className="flex flex-col lg:flex-row lg:h-screen h-screen">
        {/* Left Half (Image) */}
        <div className="lg:w-1/2 h-1/3 lg:h-auto bg-gray-300 ">
          {/* Replace the 'image-src' with the actual path to your image */}
          <img
            src="https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80"
            alt="Image"
            className="w-full h-full lg:h-full"
          />
        </div>

        {/* Right Half (Heading and Buttons) */}
        <div className="lg:w-1/2 h-2/3 lg:h-auto bg-white p-10 flex flex-col justify-start lg:justify-center lg:relative">
          <Link
            href="../"
            className="absolute top-6 right-6 w-6 h-6 text-gray-600 text-md bg-gray-300 rounded-full flex items-center justify-center z-10"
          >
            X
          </Link>
          <h1 className="text-xl lg:text-3xl text-black text-center font-bold mb-4">In what price range are you looking to buy a property?</h1>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handlePriceClick('Less than 1 cr')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Less than 1 cr
            </button>
            <button
              onClick={() => handlePriceClick('1cr - 2cr')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              1cr - 2cr
            </button>
            <button
              onClick={() => handlePriceClick('2cr - 3cr')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              2cr - 3cr
            </button>
            <button
              onClick={() => handlePriceClick('Above 3cr')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Above 3cr
            </button>
            <div className="flex justify-end mt-4 lg:absolute inset-x-10 bottom-4">

              <button
                onClick={() => setStep(step + 1)}
                className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
              >
                Skip
              </button>
            </div>
          </div>

        </div>
      </div>
    )
  }

  const Bedrooms = () => {
    return (
      <div className="flex flex-col  lg:flex-row lg:h-screen h-screen">
        {/* Left Half (Image) */}

        <Link
          href="../"
          className="absolute top-6 right-6 w-6 h-6 text-gray-600 text-md bg-gray-300 rounded-full flex items-center justify-center z-10"
        >
          X
        </Link>
        {/* Right Half (Heading and Buttons) */}
        <div className="order-last
      lg:w-1/2 h-2/3 lg:h-auto bg-white p-10 flex flex-col justify-start lg:justify-center lg:relative">

          <h1 className="text-xl lg:text-3xl text-black text-center font-bold mb-4">Choose minimum number of bedrooms.</h1>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleBedRoomClick('2 BHK')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              2 BHK
            </button>
            <button
              onClick={() => handleBedRoomClick('3 BHK')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              3 BHK
            </button>
            <button
              onClick={() => handleBedRoomClick('4 BHK')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              4 BHK
            </button>
            <button
              onClick={() => handleBedRoomClick('4 BHK +')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              4 BHK +
            </button>
          </div>
          <div className="flex justify-between mt-4 lg:absolute inset-x-10 bottom-4">
            <button
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              onClick={() => setStep(step + 1)}
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
            >
              Skip
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 h-1/3 lg:h-auto bg-gray-300 ">
          {/* Replace the 'image-src' with the actual path to your image */}
          <img
            src="https://images.unsplash.com/photo-1603512500383-f1f87c13ffc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlZHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
            alt="Image"
            className="w-full h-full"
          />
        </div>
      </div>
    )
  }

  const Flight = () => {
    return (
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Half (Image) */}
        <Link
          href="../"
          className="absolute top-6 right-6 w-6 h-6 text-gray-600 text-md bg-gray-300 rounded-full flex items-center justify-center z-10"
        >
          X
        </Link>
        <div className="lg:w-1/2 h-1/3 lg:h-auto bg-gray-300">
          {/* Replace the 'image-src' with the actual path to your image */}
          <img
            src="https://images.unsplash.com/photo-1507812984078-917a274065be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWlycGxhbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
            alt="Image"
            className="w-full h-full"
          />
        </div>

        {/* Right Half (Heading and Buttons) */}
        <div className="lg:w-1/2 h-2/3 lg:h-auto bg-white p-10 flex flex-col justify-start lg:justify-center lg:relative">
          <h1 className="text-xl lg:text-3xl text-black text-center font-bold mb-4">How often do you fly by air? </h1>
          <div className="flex flex-col lg:flex-row gap-4 justify-center mt-4">
            <button
              onClick={() => handleFlightClick('Rarely')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl">
              Rarely
            </button>
            <button
              onClick={() => handleFlightClick('Sometimes')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl">
              Sometimes
            </button>
            <button
              onClick={() => handleFlightClick('Always')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl">
              Always
            </button>

          </div>
          <div className="flex justify-between mt-4 lg:absolute inset-x-10 bottom-4">
            <button
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              onClick={() => setStep(step + 1)}
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    )
  }

  const Transport = () => {
    return (
      <div className="flex flex-col lg:flex-row h-screen">
        <Link
          href="../"
          className="absolute top-6 right-6 w-6 h-6 text-gray-600 text-md bg-gray-300 rounded-full flex items-center justify-center z-10"
        >
          X
        </Link>
        <div className="order-last  lg:relative
      lg:w-1/2 h-2/3 lg:h-auto bg-white p-10 flex flex-col justify-start lg:justify-center">
          <h1 className="text-xl lg:text-3xl text-black text-center font-bold mb-4">How often do you use public transportation?
            (such as metro, bus, etc.).</h1>
          <div className="flex flex-col lg:flex-row gap-4 justify-center">
            <button
              onClick={() => handleTransportClick('Rarely')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl">
              Rarely
            </button>
            <button
              onClick={() => handleTransportClick('Sometimes')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl">
              Sometimes
            </button>
            <button
              onClick={() => handleTransportClick('Always')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl">
              Always
            </button>

          </div>
          <div className="flex justify-between mt-4 lg:absolute inset-x-10 bottom-4">
            <button
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              onClick={() => setStep(step + 1)}
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
            >
              Skip
            </button>
          </div>
        </div>
        {/* Left Half (Image) */}
        <div className="lg:w-1/2 h-1/3 lg:h-auto bg-gray-300">
          {/* Replace the 'image-src' with the actual path to your image */}
          <img
            src="https://images.unsplash.com/photo-1617152683514-08cd8b3da14f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRyYW5zcG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"
            alt="Image"
            className="w-full h-full"
          />
        </div>

        {/* Right Half (Heading and Buttons) */}

      </div>
    )
  }

  const Family = () => {
    return (
      <div className="flex flex-col lg:flex-row h-screen">
        <Link
          href="../"
          className="absolute top-6 right-6 w-6 h-6 text-gray-600 text-md bg-gray-300 rounded-full flex items-center justify-center z-10"
        >
          X
        </Link>
        {/* Left Half (Image) */}
        <div className="lg:w-1/2 h-1/3 lg:h-auto bg-gray-300">
          {/* Replace the 'image-src' with the actual path to your image */}
          <img
            src="https://images.unsplash.com/photo-1559734840-f9509ee5677f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            alt="Image"
            className="hidden lg:block w-full h-full"
          />
          <img
            src="https://images.unsplash.com/photo-1577897113292-3b95936e5206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1090&q=80"
            alt="Image"
            className="lg:hidden block w-full h-full"
          />
        </div>

        {/* Right Half (Heading and Buttons) */}
        <div className="lg:w-1/2 h-2/3 lg:h-auto bg-white p-10 flex flex-col justify-start lg:justify-center lg:relative">
          <h1 className="text-xl lg:text-3xl text-black text-center font-bold mb-4">What is your family status? </h1>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleFamilyClick('No children & no plans')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              No children & no plans
            </button>
            <button
              onClick={() => handleFamilyClick('No children but planning')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              No children but planning
            </button>
            <button
              onClick={() => handleFamilyClick('Children living with me')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Children living with me
            </button>
            <button
              onClick={() => handleFamilyClick('Children not living with me')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Children not living with me
            </button>
          </div>
          <div className="flex justify-between mt-4 lg:absolute inset-x-10 bottom-4">
            <button
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              onClick={() => setStep(step + 1)}
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    )
  }

  const PrefApar = () => {
    return (
      <div className="flex flex-col lg:flex-row h-screen">
        <Link
          href="../"
          className="absolute top-6 right-6 w-6 h-6 text-gray-600 text-md bg-gray-300 rounded-full flex items-center justify-center z-10"
        >
          X
        </Link>
        <div className="lg:w-1/2 h-2/3 lg:h-auto order-last  bg-white p-10 flex flex-col justify-start lg:justify-center lg:relative">
          <h1 className="text-xl lg:text-3xl text-black text-center font-bold mb-4">What is your preference for apartment type?</h1>
          <div className="flex flex-col lg:flex-row gap-4 justify-center">
            <button
              onClick={() => handleAparClick('Luxury')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl">
              Luxury
            </button>
            <button
              onClick={() => handleAparClick('Budget')}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl">
              Budget
            </button>
          </div>
          <div className="flex justify-between mt-4 lg:mt-8 lg:absolute inset-x-10 bottom-4">
            <button
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              onClick={() => setStep(step + 1)}
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
            >
              Skip
            </button>
          </div>
        </div>
        {/* Left Half (Image) */}
        <div className="lg:w-1/2 h-1/3 lg:h-auto bg-gray-300">
          {/* Replace the 'image-src' with the actual path to your image */}
          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
            alt="Image"
            className="w-full h-full"
          />
        </div>
      </div>
    );
  };
  //to be writen for amenitites as it is multiple choice
  const Amenities = () => {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Half (Image) */}
        <Link
          href="../"
          className="absolute top-6 right-6 w-6 h-6 text-gray-600 text-md bg-gray-300 rounded-full flex items-center justify-center z-10"
        >
          X
        </Link>
        <div className="lg:w-1/2 h-1/3 lg:h-auto bg-gray-300">
          {/* Replace the 'image-src' with the actual path to your image */}
          <img
            src="https://images.unsplash.com/photo-1651375773887-6bafd073f37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="Image"
            className="w-full h-full"
          />
        </div>

        {/* Right Half (Buttons) */}
        <div className="lg:w-1/2 h-2/3 lg:h-auto bg-white p-8 flex flex-col justify-start lg:justify-center lg:relative">
          <h1 className="text-xl lg:text-3xl text-black text-center font-bold mb-4">What are your must have amenities you want in your residential area?
            (Select multiple)</h1>
          <div className="lg:grid lg:grid-cols-3 flex flex-col gap-4 mb-4">
            {/* Row 1 */}
            <button
              onClick={() => handleAmenitiesClick('Gym')}
              className={` hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded
             ${selectedAmenities.includes('Gym') ? 'bg-gray-500 text-white ' : 'bg-transparent text-blue-700 border-blue-500'}`}>
              Gym
            </button>
            <button
              onClick={() => handleAmenitiesClick('Swimming Pool')}
              className={` hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded
            ${selectedAmenities.includes('Swimming Pool') ? 'bg-gray-500 text-white ' : 'text-blue-700 bg-transparent border-blue-500'}`}>
              Swimming Pool
            </button>
            <button
              onClick={() => handleAmenitiesClick('Sports Court')}
              className={`hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded
            ${selectedAmenities.includes('Sports Court') ? 'bg-gray-500 text-white ' : 'text-blue-700 bg-transparent border-blue-500'}`}>
              Sports Court
            </button>

            {/* Row 2 */}
            <button
              onClick={() => handleAmenitiesClick('Power Backup')}
              className={`hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded
            ${selectedAmenities.includes('Power Backup') ? 'bg-gray-500 text-white ' : 'text-blue-700 bg-transparent border-blue-500'}`}>
              Power Backup
            </button>
            <button
              onClick={() => handleAmenitiesClick('Gated Access')}
              className={` hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded
            ${selectedAmenities.includes('Gated Access') ? 'bg-gray-500 text-white ' : 'text-blue-700 bg-transparent border-blue-500'}`}>
              Gated Access
            </button>
            <button
              onClick={() => handleAmenitiesClick('Gardens')}
              className={` hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded
            ${selectedAmenities.includes('Gardens') ? 'bg-gray-500 text-white ' : 'text-blue-700 bg-transparent border-blue-500'}`}>
              Gardens
            </button>

            {/* Row 3 */}
            <button
              onClick={() => handleAmenitiesClick('Restaurant')}
              className={` hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded
            ${selectedAmenities.includes('Restaurant') ? 'bg-gray-500 text-white ' : 'bg-transparent border-blue-500 text-blue-700'}`}>
              Restaurant
            </button>
          </div>

          {/* OK Button */}
          <button
            onClick={() => setStep(step + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md">
            OK
          </button>
          <div className="flex justify-between mt-4 lg:absolute inset-x-10 bottom-4">
            <button
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              onClick={() => setStep(step + 1)}
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    )
  }

const Proximity = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
    <Link
        href="../"
        className="absolute top-6 right-6 w-6 h-6 text-gray-600 text-md bg-gray-300 rounded-full flex items-center justify-center z-10"
      >
        X
      </Link>
      {/* Text div */}
      <div className="lg:w-1/2 h-2/3 lg:h-auto order-last  bg-white p-10 flex flex-col justify-start lg:justify-center lg:relative">
        {/* Back button */}

          <h1 className="text-xl lg:text-3xl text-black text-center font-bold mb-4">
            How important is it for you to live closer to the popular hubs in the city?
          </h1>
          <div className="flex flex-col lg:flex-row gap-4 justify-center">
            <button
              onClick={() => handleProximityClick('Not Important')}
              className={`${isButtonClicked1 ? 'bg-blue-500 text-white border-white' : 'bg-transparent text-blue-700'} hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl`}
            >
              Not Important
            </button>
            <button
              onClick={() => handleProximityClick('Important')}
              className={`${isButtonClicked2 ? 'bg-blue-500 text-white border-white' : 'bg-transparent text-blue-700'} hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl`}>
              Important
            </button>
            <button
              onClick={() => handleProximityClick('Very Important')}
              className={`${isButtonClicked3 ? 'bg-blue-500 text-white border-white' : 'bg-transparent text-blue-700'} hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border-2 border-blue-500 hover:border-transparent rounded-xl`}>
              Very Important
            </button>
          </div>
          <div className="flex justify-between mt-4 lg:mt-8 lg:absolute inset-x-10 bottom-4">
            <button
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold text-xs hover:text-white py-1 px-2 border-2 border-gray-500 hover:border-transparent rounded-xl"
            >
              submit
            </button>

          </div>
          {/* Skip button */}

        </div>

        {/* image div*/}
        <div className="container lg:w-1/2 h-1/3 lg:h-auto bg-gray-300">
          <img
            src="https://images.unsplash.com/photo-1471306224500-6d0d218be372?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNpdHklMjBzdHJlZXRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
            alt="Image"
            className="w-full h-full"
          />
        </div>
      </div>
    );
  };

  const fieldGroups = [
    <Price key="price" />,
    <Bedrooms key="bedrooms" />,
    <Flight key="flight" />,
    <Transport key="transport" />,
    <Family key="family" />,
    <PrefApar key="prefApar" />,
    <Amenities key="amenities" />,
    <Proximity key="proximity" />,

  ];

    return (
      <div>
        {isLoading && <LoadingSpinner />}
        {/* {isLoading && <Loader/>} */}
        {fieldGroups[step]}
      </div>
    );
  };

export default Page2;
