import Card from "../components/blogcomponents/card";
import axios from "axios";
import NextNProgress from 'nextjs-progressbar';
import SimpleSlider from "../components/blogcomponents/Slider";
import Navbar from "../components/navbar";
import Seachbar from "../components/blogcomponents/seachbar";
import SubscribeToNewsLetter from "../components/blogcomponents/subscribe"
import { baseurl } from "../../../public/url";
import Cardslider from "@/components/blogcomponents/cardSlider";
export async function getServerSideProps(context) {
  try {
    const data = context.query.search ? await fetchBlogs(context.query.search):await fetchBlogs(context.query.searchtag)
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        data: null,
      },
    };
  }
}
async function fetchBlogs(search) {
  // console.log(search);
  if (search === "proptech" || search === "investment"||search === "latesttrends"||search === "legal"||search === "decor"||search === "regional"|| search === "nri"||search === "lifestyle") {
    // console.log(search);
    try {
      const response = await fetch(
        `${baseurl}/api/getblogtags?query=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(search);

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          return data;
        } else if (search === undefined) {
          // console.log(search)
          const res = axios.get(`${baseurl}/api/getpost`);
          // console.log(res);
          return (await res).data;
        } else {
          return [];
        }
      } else {
        throw new Error("An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  } else
    try {
      const response = await fetch(`${baseurl}/api/getblogs?query=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(search);

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          return data;
        } else if (search === undefined) {
          // console.log(search)
          const res = axios.get(`${baseurl}/api/getpost`);
          // console.log(res);
          return (await res).data;
        } else {
          return [];
        }
      } else {
        throw new Error("An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
}

export default function Blog({ data }) {
  console.log(data?.shortname)
  return (
    <>
    <NextNProgress color="#4f6df3" height={5}/>
      <Navbar />
     <div className=" bg-blue-50">
      <div className=" md:ml-10 pl-2 py-10 flex flex-row ">
      <div className="w-full md:flex">
        <div className="md:w-[30%] flex justify-center items-center">
        <SubscribeToNewsLetter/>
        </div>
        <div className="md:w-[70%]">
        <Cardslider data={data}/>
        </div>
      </div>
      
      </div>
      
      </div>
      {/* <div className="hidden md:block py-10  pl-10  w-2/3">
      </div> */}
      <div className="main px-2 mt-16 md:mx-16 lg:mx-32 md:pt-0">
        <div className="text-2xl font-semibold">Explore our blogs</div>
        <SimpleSlider />
        <Seachbar />
        <div className="cards my-6">
          <div className="grid gap-4 md:grid-cols-2">
            {data &&
              data
                .map((post, index) => (
                  <Card
                    key={index}
                    id={post.id}
                    shortname={post.shortname}
                    title={post.title}
                    content={post.content}
                    date={post.date}
                    name={post.name}
                    tags={post.tags}
                    image={post.image}
                    category={post.category}
                  />
                ))}
          </div>
        </div>
      </div>
      <div className="flex m-4 justify-center">{/*<LoadMoreButton />*/}</div>
    </>
  );
}
