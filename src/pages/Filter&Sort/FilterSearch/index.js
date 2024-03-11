import { initFlowbite } from "flowbite";
import { useCity } from "../../../components/selectCity";
import { RxCrossCircled } from "react-icons/rx";
import { LuListFilter } from "react-icons/lu";
import { BsChevronDown } from "react-icons/bs";
import { FaMagnifyingGlass, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import FilterOpt from "../FilterOpt3";
import CardList from "../../../components/cards/CardList";
import Navbar from "../../components/navbar";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from "./loading";
import InterestForm from "../../../components/propdetailsComponents/sendInterest";

export default function FilterSearch3() {
  const router = useRouter();

  useEffect(() => {
    initFlowbite();
  }, []);

  const [searchQuery, setSearchQuery] = useState(router.query.searchInput || "");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    bhk: router.query?.bhk || "",
    property: router.query?.property || "",
    status: router.query?.status || "",
    furnish: router.query?.furnish || "",
    sale: router.query?.sale || "",
  });
  const [selectedPrefer, setSelectedPrefer] = useState([]);
  const [minArea, setMinArea] = useState("200"); // Default min Area
  const [maxArea, setMaxArea] = useState("12000"); //Default max Area
  const [minPrice, setMinPrice] = useState("15 Lac");
  const [maxPrice, setMaxPrice] = useState("50 Cr");
  const [combinedData, setCombinedData] = useState([]);
  const [fetchdata, setFetch] = useState(false);
  const [selectedSort, setSelectedSort] = useState(""); // State to store selected sort option
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [showSidebar, setShowSidebar] = useState(false);
  const { selectedCity, setSelectedCity } = useCity();
  const [fetchedDataCount, setFetchedDataCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [pages, setPages] = useState([1, 2, 3, 4]);
  const [start, setStart] = useState(1);
  const PageScrollRef = useRef(null);

  const handleSearchQuerySubmit = (e) => {
    e.preventDefault();
    setSelectedPage(1);
    applyFilters();
  };

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
          body: JSON.stringify({ userName, userEmail, userPhone, property_name: prop }),
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
        body: JSON.stringify({ userName, userEmail, userPhone, property_name: prop }),
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

  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedProperty(suggestion);
  };

  function convertToNumeric(value) {
    // Convert lac to crore (1 lac = 0.01 cr)
    const isLac = value.includes("Lac");
    const numericValue = parseFloat(
      value.replace(/,/g, "").replace("Lac", "").replace("Cr", "") *
      (isLac ? 0.01 : 1)
    );
    return numericValue;
  }

  useEffect(() => {
    async function fetchData() {
      console.log("in useEffect[] router.query", router.query);
      if (data.length === 0) {
        setIsLoading(true);
      }

      try {
        if (router.query.hasOwnProperty('bhk') || router.query.hasOwnProperty('searchInput') || router.query.hasOwnProperty('tags')) {
          console.log("in router", router.query.bhk)
          setFetch(true);
          setIsLoading(false);
          return;
        } else {
          console.log("else")
          const localStorageData = localStorage.getItem('house_matches');
          let jsonData;
          if (localStorageData != null && (session?.user?.name || session?.user?.email || session?.user?.phone)) {
            // If the user is logged in and the local storage is set i.e., the user has Attempted the quiz (local storage is set after a user attempts quiz)
            console.log(localStorageData)
            const localStorageJson = JSON.parse(localStorageData);
            setIsLoading(true);
            const response = await fetch(`/api/propertyData`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ matches: localStorageJson })
            });
            jsonData = await response.json();
            console.log("in fetch", jsonData)
            // sort data based on similarity
            const sortedDataBasedOnSimilarity = jsonData.sort((a, b) => b.Similarity - a.Similarity);
            setData(sortedDataBasedOnSimilarity);
            setSortedData([]) // Clear the sorted data because the html code checks for sorted data length first and ignores the else part where 'data' is rendered
            setIsLoading(false);
          } else {
            // Fetch all properties from the API 
            applyFilters();

          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }

    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("in useEffect[router.query]", router.query);
    if (Object.keys(router.query).length == 0) {
      return;
    }
    if (router.query.tags && !(selectedPrefer.includes(router.query.tags)) && router.query.tags != '') {
      setSelectedPrefer(prev => [...prev, router.query.tags])
    }
    setSearchQuery(router.query.searchInput || "");
    setSelectedFilters(prev => ({
      bhk: router.query?.bhk || prev.bhk || "",
      property: router.query?.property || prev.property || "",
      status: router.query?.status || prev.status || "",
      furnish: router.query?.furnish || prev.furnish || "",
      sale: router.query?.sale || prev.sale || "",
    }));
    setSearchQuery(router.query.searchInput || "");
  }, [router.query])

  useEffect(() => {
    // Make sure all the state updates are executed first
    if (fetchdata) {
      applyFilters();
    }

  }, [
    selectedAmenities,
    selectedFilters,
    selectedPrefer,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
    selectedCity,
    selectedPage
  ]);

  const compareAreas = (propertyA, propertyB, sortOrder) => {
    // Get the numeric area values directly from the properties
    const numericAreaA = propertyA.minArea || 0; // Use 0 as a default value if landSize is undefined
    const numericAreaB = propertyB.minArea || 0; // Use 0 as a default value if landSize is undefined

    // Compare the numeric areas based on the desired sort order
    if (sortOrder === "Alowest") {
      return numericAreaA - numericAreaB;
    } else if (sortOrder === "Ahighest") {
      return numericAreaB - numericAreaA;
    }
    return 0;
  };

  const handleSort = (event) => {
    const selectedValue = event.target.value;
    setSelectedSort(selectedValue);
    // sorting logic, based on selectedValue
    if (selectedValue === "Relevance") {
      setSortedData(data);
    }
    if (selectedValue === "Plowest") {
      if (sortedData.length > 0) {
        const sortedDataprice = sortedData.sort((a, b) => {
          const aPrice = a.minprice;
          const bPrice = b.minprice;
          return aPrice - bPrice;
        });
        setSortedData(sortedDataprice);
        console.log(sortedDataprice);
      } else {
        const sortedData = data.sort((a, b) => {
          const aPrice = a.minprice;
          const bPrice = b.minprice;
          return aPrice - bPrice;
        });
        setSortedData(sortedData);
        console.log(sortedData);
      }
    } else if (selectedValue === "Phighest") {
      if (sortedData.length > 0) {
        const sortedDataprice = sortedData.sort((a, b) => {
          const aPrice = a.minprice;
          const bPrice = b.minprice;
          return bPrice - aPrice;
        });
        setSortedData(sortedDataprice);
        console.log(sortedDataprice);
      } else {
        const sortedData = data.sort((a, b) => {
          const aPrice = a.minprice;
          const bPrice = b.minprice;
          return bPrice - aPrice;
        });
        setSortedData(sortedData);
        console.log(sortedData);
      }
    } else if (selectedValue === "Alowest" || selectedValue === "Ahighest") {
      const sortedProperties = data
        .slice()
        .sort((a, b) => compareAreas(a, b, selectedValue));
      setSortedData(sortedProperties);
      console.log(sortedProperties);
    }
  };

  const applyFilters = async () => {
    // Send the filters to the API
    setIsLoading(true);
    try {
      const response = await fetch(`/api/filteredProperties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amenities: selectedAmenities,
          filters: selectedFilters,
          preferences: selectedPrefer,
          minArea: minArea,
          maxArea: maxArea,
          minPrice: minPrice,
          maxPrice: maxPrice,
          city: selectedCity,
          searchInput: searchQuery || '',
          page: selectedPage
        }),
      });

      const filteredProperties = await response.json();
      setSortedData([]);
      setData(filteredProperties.data);
      setFetchedDataCount(filteredProperties.count);
      console.log("in applyFilters func", filteredProperties);
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
    }
    setIsLoading(false);
    setFetch(true);
  };

  const handleSave = (
    selectedAmenities,
    selectedFilters,
    selectedPrefer,
    minArea,
    maxArea,
    minPrice,
    maxPrice
  ) => {
    setSelectedAmenities(selectedAmenities);
    // console.log(selectedAmenities);
    setSelectedFilters(selectedFilters);
    setSelectedPrefer(selectedPrefer);
    setMinArea(minArea);
    setMaxArea(maxArea);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    const totalData = [
      ...selectedAmenities,
      ...Object.values(selectedFilters).filter((item) => item !== ""),
      ...selectedPrefer,
      ...(maxArea ? [`Max Area:${maxArea}`] : []),
      ...(minArea ? [`Min Area:${minArea}`] : []),
      ...(minPrice ? [`Min Price:${minPrice}`] : []),
      ...(maxPrice ? [`Max Price:${maxPrice}`] : []),
    ];
    setCombinedData(totalData);
    console.log(totalData);
  };

  const delFilters = () => {
    setCombinedData([]);
    setSortedData([]);
    //setData([]);
    //  setSelectedPrefer([]);
    // document.getElementById("sort").selectedIndex = 1;
    const sortDropdown = document.getElementById("sort");
    sortDropdown.selectedIndex =
      sortDropdown.querySelector('option[value=""]').index;
  };

  const handlePageLeftButton = () => {
    setSelectedPage(prev => Math.max(1, prev - 1));
    if (selectedPage === start) {
      setStart(prev => Math.max(1, prev - 1));
    }
    PageScrollRef.current.scrollTop = 0;
  }
  const handlePageRightButton = () => {
    setSelectedPage(prev => prev + 1);
    setPages(prev => {
      const maxPage = Math.max(...prev);
      if (selectedPage >= start + 3) {
        setStart(prev => prev + 1);
      }
      PageScrollRef.current.scrollTop = 0;
      return [...prev, maxPage + 1];
    });
  }
  const handlePageSelect = (page) => {
    setSelectedPage(page);
    PageScrollRef.current.scrollTop = 0;
  }

  return (

    <div className={`${isLoading ? 'hide-v-scrollbar' : 'v-scrollbar'} v-scrollbar h-screen hide-v-scrollbar`}>
      {/* <NextNProgress color="#4f6df3" height={5} /> */}
      <div className="sticky h-[4.5rem] top-0 z-[999]">
        <Navbar />
      </div>

      <div className=" flex">
        <div className="hidden items-start sticky top-[4.5rem] h-[calc(100vh-72px)] font-inter lg:block md:w-[35rem] lg:w-[35rem]">
          <FilterOpt
            data={combinedData}
            onSaveClick={handleSave}
            deleteFilters={delFilters}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </div>
        <div
          className={`${showSidebar ? "" : "hidden"
            } bg-white w-full absolute z-40 lg:hidden`}
        >
          <FilterOpt
            data={combinedData}
            onSaveClick={handleSave}
            deleteFilters={delFilters}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </div>
        <div className={` w-full`}>
          <div className="px-3 py-3">
            <div className="w-full flex justify-between gap-1">
              <div className="w-full p-1 flex  min-w-fit rounded-md shadow-md border border-slate-200">
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="ml-1 font-medium rounded-md text-sm px-2 md:px-5 py-2.5 text-center inline-flex items-center "
                  type="button"
                >
                  {selectedCity}
                  <BsChevronDown className="mt-1.5 m-1" />
                </button>

                <div
                  id="dropdown"
                  className="z-30 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-34 "
                >
                  <ul
                    className="py-2 w-full text-sm text-gray-700 "
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li className="w-full">
                      <button
                        onClick={() => setSelectedCity("Gurgaon")}
                        value="Gurgaon"
                        className="block w-full px-4 py-2 hover:bg-gray-100"
                      >
                        Gurgaon
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        onClick={() => setSelectedCity("Noida")}
                        className="block px-4 w-full py-2 hover:bg-gray-100"
                      >
                        Noida
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        onClick={() => setSelectedCity("NCR")}
                        className="block px-4 w-full py-2 hover:bg-gray-100 "
                      >
                        Delhi NCR
                      </button>
                    </li>
                  </ul>
                </div>
                <form className="w-full flex" onSubmit={handleSearchQuerySubmit}>
                  <input
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    placeholder="Search Locations, Projects, and More..."
                    className=" rounded-md w-full outline-none focus-within:outline-none focus:outline-none border-none"
                  />

                  <button type="submit" className="flex  gap-2 px-2 rounded-md text-[1rem] font-semibold py-1.5 text-white bg-blue-500 hover:bg-blue-700 focus:bg-blue-700">
                    <div onClick={handleSearchQuerySubmit} className="flex justify-center h-full items-center">
                      <FaMagnifyingGlass size={"1.5rem"} />
                    </div>
                    {/* <div className="hidden text-[1.5rem] min-[420px]:flex justify-center items-center">Match</div> */}
                  </button>
                </form>
              </div>
            </div>

            <div className="flex mt-2 gap-2 justify-between">
              <div className="flex gap-2">
                <button
                  className="lg:hidden flex gap-2 justify-between px-2 rounded-md text-[1rem] font-semibold py-1.5 text-white bg-blue-500 hover:bg-blue-700 focus:bg-blue-700"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  <span className="hidden min-[420px]:block">Filter</span>
                  <div className="flex justify-center h-full items-center">
                    <LuListFilter size={"1.5rem"} />
                  </div>
                </button>
                {/* <button
                  onClick={() => {
                    setSortedData(data);
                    setSearchQuery("");
                  }}
                  type="button"
                  class="flex items-center py-2 lg:py-2.5 px-4 text-sm font-medium text-white bg-blue-500 rounded-md border hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                  >
                  Clear
                </button> */}
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-gray-600 font-medium">
                  Total Results: {fetchedDataCount}
                </p>
                <select
                  style={{
                    backgroundColor: "white",
                  }}
                  name="sort"
                  onChange={handleSort}
                  className="font-semibold  rounded-md bg-blue-500 text-blue-700  custom-select text-sm"
                  id="sort"
                >
                  <option value="" className="bg-white" selected disabled hidden>
                    Sort
                  </option>
                  <option className="font-semibold" value="Relevance">
                    Relevance
                  </option>
                  <option className="font-semibold" value="Plowest">
                    Price ↑
                  </option>
                  <option className="font-semibold" value="Phighest">
                    Price ↓
                  </option>
                  <option className="font-semibold" value="Alowest">
                    Area ↑
                  </option>
                  <option className="font-semibold" value="Ahighest">
                    Area ↓
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div ref={PageScrollRef} className={`${isLoading ? 'hide-v-scrollbar' : 'v-scrollbar'} px-2 pb-3 overflow-hidden overflow-y-auto w-full `}>
            <div className={`w-full flex justify-center`}>
              <div className={`mx-auto w-full z-20 bg-white `}>
                {showInterestForm && (<InterestForm onSubmit={handleInterestFormSubmit} handleCloseInterestForm={handleCloseInterestForm} />)}
                {isLoading ? <Loading /> : <>
                  {sortedData.length > 0 && !isLoading
                    ? sortedData.slice(0, 10).map((row) => (
                      <CardList
                        key={row.id} // Make sure to use a unique key
                        image={row.img}
                        property={row.property_name}
                        bhk={row.configuration}
                        builder={row.builder_name}
                        address={row.address}
                        units={row.unitCount}
                        status={row.status}
                        carpet={row.landSize}
                        super={row["Super Area"]}
                        priceRange={row.range}
                        pricesqft={row["Price per sqft"]}
                        airport={row.airport}
                        metro={row.metro}
                        school={row.school}
                        similarity={row.Similarity}
                        tags={row.tags}
                        sendInterest={sendInterest}
                      />
                    ))
                    : data.length > 0 && !isLoading ? data?.map((row) => (
                      <CardList
                        key={row.id} // Make sure to use a unique key
                        image={row.img}
                        property={row.property_name}
                        bhk={row.configuration}
                        builder={row.builder_name}
                        address={row.address}
                        units={row.unitCount}
                        status={row.status}
                        carpet={row.landSize}
                        super={row["Super Area"]}
                        priceRange={row.range}
                        pricesqft={row["Price per sqft"]}
                        airport={row.airport}
                        metro={row.metro}
                        school={row.school}
                        Similarity={row.Similarity}
                        tags={row.tags}
                        sendInterest={sendInterest}
                      />
                    )) : <div className="text-2xl flex justify-center py-3 font-semibold">No Matched Data Found</div>}</>}
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button className="hover:text-blue-500" onClick={handlePageLeftButton}><FaAngleLeft /></button>
              {pages.slice(start - 1, start + 3).map((page, index) => (
                <button key={index} onClick={()=>handlePageSelect(page)} className={`${selectedPage === page ? 'bg-blue-500 text-white' : ''} transition-colors ease-in-out duration-300 hover:bg-blue-500 hover:text-white relative p-4 rounded-full`}><span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{page}</span></button>
              ))}
              <button className="hover:text-blue-500" onClick={handlePageRightButton}><FaAngleRight /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
