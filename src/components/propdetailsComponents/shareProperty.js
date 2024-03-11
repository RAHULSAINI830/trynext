import React from "react";
import copy from "clipboard-copy";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { RxCrossCircled } from "react-icons/rx";
const ShareOptions = ({ url, handleClose }) => {
  const handleCopyLink = () => {
    copy(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">

      <div className="bg-gray-100 w-full mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items center border-b border-gray-200 py-3">
          <div className="flex items-center justify-center">
            <p className="text-xl font-bold text-gray-800">Share</p>
          </div>

          <div>
            <button onClick={handleClose} className="">
              <RxCrossCircled size={"1.5rem"} />
            </button>
          </div>
        </div>

        {/*MODAL BODY*/}
        <div className="my-4">
          
        <p className="text-sm">Copy Link</p>
          {/*BOX LINK*/}
          <div className="border-2 border-gray-200 flex justify-between items-center mt-1 mb-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-gray-500 ml-2"
            >
              <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
              <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
            </svg>

            <input
              className="w-full border border-gray-100 bg-transparent"
              type="text"
              placeholder="link"
              value={url}
            />
            <button
              onClick={handleCopyLink}
              className="bg-indigo-500 text-white rounded text-sm py-2 px-5 mr-2 hover:bg-indigo-600"
            >
              Copy
            </button>
          </div>
          <p className="text-sm">Or Share this link via</p>

          <div className="flex justify-around my-4">
            {/*FACEBOOK ICON*/}
            <FacebookShareButton
              className="w-10 h-10 mr-2"
              url={url}
              quote={`Hey, Checkout this Property `}
            >
              <div className="w-10 h-10 flex shadow-xl text-blue-600 border border-blue-600 hover:text-white items-center justify-center rounded-full hover:bg-blue-600 cursor-pointer mr-2">
                <i className="fa fa-facebook  text-lg "></i>
              </div>{" "}
            </FacebookShareButton>

            {/*TWITTER ICON*/}
            <TwitterShareButton
              className="w-10 h-10 mr-2"
              url={url}
              title={`Hey, checkout this Property `}
            >
              <div className="w-10 h-10 flex items-center justify-center  border border-gray-800 shadow-xl rounded-full hover:text-white hover:bg-gray-800 cursor-pointer mr-2">
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
                  />
                </svg>
              </div>

            </TwitterShareButton>

            {/*WHATSAPP ICON*/}
            <WhatsappShareButton
              className="w-10 h-10 mr-2"
              url={url}
              title={`*Hey, Checkout this Property  `}
            >
              <div className="w-10 h-10 flex items-center justify-center shadow-xl text-green-600 hover:text-white rounded-full border border-green-600 hover:bg-green-600 cursor-pointer mr-2">
                <i className="fa fa-whatsapp text-lg t"></i>
              </div>
            </WhatsappShareButton>

            {/*TELEGRAM ICON*/}
            <LinkedinShareButton
              className="w-10 h-10"
              source={url}
              url={url}
              summary={`Hey, checkout this Property`}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full text-blue-400 shadow-lg border border-blue-400 hover:text-white hover:bg-blue-400 cursor-pointer mr-2">
                <i className="fa fa-linkedin text-lg "></i>
              </div>
            </LinkedinShareButton>
          </div>

        </div>
      </div>

      {/* <div className="w-[500px]  flex flex-col bg-white rounded  ">
       <div className="flex px-5 py-5 bg-blue-300 justify-between">
       <div className="">Social Share</div>
       <div><button onClick={handleClose}className="">X</button></div>
       </div>
       <div className="flex flex-col">
       <div className=" flex rounded flex-row bg-gray-200 mx-5">
        {url}
        <button onClick={handleCopyLink}className="w-1/3"> copy</button>
       </div>
       <div className="flex justify-between flex-row px-10 py-5">
       <FacebookShareButton
         className="w-10 h-10 mr-2"
         url={url}
         quote={`Hey, Checkout this Property `}
       >
         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 cursor-pointer mr-2">
           <i className="fa fa-facebook text-lg text-white"></i>
         </div>{" "}
       </FacebookShareButton>
       <WhatsappShareButton
         className="w-10 h-10 mr-2"
         url={url}
         title={`*Hey, Checkout this Property  `}
       >
         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 cursor-pointer mr-2">
           <i className="fa fa-whatsapp text-lg text-white"></i>
         </div>
       </WhatsappShareButton>
       <TwitterShareButton
         className="w-10 h-10 mr-2"
         url={url}
         title={`Hey, checkout this Property `}
       >
         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 cursor-pointer mr-2">
           <i className="fa fa-twitter text-lg text-white"></i>
         </div>
       </TwitterShareButton>
       <LinkedinShareButton
         className="w-10 h-10"
         source={url}
         url={url}
         summary={`Hey, checkout this Property`}
       >
         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 cursor-pointer mr-2">
           <i className="fa fa-linkedin text-lg text-white"></i>
         </div>
       </LinkedinShareButton>
       </div>
       </div>
    </div> */}
    </div>
  );
};

export default ShareOptions;
