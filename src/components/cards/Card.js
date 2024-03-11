import Link from "next/link";
import { useEffect } from "react";
import InterestButton from "../screenComponents/InterestButton";
const Card = ({ sendInterest, props }) => {
  const specificContent = {
    "Advanced Stage Construction": "Under Construction",
    "Early Stage Construction": "Under Construction",
    "Mid Stage Construction": "Under Construction",
    "Well Occupied": "Ready To Move",
  };
  function handleInterestClick() {
    sendInterest(props?.property_name);
  }
  const formattedProperty = props?.property_name?.replace(/\s+/g, "-") || "";
  const [units, landSize] = props?.propertysize || [];
  return (
    <div className=" font-inter z-0 flex flex-col bg-[#F2F5FC] border border-purple-300 rounded-lg hover:shadow-lg hover:drop-shadow-xl transition-all ease-in-out duration-200 shadow-gray-300 h-fit ">
      <div className="h-full">
        <Link
          target="__blank"
          href={`/propertydetails/${formattedProperty}?match=${(
            props?.Similarity * 100
          ).toFixed(2)}`}
          className="flex p-2 pb-0 "
        >
          <div className="w-[35%] md:h-36 overflow-hidden mr-2 ">
            <div
              className="w-full relative h-full rounded-lg"
              style={{
                height: "100%",
                backgroundImage: `url(${props?.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {(specificContent[props?.status] || props?.status) && (
                <div className="flex justify-center pt-1">
                  <div className="absolute mt-1 min-[300px]:text-[0.7rem] text-xs lg:text-sm flex justify-center bg-black text-white py-1 px-1  rounded-md bg-opacity-60">
                    <div className="line-clamp-1">
                    {specificContent[props?.status] || props?.status}
                    </div>
                    
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between w-[70%] lg:w-[80%]">
            <div className="block">
              <div className="flex w-full">
                <div className="font-bold  w-4/6 text-sm md:text-base">
                  {props?.property_name}
                  {/* Prasvanth Housing Complex */}
                </div>
                {props?.Similarity && (
                  <div className="text-md w-1/2 text-sm text-right text-green-500 drop-shadow-lg">
                    {/* 93% match */}
                    {(props?.Similarity * 100).toFixed(2)}% match
                  </div>
                )}
              </div>

              <div className="text-blue-600 mb-2 text-sm md:text-base">
                {props?.builder_details?.name}
                {/* Prasvanth Housing Limited */}
              </div>

              <div className="text-sm"> {props?.location}</div>
              {props.configuration && (
                <div className="text-slate-600 text-[0.8rem] md:text-sm">
                  {props?.configuration}
                </div>
              )}
            </div>

            <div className="flex text-xs md:text-sm justify-between">
              {props?.price_range && (
                <div className="font-bold  text-blue-600">
                  INR {props?.price_range}
                </div>
              )}
              {/* <div className="text-slate-600">
                {units}
              </div> */}
            </div>
          </div>
        </Link>
        <div className="">
          <div className="flex relative gap-4 w-full mt-2 pl-3 py-[0.6rem] sm:py-2 text-sm rounded-b-lg bg-blue-200 text-blue-500 items-end">
            {/* {props?.airport_distance < 15 && (
              <span className="mr-2.5">#near airport</span>
            )}
            {props?.metro_distance?.dist.split(" ")[0] < 15 && (
              <span className="mr-2.5">#near metro</span>
            )}
            {props?.school?.rate > 4 && (
              <span className="mr-2.5">#near top schools</span>
            )}
            {!(
              props?.airport_distance < 15 ||
              props?.metro_distance?.dist.split(" ")[0] < 15 ||
              props?.school?.rate > 4
            ) && <span className="text-transparent">#none</span>} */}
            <div className="flex text-xs sm:text-sm sm:hidden">
              {[...new Set(props?.tags)].slice(0, 3).map((tag, i) => {
                return (
                  <div key={i} className="mr-1">
                    #{tag}
                  </div>
                );
              })}
              {/* <InterestButton cssclass={"font-roboto absolute -bottom-3  right-1 text-sm p-1 px-2 border rounded-lg text-white bg-blue-700 hover:bg-blue-800"}
                property_name={props?.property_name} /> */}
            </div>
            <div className="hidden sm:flex">
              {[...new Set(props?.tags)].map((tag, i) => {
                return (
                  <div key={i} className="mr-2">
                    #{tag}
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleInterestClick}
              className="font-roboto absolute bottom-0.5  right-1 text-[0.5rem] sm:text-sm p-1 px-2 border rounded-lg text-white bg-blue-700 hover:bg-blue-800"
            >
              Send interest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
