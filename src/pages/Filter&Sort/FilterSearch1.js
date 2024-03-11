import FilterOpt from "./FilterOpt2";
import CardList from "../../components/cards/CardList";
import Navbar from "../components/navbar";
import { baseurl } from "../../../public/url";
import { useState, useEffect } from "react";
import LoadingSpinner from "../loadingSpinner";
import { useSession } from "next-auth/react";
import InterestForm from "../../components/propdetailsComponents/sendInterest";
export default function Filter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = (query) => {
    setSearchQuery(query);
    //console.log(query);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedProperty(suggestion);
  };

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    bhk: "",
    property: "",
    status: "",
    furnish: "",
    sale: "",
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
  const [showFilter, setShowFilter] = useState(false);

  const { data: session } = useSession();
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [propInterest, setPropInterest] = useState("");
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

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
          body: JSON.stringify({ userName, userEmail, userPhone, prop }),
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
        body: JSON.stringify({ userName, userEmail, userPhone, prop }),
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
      if (data.length === 0) {
        setIsLoading(true);
      }

      try {
        const response = await fetch(`${baseurl}/api/propertyData`);
        const jsonData = await response.json();
        //console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [data]);

  const compareAreas = (propertyA, propertyB, sortOrder) => {
    // Get the numeric area values directly from the properties
    const numericAreaA = propertyA.min_Area || 0; // Use 0 as a default value if landSize is undefined
    const numericAreaB = propertyB.min_Area || 0; // Use 0 as a default value if landSize is undefined

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
      if (sortedData.length > 0) {
        const sortedProperties = sortedData
          .slice()
          .sort((a, b) => compareAreas(a, b, selectedValue));
        setSortedData(sortedProperties);
        console.log(sortedProperties);
      } else {
        const sortedProperties = data
          .slice()
          .sort((a, b) => compareAreas(a, b, selectedValue));
        setSortedData(sortedProperties);
        console.log(sortedProperties);
      }
    }
  };

  const applyFilters = async () => {
    // Send the filters to the API
    setIsLoading(true);
    try {
      const response = await fetch(`${baseurl}/api/filteredProperties`, {
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
        }),
      });

      const filteredProperties = await response.json();
      setSortedData(filteredProperties);
      console.log(filteredProperties);
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
    }
    setIsLoading(false);
  };

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
  ]);

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
    setFetch(true);
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

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    console.log("entered value", searchQuery);
    const filteredData = data.filter(
      (item) =>
        item.property_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.address &&
          item.address.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Set the sorted array state with the filtered results
    setSortedData(filteredData);
  };
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <>
      <div className="sticky z-20 top-0">
        <Navbar />
        {isLoading && <LoadingSpinner />}
        {showInterestForm && (
          <InterestForm
            handleCloseInterestForm={handleCloseInterestForm}
            onSubmit={handleInterestFormSubmit}
          />
        )}
        {(showFilter || !showFilter) && (
          <FilterOpt
            data={combinedData}
            onSaveClick={handleSave}
            deleteFilters={delFilters}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        )}
        <form action="#" className="flex mb-2 gap-2 justify-center">
          <button
            onClick={() => {
              setSortedData(data);
              setSearchQuery("");
            }}
            type="button"
            class="flex items-center py-2 lg:py-2.5 px-4 ml-2 text-sm font-medium text-white bg-blue-500 rounded-md border hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            Clear
          </button>
          <select
            style={{
              backgroundColor: "white",
            }}
            name="sort"
            onChange={handleSort}
            className="font-semibold rounded-md bg-blue-500 text-blue-700  custom-select text-sm"
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
        </form>
      </div>
      <div className="w-full overflow-hidden">
        <div
          className={`w-full ${
            showSidebar ? "ml-0" : "lg:ml-[20%] xl:ml-[15%]"
          } flex justify-center`}
          style={{
            transition: "margin-left 0.3s ease", // Adjust the duration and easing as needed
          }}
        >
          <div className={`mx-auto z-0 bg-white hide-v-scrollbar`}>
            {sortedData.length > 0
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
                    sendInterest={sendInterest}
                  />
                ))
              : data.slice(0, 10).map((row) => (
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
                    sendInterest={sendInterest}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
