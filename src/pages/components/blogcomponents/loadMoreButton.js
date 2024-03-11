const loadMoreButton = () => {
  return (
    <button class="group font-semibold relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
      <div class="absolute font-m inset-0 w-3 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
      <span class="relative text-black group-hover:text-white">Load More</span>
    </button>
  );
};

export default loadMoreButton;
