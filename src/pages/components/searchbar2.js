import { GiSettingsKnobs } from "react-icons/gi";
const searchbar = () => {
  return (
    <div className="border w-full lg:w-[120%] md:mt-2 md:mb-6 rounded-lg">
      <div className="flex items-center w-full h-12 rounded-lg overflow-visible focus-within:shadow-lg bg-white">
        <div className="grid place-items-center h-full w-12 rounded-lg text-gray-300 overflow-visible">
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
        </div>
        <input
          className="border-none overflow-visible focus:border-none rounded-lg w-full h-full outline-none focus:outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search something..."
        />
        <button className="p-1.5 rotate-90 bg-blue-400 border-blue-600 border-2 rounded-md">
          <GiSettingsKnobs className="h-6 w-6 text-white" />
        </button>
        <button className="bg-blue-500 p-2 m-1 px-4 rounded-md text-white">
          Search
        </button>
      </div>
    </div>
  );
};

export default searchbar;
