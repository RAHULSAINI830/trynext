"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
const Seachbar = () => {
  const [input, setinput] = useState("");
  const handleinput = (tag) => {
    // setinput(tag.charAt(0).toLowerCase() + input.slice(1));
    setinput(tag.toLowerCase());
    // console.log(input)
    // console.log(converted)
  };

  const router = useRouter();
  const [query] = useDebounce(input, 100)
  useEffect(()=>{
    if(query==="all" || !query){
        router.push('/blog')
    }
    else{
        router.push(`/blog?search=${query}`)
    }
    // console.log(input)
  },[query, router])
  return (
    <div class=" border w-[100%] md:mt-2 md:mb-6 rounded-lg">
      <div class="flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div class="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          class="border-none focus:border-none w-full h-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          value={input}
          onChange={(e) => handleinput(e.target.value)}
          placeholder="Search something..."
        />
      </div>
    </div>
  );
};

export default Seachbar;
