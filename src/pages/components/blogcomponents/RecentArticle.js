import Link from "next/link";
import articleicon from "../../../../public/articleicon.png";
import Image from "next/image";

export default function RecentArticle({ latestblogs }) {
  const posts = latestblogs; // Assuming your API returns an array of posts
  //   console.log(posts);
  return (
    <div>
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 shadow-md bg-white rounded-md p-1 mt-4">
        <h2 className="text-gray-700 font-semibold text-2xl p-2">
          Recent Article
        </h2>

        {posts && posts.map((postItem, index) => (
          <div className="p-2 hover:bg-slate-100 rounded-md" key={index}>
            <div className="grid grid-cols-6 mt-4 p-4 bg-white shadow-md rounded-md">
              <div className="grid col-span-1">
                <div className="flex justify-start items-start mt-2">
                  <Image src={articleicon} width={60} height={60} alt="img" />
                </div>
              </div>
              <div className="grid col-span-5">
                <Link href={`/blog/${postItem.shortname}`}>
                  <h1 className="pl-2 font-medium text-gray-700 text-lg hover:underline">
                    {postItem.title.split(" ").slice(0, 6).join(" ")}
                    {"..."}
                    {/* Access the title property of each postItem */}
                  </h1>
                </Link>
                <p className="mt-2 pl-2 text-sm text-gray-500">
                  {new Date(postItem.date).toDateString()}{" "}
                  {/* Access the date property of each postItem */}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="block lg:hidden text-gray-700 font-semibold text-2xl mt-4 ">
        Recent Article
      </h2>
      <div class="grid lg:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-1 shadow-md bg-white rounded-md p-1 mt-4">
        {posts && posts.map((postItem, ind) => {
          return (
            <>
              <div class="p-2 hover:bg-slate-100 rounded-md" key={ind}>
                <div class="flex">
                  <div className="mt-6">
                    <Image src={articleicon} width={20} height={20} alt="img" />
                  </div>
                  <div class="ml-2 pt-4 w-5/6">
                    <Link href={`/blog/${postItem.shortname}`}>
                      <h1 className="text-base font-medium text-gray-700 text-len">
                        {postItem.title}
                      </h1>
                    </Link>
                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(postItem.date).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
