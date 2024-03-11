import React,{useState, useEffect} from "react";
import { useCity } from "../selectCity";
import { useRouter } from "next/navigation";
import Sparkles from "./sparkles";
const City = () => {
  const delay = 1;
  const [show, setShow] = useState(false);

  useEffect(
    () => {
      let timer1 = setTimeout(() => setShow(true), delay * 50);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },[])
  const router = useRouter();
  const { selectedCity } = useCity();
  const handleNavigate = () => {
    // Pass the selected city as a query parameter
    router.push({
      pathname: "/quiz/page",
      query: { city: selectedCity },
    });
  };
  return (
    <button
      onClick={handleNavigate}
      href="/quiz/page"
      className="text-lg font-inter transition-colors duration-300 ease-in-out text-blue-500 hover:text-white hover:bg-blue-500 md:text-xl  rounded-lg bg-white md:ml-12 md:mx-10 p-2 sm:p-2 ml-6 px-4 md:px-8 "
    >
      {show?<Sparkles>Try our AI home match quiz</Sparkles>:<>Try our AI home matchmaker</>}
      
    </button>
  );
};

export default City;
