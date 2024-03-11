import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useState, useRef } from "react";
import { RxCrossCircled } from "react-icons/rx";
const Photogallery = ({ images, bgimg, text, idx }) => {
  // const images = [
  //   {
  //     original: "https://picsum.photos/id/1018/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1018/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1018/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1018/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1018/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1018/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1018/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1018/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1018/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1018/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1018/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1018/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  // ];
  const [open, setOpen] = useState(false);
  const galleryRef = useRef(null); // Create a ref for the ImageGallery component
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Function to jump to a random slide
  const jumpToRandomSlide = (idx) => {
    // const randomSlideIndex = Math.floor(Math.random() * images.length + 1);
    galleryRef.current.slideToIndex(idx);
    setCurrentSlideIndex(idx);
    // console.log(randomSlideIndex);
  };
  // console.log(idx)

  return (
    <>
      <div
        style={{
          height: "100%",
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="flex justify-center items-center h-full w-full rounded-lg"
      >
        <button
          className="px-4 py-2 rounded-xl border text-xs sm:text-sm border-white bg-black text-white text-center"
          onClick={() => setOpen(!open)}
        >
          {text}
        </button>
      </div>
      {open ? (
        <div className="">
          <div className=" p-0 m-0 top-0 left-0 h-screen w-screen bg-white fixed z-50">
            <button
              className="absolute top-5 right-2 md:right-3 z-50"
              onClick={() => setOpen(!open)}
            >
              <div className="relative inline-flex items-center justify-center overflow-hidden font-mono font-medium tracking-tighter text-black rounded-full p-2 md:p-4 group">
              <RxCrossCircled size={"2rem"} className=" " />
              </div>
            </button>
            <div className="hidden md:flex absolute w-full z-10 justify-center top-10 md:top-5 space-x-4">
              <button
                onClick={() => jumpToRandomSlide(0)}
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                <span className="relative">All Photos</span>
              </button>
              <button
                onClick={() => jumpToRandomSlide(10)}
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                <span className="relative">Floor Plans</span>
              </button>
            </div>
            <div className="h-full w-full flex justify-center items-center">
              <div className="mx-auto   max-w-[700px] lg:max-w-[1000px] min-[600px]:mt-20 rounded-lg px-4 md:px-0 md:mt-0  overflow-hidden">
                <ImageGallery
                  startIndex={idx}
                  items={images}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  showThumbnails={true}
                  slideInterval={1000}
                  ref={galleryRef}
                  currentIndex={currentSlideIndex}
                  disableSwipe={true}
                  showIndex={true}
                  onPlay={() => {}}
                />
                <div className="flex md:hidden gap-3  relative md:static -left-4 w-screen z-10 justify-center  md:items-start mt-4">
                  <button
                    onClick={() => jumpToRandomSlide(0)}
                    className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    <span className="relative">All Photos</span>
                  </button>
                  <button
                    onClick={() => jumpToRandomSlide(10)}
                    className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    <span className="relative">Floor Plans</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Photogallery;
