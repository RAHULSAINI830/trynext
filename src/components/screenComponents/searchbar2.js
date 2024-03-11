import { GiSettingsKnobs } from "react-icons/gi";
import { BsChevronDown } from "react-icons/bs";
import { useState, useEffect } from "react";
import SearchDropdowns from "@/Filter&Sort/Filters/SeachDropdowns";
import { useCity } from "../selectCity";
import { initFlowbite } from "flowbite";
import { useRouter } from "next/navigation";

const Searchbar = ({ handleSmartCollectionsTagClick }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { selectedCity, setSelectedCity } = useCity();
  const [input, setInput] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    bhk: "",
    property: "",
    status: "",
    furnish: "",
    sale: "",
  });
  // const [selectedPrefer, setSelectedPrefer] = useState([]);
  // const [minArea, setMinArea] = useState("200"); // Default min Area
  // const [maxArea, setMaxArea] = useState("12000"); //Default max Area
  // const [minPrice, setMinPrice] = useState("15 Lac");
  // const [maxPrice, setMaxPrice] = useState("50 Cr");
  const [resetSignal, setResetSignal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (selectedFilters) => {
    setSelectedFilters(selectedFilters);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  function handleCity(newCity) {
    setSelectedCity(newCity);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // setSelectedCity(input);
    router.push({
      pathname: "../../Filter&Sort/FilterSearch",
      query: { city: selectedCity, searchInput: input, ...selectedFilters },
    });

    console.log(selectedCity, input, selectedFilters);
  };
  useEffect(() => {
    initFlowbite();
    handleSmartCollectionsTagClick("");
  }, []);
  // console.log(selectedFilters)
  return (
    <>
      <form>
        <div className=" lg:px-4 md:pr-4 lg:ml-0 md:ml-4 mb-3 md:mb-0 md:py-auto px-4 md:px-auto w-full md:w-3/5 p-4 md:p-0 md:flex md:justify-center md:items-center">
          <div className="border relative w-full lg:w-full   rounded-lg">
            <div className="flex items-center w-full h-12 rounded-lg overflow-visible focus-within:shadow-lg bg-white">
              {/* <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option onClick={(e) => {
                        e.preventDefault()
                        handleCity(e.target.value);
                      }}
                      value="Gurgaon">Gurgaon</option>
                <option onClick={(e) => {
                        e.preventDefault()
                        handleCity(e.target.value);
                      }}
                      value="NCR">Delhi NCR</option>
                      <option onClick={(e) => {
                        e.preventDefault()
                        handleCity(e.target.value);
                      }}
                      value="Noida">Noida</option>
              </select> */}
              {/* <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="ml-1  font-semibold rounded-lg text-sm px-2 md:px-5 py-2.5 text-center inline-flex items-center "
                type="button"
              >
                {selectedCity}
                <BsChevronDown className="mt-1.5 m-1" />
              </button>

              <div
                id="dropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-34 "
              >
                <ul
                  className="py-2 w-full text-sm text-gray-700 "
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li className="w-full">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleCity("Gurgaon")
                      }}
                      value="Gurgaon"
                      className="block w-full px-4 py-2 hover:bg-gray-100"
                    >
                      Gurgaon
                    </button>
                  </li>
                  <li className="w-full">
                    <button
                      onClick={(w) => {
                        w.preventDefault()
                        handleCity("Noida")
                      }}
                      className="block px-4 w-full py-2 hover:bg-gray-100"
                    >
                      Noida
                    </button>
                  </li>
                  <li className="w-full">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleCity("NCR")
                      }}
                      className="block px-4 w-full py-2 hover:bg-gray-100 "
                    >
                      Delhi NCR
                    </button>
                  </li>
                </ul>
              </div> */}

<select
  onChange={(e) => handleCity(e.target.value)}
  className="flex text-sm mr-1 rounded-lg border-none"
  value={selectedCity} // Assuming selectedCity is the state variable holding the selected value
  name="city"
>
  <option value="Gurgaon">Gurgaon</option>
  <option value="Noida">Noida</option>
  <option value="NCR">Delhi NCR</option>
</select>


              <input
                className="border-none shadow-2xl overflow-visible focus:border-none rounded-lg w-full h-full outline-none focus:outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                // value={input}
                onChange={onChange}
                placeholder="Enter Location, Project, or Developer"
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(!open);
                }}
                className="p-2 rotate-90 bg-blue-500 hover:bg-blue-700 rounded-md"
              >
                <GiSettingsKnobs className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={handleSubmit}
                className="hidden md:block bg-blue-500 hover:bg-blue-700 p-2 m-1 px-4 md:px-8 rounded-md text-white"
              >
                {isLoading ? (
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
                ) : (
                  "Search"
                )}
              </button>

              <button
                onClick={handleSubmit}
                className="md:hidden text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm mx-1 px-2 py-2 text-center inline-flex items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              </button>
            </div>
            <div className="absolute shadow-lg top-[3.5rem] md:top-[3.5rem] right-0  bg-white rounded-xl ml-4 z-10">
              {open ? (
                <SearchDropdowns
                  open={open}
                  setOpen={setOpen}
                  onFilterChange={handleFilterChange}
                  resetSignal={resetSignal}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Searchbar;
