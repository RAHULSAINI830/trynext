import Image from "next/image";
import img1 from "../images/download (1).jpg";
import img2 from "../images/download.jpg";
import img3 from "../images/ip9lxj.jpg";
import img4 from "../images/prop1.jpg";
import img5 from "../images/prop2.jpg";
import img6 from "../images/prop3.jpg";
import imgover from "../images/overlaypg3.png";
export default function Homematch() {
  return (
    <div>
      <div className="flex flex-col  bg-gradient-to-br from-cyan-200 via-white to-white lg:flex-row lg:justify-around p-12">
        <div className="flex lg:w-2/3 items-center lg:items-start flex-col pt-8 mb-10 lg:ml-6">
          <h1 className="text-black text-center lg:text-start font-inter-200 text-4xl font-semibold lg:mb-6">
            Home Matchmaking
          </h1>
          <p className="lg:w-2/3 w-full text-gray-600 py-6 text-xl text-center lg:text-left">
            Want to find a home that meets your precise needs? Just answer a few
            questions and we&apos;ll show the most compatible homes along with a
            compatibility score for every listing on the site.
          </p>
          <h1 className="lg:w-2/3 w-full text-xl text-gray-500 text-center lg:text-left">
            Get highly curated property recommendations just for you.
          </h1>
          <button
            type="button"
            className="px-8 py-3 mt-10 text-lg border rounded-xl text-white bg-blue-500 hover:bg-blue-800 "
          >
            Take our home quiz
          </button>
        </div>
        <div className="hidden lg:block relative my-8 mr-10 ">
          <div className="grid grid-cols-3 gap-4 w-[340px] h-[340px] ">
            <Image src={img1} alt="Image 1" className="square-image2" />
            <Image src={img2} alt="Image 2" className="square-image2" />
            <Image src={img3} alt="Image 3" className="square-image2" />
            <Image src={img4} alt="Image 4" className="square-image2" />
            <Image src={img5} alt="Image 5" className="square-image2" />
            <Image src={img6} alt="Image 6" className="square-image2" />
            <Image src={img1} alt="Image 7" className="square-image2" />
            <Image src={img2} alt="Image 8" className="square-image2" />
            <Image src={img3} alt="Image 9" className="square-image2" />
          </div>
          <Image
            src={imgover}
            alt="Overlay Image"
            className="absolute top-[83px] left-[80px] w-[180px] h-[180px] z-10 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
