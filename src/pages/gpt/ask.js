// Ask.js

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaArrowCircleRight, FaAngleLeft } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import Navbar from "@/components/navbar";
import NextNProgress from "nextjs-progressbar";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/router";
import Avatar from "@/avatar";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import { useSession } from "next-auth/react";
export default function Ask() {
  const router = useRouter();
  const { firstasksting } = router.query;
  const { propname } = router.query;
  const [limit, setLimit] = useState(5)
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0); // Track the number of messages
  const chatMessagesRef = useRef();
  const {data:session} = useSession()
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    const newMessage = { user: "You", text: inputValue };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    setInputValue("");
    setMessageCount((prevCount) => prevCount + 1); // Increment message count

    try {
      const responseData = await fetch('/api/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: newMessage.text }),
      }).then((res) => res.json());
      const responseMessage = messageCount >= 0 && messageCount < limit ? {
        user: "Bot",
        text: responseData.error
          ? "I'm sorry, something went wrong. Please try again later."
          : responseData.answer,
      } : !session ? {
        user: "Bot",
        text: "Session limit reached. Login to reset limit",
      }:{
        user: "Bot",
        text: "Session limit reached.",
      };
      

      setChatMessages((prevMessages) => [...prevMessages, responseMessage]);
      setLoading(false);
    } catch (error) {
      const responseMessage = messageCount >= 0 && messageCount < limit ? {
        user: "Bot",
        text: "I'm sorry, something went wrong. Please try again later.",
      }: !session ? {
        user: "Bot",
        text: "Session limit reached. Login to reset limit",
      }:{
        user: "Bot",
        text: "Session limit reached.",
      };
      setChatMessages((prevMessages) => [...prevMessages, responseMessage]);
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to the bottom when chatMessages is updated
    if(session){
      setLimit(10)
    }
    chatMessagesRef.current.scrollTop =
      chatMessagesRef.current.scrollHeight -
      chatMessagesRef.current.clientHeight;
  }, [chatMessages]);

  useEffect(() => {
    if (firstasksting) {
      searchBasedOnQueryString(firstasksting);
    }
  }, []);
console.log(messageCount)
  const searchBasedOnQueryString = (queryString) => {
    const newMessage = { user: "You", text: queryString };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    setInputValue("");
    setMessageCount(1); // Reset message count for session-based search

    // Simulate a response after a short delay
    setTimeout(async () => {
      try {
        const responseData = await fetch('/api/response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: newMessage.text }),
        }).then((res) => res.json());
        const responseMessage = messageCount >= 0 && messageCount < limit ? {
          user: "Bot",
          text: responseData.error
            ? "I'm sorry, something went wrong. Please try again later."
            : responseData.answer,
        } : !session ? {
          user: "Bot",
          text: "Session limit reached. Login to reset limit",
        }:{
          user: "Bot",
          text: "Session limit reached.",
        };
        

        setChatMessages((prevMessages) => [...prevMessages, responseMessage]);
        setLoading(false);
      } catch (error) {
        const responseMessage = messageCount >= 0 && messageCount < limit ? {
          user: "Bot",
          text: "I'm sorry, something went wrong. Please try again later.",
        }: !session ? {
          user: "Bot",
          text: "Session limit reached. Login to reset limit",
        }:{
          user: "Bot",
          text: "Session limit reached.",
        };
        setChatMessages((prevMessages) => [...prevMessages, responseMessage]);
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }, 1500);
  };

  useEffect(() => {
    // Check if a session exists and limit the number of messages accordingly
    if (messageCount > 0 && messageCount < limit) {
      // Perform any additional actions for a session
    } else if (messageCount >=10) {
      // Handle session limit (e.g., display a message, reset the session, etc.)
      console.log('Session limit reached.');
      // setMessageCount(0);
      // You can perform additional actions as needed for resetting the session
    }
  }, [messageCount]);

  return (
    <>
      <NextNProgress color="#4f6df3" height={5} />
      <div className="sticky h-[4.3rem] top-0 z-[999]">
        <Navbar />
      </div>
      <div className="chat-container flex flex-col h-[calc(100vh-68.8px)] bg-gradient-to-r from-[#1D4ED8] to-[#8C52FF] p-3 md:p-6">
        <div className="flex text-lg md:text-xl gap-5 pl-2 items-center justify-start">
          <div className="flex items-center text-white  justify-center">
            <FaAngleLeft />
            {propname ? (
              <Link
                className="pb-0.5"
                href={`/propertydetails/${propname.replace(/\s+/g, "-")}`}
              >
                Back
              </Link>
            ) : (
              <Link href={"/"}>Back</Link>
            )}
          </div>
          <div className="flex gap-2 text-white items-center justify-center">
            <FaRobot />
            <div className="text-white font-medium">AI Assistant</div>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatMessagesRef} style={{ scrollBehavior: 'smooth' }}
          className="chat-messages-container text-lg overflow-y-auto flex-grow p-2"
        >
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.user === "You" ? "user flex justify-end" : "bot"
              }`}
            >
              <div className="flex">
                {message.user !== "You" && (
                  <div className=" text-white flex items-center mr-2">
                    <Image src="/technology.png" className="" height={45} width={45}/>
                  </div>
                )}
                <div
                  className={`${
                    message.user === "You"
                      ? "bg-slate-800 text-white"
                      : "bg-white mr-10"
                  } message-content shadow-md inline-block my-2 w-fit  p-3 rounded-md`}
                >
                  {message.user === "You" ? (
                    message.text
                  ) : (
                    <div className="relative">
                      <div className="text-transparent">{message.text}</div>
                      <div className="absolute top-0 left-0 p-0 m-0 w-[105%]">
                        <Typewriter
                          options={{
                            cursor: "",
                            delay: 10,
                            deleteSpeed: 50,
                            loop: false,
                          }}
                          onInit={(typewriter) => {
                            // Check if message.text is a string
                            const textToType =
                              typeof message.text === "string"
                                ? message.text
                                : String(message.text);
                            typewriter.typeString(textToType).start();
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {message.user === "You" && (
                  <div className=" text-white flex items-center">
                    <Avatar size={"2rem"} />
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message flex items-center justify-start gap-2 bot">
              <div className=" text-white flex items-center mr-2">
                <FaRobot size={"2rem"} />
              </div>
              <div className="bg-white p-0.5 w-2 h-2 rounded-full animate-bounce blue-circle"></div>
              <div className="bg-white p-0.5 w-2 h-2 rounded-full animate-bounce green-circle"></div>
              <div className="bg-white p-0.5 w-2 h-2 rounded-full animate-bounce red-circle"></div>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="flex mt-2 bg-white p-3 rounded-xl gap-4">
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterKeyPress}
            className="w-full p-2 border border-gray-200 focus:outline-none rounded-md resize-none"
            placeholder="Reply"
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="submit-button text-blue-500"
          >
            <FaArrowCircleRight size={"2rem"} />
          </button>
        </div>
      </div>
    </>
  );
}
