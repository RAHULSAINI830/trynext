import React, { useState } from "react";
import { BsFillEnvelopeFill } from "react-icons/bs";

const Reachout = ({ session, property_name }) => {
  const [messageName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleMessage(e) {
    e.preventDefault();
    if (message === "") {
      alert("No Message entered ");
    } else {
      const prop = property_name;
      let userName;
      let userEmail;
      if (session) {
        userName = await session?.user?.name;
        userEmail = await session?.user?.email;
      } else {
        userName = messageName;
        userEmail = email;
      }
      console.log(userName, userEmail, message, prop);
      try {
        const response = await fetch("/api/propertyAssistance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the appropriate content type
          },
          body: JSON.stringify({ userName, userEmail, message, prop }),
        });
        if (response.ok) {
          alert("message submitted !");
        } else {
          const errordata = await response.json();
          alert(errordata.error);
        }
      } catch (error) {
        console.error("Error submitting message:", error);
        alert("An error occurred while submitting the message.");
      }
    }
  }
  return (
    <div>
      {/* Reachout */}
      <div
        id="reachout"
        className="font-roboto px-3 md:px-12 lg:px-24 py-4 pt-16 max-h-100vh"
      >
        {" "}
        <div className="bg-[#F2F5FC] grid grid-cols-1 md:grid-cols-2 p-3 md:p-6 rounded-lg shadow-xl">
          <div className="">
            <div className="flex justify-center">
              <div className="">
                <div className="bg-blue-700 p-1 rounded-full">
                <BsFillEnvelopeFill className="p-2 text-white" size={"3rem"} />

                </div>
              </div>
              <div className="font-semibold p-2 text-blue-600 text-sm pt-3 md:pt-2 md:text-xl">
                Reach Out To Us For Assistance
              </div>
            </div>
            <div className="text-center mb-4 text-sm md:text-base py-2">
              Ask a question about the property and we will get back to you
              within 24 hours!
            </div>
            <form className="w-full px-6 mx-auto" onSubmit={handleMessage}>
              <div className="flex my-2">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="website-admin"
                  className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  placeholder="Name"
                />
              </div>
              <div className="flex mb-2">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  name="name"
                  id="website-admin"
                  className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  placeholder="Email"
                />
              </div>
            </form>
          </div>
          <div className="">
            <div class="flex justify-center">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a Question..."
                className=" border-white rounded-md bg-blue-300"
                id="w3review"
                name="w3review"
                rows="8"
                cols="100"
              ></textarea>
            </div>

            <button className="px-6 w-full mt-2 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-700">
              Send Message{" "}
            </button>
          </div>
        </div>
      </div>
      {/* <div
        id="reachout"
        className="font-roboto px-3 md:px-12 lg:px-24 py-4 md:pt-16 max-h-100vh"
      >
        <div className="bg-[#F2F5FC] p-3 md:p-6 rounded-lg shadow-xl">
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-700 p-2">
              <BsFillEnvelopeFill className=" text-white" size={"2rem"} />
            </div>
            <div className="font-semibold p-2 text-blue-600 text-sm pt-3 md:pt-2 md:text-xl">
              Reach Out To Us For Assistance
            </div>
          </div>
          <div className="text-center text-sm md:text-base py-2">
            Ask a question about the property and we will get back to you within
            24 hours!
          </div>
          <div class="mb-6 flex justify-center">
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a Question..."
              className=" border-white rounded-lg bg-blue-300"
              id="w3review"
              name="w3review"
              rows="8"
              cols="100"
            ></textarea>
          </div>

          {session ? (
            <div className="flex justify-center">
              <button
                onClick={handleMessage}
                className="px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700"
              >
                Send Message
              </button>
            </div>
          ) : (
            <form className="md:w-80 mx-auto" onSubmit={handleMessage}>
              <label
                for="website-admin"
                className="block my-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  onChange={(e) => setEmail(target.value)}
                  name="name"
                  id="website-admin"
                  className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  placeholder="user@smartneev.com"
                />
              </div>
              <label
                for="website-admin"
                className="block my-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="website-admin"
                  className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  placeholder="username"
                />
              </div>
              <div className="flex justify-center mt-4">
                <button className="px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700">
                  Send Message{" "}
                </button>
              </div>
            </form>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Reachout;
