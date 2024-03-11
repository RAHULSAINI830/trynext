import Link from "next/link";

const CardList = (props) => {
  const specificContent = {
    "Advanced Stage Construction": "Under Construction",
    "Early Stage Construction": "Under Construction",
    "Mid Stage Construction": "Under Construction",
    "Well Occupied": "Ready To Move",
  };

  function handleInterestClick() {
    props.sendInterest(props?.property);
  }
  const formattedProperty =
    props.property?.replace(/\s+/g, "-") || "default-value";

  // console.log(props)
  return (
    <div className=" font-inter z-0 flex flex-col my-4 bg-[#F2F5FC] border border-purple-300 rounded-lg hover:shadow-lg hover:drop-shadow-xl transition-all ease-in-out duration-200 shadow-gray-300 w-full ">
      <div className="w-full h-full">
        <Link
          target="__blank"
          href={`/propertydetails/${formattedProperty}?match=${(
            props?.Similarity * 100
          ).toFixed(2)}`}
          className="flex w-full h-full p-2 pb-0"
        >
          <div className="w-[30%] lg:w-[20%] md:h-36 overflow-hidden mr-2 ">
            <div
              className="w-full relative h-full rounded-lg"
              style={{
                height: "100%",
                backgroundImage: `url(${props?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex justify-center pt-1">
                <div className="absolute line-clamp-1 mt-1 max-[450px]:text-[0.65rem] text-xs lg:text-sm flex justify-center bg-black text-white py-1 px-1  rounded-md bg-opacity-60">
                <div className="line-clamp-1">
                    {specificContent[props?.status] || props?.status}
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-[70%] lg:w-[80%]">
            <div className="block">
              <div className="flex w-full">
                <div className="font-bold  w-full text-sm md:text-base">
                  {props?.property}
                </div>
                {props?.Similarity && props?.Similarity != "NaN" && (
                  <div className="text-md w-1/2 text-sm text-right text-green-500 drop-shadow-lg">
                    {(props?.Similarity * 100).toFixed(2)} % match
                  </div>
                )}
              </div>

              <div className="text-blue-600 mb-2 text-sm md:text-base">
                {props?.builder}
              </div>
              <div className="text-sm"> {props?.address}</div>
              <div className="text-slate-600 text-[0.8rem] md:text-sm">
                {props?.bhk}
              </div>
            </div>

            <div className="flex justify-between mt-2 text-[0.75rem] sm:text-sm md:text-base">
              <div className="font-bold text-blue-600">
                INR {props?.priceRange}
              </div>
              <div className="text-slate-600">
                {/* {props?.units}, {props?.carpet || props?.super}{" "} */}
              </div>
            </div>
          </div>
        </Link>
        <div className="relative  mt-12 sm:mt-10 bottom-4">
          <div className="flex text-[0.7rem] min-[500px]:text-sm min-[500px]:hidden w-full absolute -bottom-4 pl-3 py-[0.6rem] sm:py-2 rounded-b-lg bg-blue-200 text-blue-500 items-end">
            <div className="flex gap-1.5">
              {[...new Set(props?.tags)].slice(0, 3).map((tag, i) => {
                return (
                  <div key={i} className="">
                    #{tag}
                  </div>
                );
              })}
            </div>
            {props?.tags.length > 3  && <>...</>}
          </div>
          <div className="hidden min-[500px]:flex gap-3 w-full absolute -bottom-4 pl-3 py-[0.6rem] sm:py-2 text-sm rounded-b-lg bg-blue-200 text-blue-500 items-end">
            {[...new Set(props?.tags)].map((tag, i) => {
              return (
                <div key={i} className="mr-2 inline">
                  #{tag}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleInterestClick}
            className="font-roboto absolute -bottom-3 sm:-bottom-[0.85rem]  md:-bottom-[0.8rem]  right-1 text-xs sm:text-sm p-1 px-2 border rounded-lg text-white bg-blue-700 hover:bg-blue-800"
          >
            Send interest
          </button>
        </div>
      </div>
    </div>
    // <div class="flex flex-col mb-3 bg-white border border-purple-300 rounded-lg shadow-lg shadow-gray-300 sm:w-[35rem] max-w-l hover:bg-gray-100">

    //   <Link href={`/propertydetails/${formattedProperty}`}>
    //     <div class="flex flex-col lg:flex-row ">
    //       <div className="relative  lg:w-1/6">
    //         <div class="absolute h-1/6 inset-3 lg:text-xs bg-black text-white py-1 px-2  rounded-xl bg-opacity-60">
    //           {specificContent[props?.status] || props?.status}
    //         </div>
    //         <img
    //           className="lg:h-32 flex lg:w-48 w-full  h-64 rounded-xl p-1  "
    //           src={props?.image}
    //           alt=""
    //         />
    //       </div>
    //       <div class="lg:w-4/6 w-full flex flex-col">
    //         <h5 class="text-md px-4 text-left font-bold text-black pt-2">
    //           {props?.property}
    //         </h5>
    //         <h5 class="text-md px-4 text-left text-blue-500 pt-1 ">
    //           {props?.builder}
    //         </h5>
    //         <div className="flex justify-between pt-1 ">
    //           <h5 class="text-xs px-4  text-gray-500 pt-1 ">
    //             {props?.address}
    //           </h5>
    //           <h5 class="text-md px-4  text-blue-500 font-bold drop-shadow-md pt-1">
    //             ₹ {props?.priceRange}
    //           </h5>
    //         </div>
    //         <div class="justify-between pb-1 align-center flex ">
    //           <h5 class="text-xs px-4 text-gray-500 pt-1 ">{props?.bhk}</h5>
    //           <h5 class="text-xs px-4 text-left text-gray-500 pt-1 ">
    //             {props?.units}, {props?.carpet || props?.super}{" "}
    //           </h5>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex bg-blue-100 justify-between">
    //       <footer class="bg-blue-100 text-blue-500 text-sm text-left px-4 py-2">
    //         #near airport #near airport #near airport #near airport{" "}
    //       </footer>
    //       <button className="text-sm px-4 m-1 py-1 bg-blue-500 text-white rounded ">
    //         send Interest
    //       </button>
    //     </div>
    //   </Link>
    // </div>
  );
};
// //<div className="text-md text-green-500 drop-shadow-md">93% match</div>
// export default function Cardlist(){
//   return(<></>)
// }
export default CardList;
