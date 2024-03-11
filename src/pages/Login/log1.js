import SignUp from "./SignUp";
import Login from "./Login";
import { useSession } from "next-auth/react";
import Subscribe from "../subscribe";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/cards/Card";
import Link from "next/link";
import Loader from "@/quiz/loader";
import InterestForm from "../../components/propdetailsComponents/sendInterest";
export default function Log1() {
  const router = useRouter();
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [propInterest, setPropInterest] = useState("");
  async function sendInterest(prop) {
    let userName;
    let userEmail;
    let userPhone;
    if (session) {
      userName = await session?.user?.name;
      userEmail = await session?.user?.email;
      userPhone = await session?.user?.phone;
      try {
        const response = await fetch("/api/sendInterest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the appropriate content type
          },
          body: JSON.stringify({ userName, userEmail, userPhone, property_name:prop }),
        });
        if (response.ok) {
          alert("Interest sent !");
        } else {
          const errordata = await response.json();
          alert(errordata.error);
        }
      } catch (error) {
        console.error("Error submitting interest:", error);
        alert("An error occurred ");
      }
    } else {
      setShowInterestForm(true);
      setPropInterest(prop);
    }
  }
  async function handleInterestFormSubmit(formdata) {
    console.log(formdata);
    const prop = propInterest;
    const userName = formdata.name;
    const userEmail = formdata.email;
    const userPhone = formdata.phone;
    try {
      const response = await fetch("/api/sendInterest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
        },
        body: JSON.stringify({ userName, userEmail, userPhone, property_name:prop }),
      });
      if (response.ok) {
        setShowInterestForm(false);
        alert("Interest sent !");
      } else {
        const errordata = await response.json();
        alert(errordata.error);
        setShowInterestForm(false);
      }
    } catch (error) {
      console.error("Error submitting interest:", error);
      alert("An error occurred ");
    }
  }
  function handleCloseInterestForm() {
    setShowInterestForm(false);
  }
  const [isNavigating, setIsNavigating] = useState(false);

  const handleViewMoreClick = () => {
    setIsNavigating(true);

    setTimeout(() => {
      router.push("/Filter&Sort/FilterSearch");
    }, 1000); // Delay navigation for 1 second
  };

  const { key } = router.query;
  const [houseMatches, setHouseMatches] = useState(null);

  async function getHouses(matches) {
    const response = await fetch("/api/getHousesWithMatches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matches }),
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const matches = localStorage.getItem("house_matches");
    if (matches) {
      getHouses(matches).then((data) => {
        // setHouseMatches(data);
        const newData = data?.map((house) => {
          const m = JSON.parse(matches);
          let obj2 = m.find((obj2) => obj2.id == house.id);
          // console.log("obj2",obj2)
          return { ...house, Similarity: obj2.Similarity };
        });
        newData.sort((a, b) => b.Similarity - a.Similarity);
        setHouseMatches(newData);
        // console.log("in useEfftect gethouses", data)
      });
    }
  }, []);

  const { data: session } = useSession();
  const [done, setDone] = useState(false);
  // Function to update database with user's email
  const updateDatabaseWithEmail = async (email) => {
    try {
      // Make a POST request to the submitForm API route

      const response = await fetch("/api/updateHomeMatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, key }),
      });
      if (response.ok) {
        console.log("upadted successfully!");
      } else {
        alert("An error occurred while updating.");
      }
    } catch (error) {
      console.error("Error updating:", error);
      alert("An error occurred while updating.");
    }
  };

  if (!done && session) {
    // User is logged in, update database with email
    setDone(true);
    updateDatabaseWithEmail(session.user.email);
  }

  return (
    <div>
      <div className="fixed w-screen z-50">
        <Navbar />
      </div>
      <div className="flex flex-col justify-between items-center min-h-screen bg-gradient-to-tl from-white via-purple-100 to-white">
        <div className="text-center mt-28">
          <h1 className="lg:text-4xl text-3xl text-blue-500 font-bold mb-4">
            Match Found!
          </h1>
          {session ? (
            <h2 className="lg:text-md text-lg text-black mb-4">
              We’ve discovered homes that matches your preferences. Each home
              shows compatibility score.
            </h2>
          ) : (
            <h2 className="lg:text-md text-lg text-black mb-4">
              We’ve discovered homes that matches your preferences. Sign up or
              Log in to get all the matches along with the compatibility score.
            </h2>
          )}
        </div>
        {houseMatches ? <></> : <Loader />}
        <div className="grid gap-4 pb-6 px-3 md:px-12 lg:grid-cols-2 w-full">
          {houseMatches && (
            <>
            {showInterestForm && (<InterestForm handleCloseInterestForm={handleCloseInterestForm} onSubmit={handleInterestFormSubmit} />)}
              <Card sendInterest={sendInterest} props={houseMatches != null ? houseMatches[0] : {}} />
              <Card sendInterest={sendInterest} props={houseMatches != null ? houseMatches[1] : {}} />
</>
          )}
        </div>

        {session ? (
          // User is logged in,
          <div>
            <button
              className="flex mb-24 py-3 px-9 text-center rounded-lg text-white bg-blue-600"
              onClick={handleViewMoreClick}
            >
              {isNavigating && (
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
              {isNavigating ? <span class="">Loading...</span> : "View More"}
            </button>
          </div>
        ) : (
          // User is not logged in, display sign up
          <>
            <div className="grid gap-4 pb-6 px-1 md:px-12 lg:grid-cols-2 w-full"></div>
            <div className="flex gap-4 mb-24">
              <Subscribe
                type="Log In"
                text="Login"
                classDesc=" py-3 px-9 text-center rounded-lg text-white bg-blue-600"
              />
              <Subscribe
                type="Sign Up"
                text="Sign Up"
                classDesc=" py-3 px-8 text-center rounded-lg text-white bg-blue-600"
              />
            </div>
          </>
        )}
      </div>
    </div>
    // </div>
  );
}
