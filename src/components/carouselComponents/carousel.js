import ImageGallery from "react-image-gallery";
const Carousel = ({images}) => {
  return (
    <div className="rounded-lg mx-3 md:mx-0">
      <ImageGallery
        autoPlay
        showThumbnails={false}
        showFullscreenButton={false}
        showNav={false}
        showIndex={true}
        showPlayButton={false}
        items={images}
      />
    </div>
  );
};
export default Carousel;
