import Link from "next/link";

const Card = ({ id, title,shortname, content, date, name, tags, image, category,type }) => {

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  const formattedCategory = category ? category.toUpperCase() : '';
  return (
    <>
      <Link target="__blank" href={`/blog/${shortname}`}>
      {(type=="slider")?(
        <>
        <div class="max-w-md mx-auto bg-white shadow-lg overflow-hidden">
    <img class="w-full h-60 object-cover" src={image} alt="Card Image"/>

    <div class="p-4">
        <h2 class="text-xl line-clamp-2 font-semibold mb-2">{title}</h2>
        <div class="flex items-center mb-2">

            <span class="text-gray-400">{formattedDate}</span>
        </div>
        <div class="flex items-center">

            <span class="text-blue-400">{formattedCategory}</span>
          </div>
        </div>
        </div>

        </>
      ):(
        <div className="grid h-full bg-white shadow-lg overflow-hidden mb-6 lg:mb-0 grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center ">
            <img
              src={image}
              alt="Placeholder Image"
              class="w-full h-auto  rounded-[3px] "
            />
          </div>
          <div className="flex items-center my-6 lg:my-0 pl-5">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-blue-400">{formattedCategory}</div>
              <div className="text-gray-800 line-clamp-2 pr-2 text-lg md:text-sm lg:text-sm xl:text-md font-semibold">
                {title}
              </div>
              <div className="text-sm text-gray-400">{formattedDate}</div>
            </div>
          </div>
        </div>
      )}

      </Link>
    </>
  );
};

export default Card;
