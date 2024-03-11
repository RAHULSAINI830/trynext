import { Textarea } from "flowbite-react";
import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
const InterestForm = ({ onSubmit, handleCloseInterestForm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    text: "",
  });
  const handleOutside = (e) => {
    if (e.target.id == "overlay") {
      // console.log(e.target);
      handleClose();
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    handleCloseInterestForm();
  };

  return (
    <div
      id="overlay"
      onClick={handleOutside}
      className="fixed z-[999] inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-[400px] relative justify-center items-center flex flex-col bg-white rounded py-6  px-6 lg:px-8 ">
        <div className="absolute top-0 right-0 p-4">
          <button className="">
            <RxCrossCircled
              onClick={handleClose}
              className=""
              size={"1.5rem"}
            />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div className="">
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
                value={formData.email}
                onChange={handleChange}
                name="email"
                id="website-admin"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="">
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
                value={formData.name}
                onChange={handleChange}
                name="name"
                id="website-admin"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 20"
                >
                  <path d="M12 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7.5 17.5h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12 13H2V4h10v9Z" />
                </svg>
              </span>
              <input
                id="phone"
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Contact Number"
              />
            </div>
          </div>
          <div className="">
            <div className="flex">
              <textarea
                id="text"
                type="text"
                name="text"
                value={formData.text || ""}
                onChange={handleChange}
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Write your Message..."
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded lg text-sm px-5 py-2.5 text-center"
          >
            Send Interest
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterestForm;
