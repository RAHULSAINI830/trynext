import Photogallery from "./photogallery";
import Carousel from "./carousel";
const Photo = ({image, images, bhkImages})=> {
//  console.log(images);
  return (
    <div className=" md:relative md:flex gap-5">
      <div className="w-full md:w-3/4 xl:w-[65%] overflow-hidden">
        <div className="w-full rounded-lg shadow-lg overflow-hidden">
          <Carousel images={images} />
        </div>
      </div>
      <div className="flex  gap-2 mt-2 md:mt-0 px-3 md:px-0 md:block w-full md:w-1/4 xl:xl:w-[35%]">
      <div className="h-32 shadow-lg min-[600px]:h-80 md:h-[48%] md:w-full w-1/2 md:px-0">
        <Photogallery images={images} bgimg={images && images[0]?.original} text="View All Photos" idx={0} />
      </div>
      <div className="h-[4%] w-full hidden md:block"></div>
      <div className="h-32 shadow-lg min-[600px]:h-80 md:h-[48%] md:w-full w-1/2  md:px-0">
        <Photogallery images={bhkImages} bgimg={bhkImages && bhkImages[0]?.original} text="View Floor Layout" idx={0} />
      </div>
      </div>

    </div>
  );
}
export default Photo;
