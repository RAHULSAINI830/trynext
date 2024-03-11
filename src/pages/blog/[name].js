import Navbar from "@/components/navbar";
import Link from "next/link";
import Footer from "./../components/footer";
import NextNProgress from "nextjs-progressbar";
import { baseurl } from "../../../public/url";
import Head from "next/head";
import RecentArticle from "../components/blogcomponents/RecentArticle";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
export async function getServerSideProps(context) {
  const shortname = context.query.name;
  // console.log(shortname)

  const data = await fetchBlogs(shortname);
  const latestblogs = await fetchLatestBlogs();
  return {
    props: {
      data,
      latestblogs,
      shortname,
    },
  };
}

async function fetchBlogs(shortname) {
  const response = await fetch(
    `${baseurl}/api/getblogpost?shortname=${shortname}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}
async function fetchLatestBlogs() {
  try {
    const response = await fetch(`${baseurl}/api/getlatestblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("An error occurred.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default function BlogPage({ data, latestblogs, shortname }) {
  const post = data;
  // console.log(data.image)
  // console.log(data.content[1].section_title);
  // console.log(`${baseurl}/api/getblogimage?shortname=${shortname}`)
  // console.log(latestblogs);
  const options = { year: "numeric", month: "long", day: "numeric" };
  // if(post.date) formatedDate = new Date(post.date).toLocaleDateString("en-US", options);
  // Render your blog post content using the data received from props
  return (
    <>
      <Head>
        <meta name="SmartNeev" content={data.image}></meta>
        <meta property="og:site_name" content="SmartNeev"></meta>
        <meta
          property="og:title"
          content={data.title}
        ></meta>
        <meta
          property="og:description"
          content="Search real estate in India - Buy and Sell best properties in India. Get access to verified data, AI-driven insights, and exclusive listings. Say goodbye to spam calls and hello to hassle-free home matchmaking."
        ></meta>
        <meta property="og:image" itemprop="image" content={data.image}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:image:type" content="image/png"></meta>
        <meta property="og:image:width" content="400"></meta>
        <meta property="og:image:height" content="400"></meta>
        <meta property="og:url" content={`https://smartneev.com/blog/${data.shortname}`}></meta>
      </Head>
      <NextNProgress color="#4f6df3" height={5} />
      <div className="blog-post">
        <Navbar />
        {/* <div className="fixed w-screen z-50">

      </div> */}
        <div className="w-full min-h-[100vh] bg-ghost">
          <div className="py-10 w-[95%] md:w-[95%] lg:w-[90%] mx-auto  ">
            <div class="grid grid-cols-12  gap-4">
              <div class="col-span-12 lg:col-span-9 order-2 lg:order-1 bg-white rounded-md p-4">
                <div className="p-2 md:p-5 lg:p-10">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-700 font-bold">
                    {post.title && post.title}
                  </h1>
                  <div className="md:text-lg text-gray-700 font-medium md:flex mt-5 justify-between items-center">
                    <p>
                      {post.date &&
                        new Date(post.date).toLocaleDateString(
                          "en-US",
                          options
                        )}
                    </p>
                    <div className="flex mt-2">
                      <FacebookShareButton
                        className="w-10 h-10 mr-2"
                        url={`https://smartneev.com/blog/${post.shortname}`}
                        quote={`Hey, Checkout this blog about ${post.title} at https://smartneev.com/blog/${post.shortname}`}
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 cursor-pointer mr-2">
                          <i className="fa fa-facebook text-lg text-white"></i>
                        </div>{" "}
                      </FacebookShareButton>
                      <WhatsappShareButton
                        className="w-10 h-10 mr-2"
                        url={`https://smartneev.com/blog/${post.shortname}`}
                        title={`*Hey, Checkout this blog about* *${post.title}* *at* `}
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 cursor-pointer mr-2">
                          <i className="fa fa-whatsapp text-lg text-white"></i>
                        </div>
                      </WhatsappShareButton>
                      <a
                        href="https://www.instagram.com/smart_neev/"
                        target="_blank"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-800 cursor-pointer mr-2">
                          <i className="fa fa-instagram text-lg text-white"></i>
                        </div>
                      </a>
                      <TwitterShareButton
                        className="w-10 h-10 mr-2"
                        url={`https://smartneev.com/blog/${post.shortname}`}
                        title={`Hey, checkout this blog about ${post.title}`}
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 cursor-pointer mr-2">
                          <i className="fa fa-twitter text-lg text-white"></i>
                        </div>
                      </TwitterShareButton>
                      <LinkedinShareButton
                        className="w-10 h-10"
                        source={`https://smartneev.com/blog/${post.shortname}`}
                        url={`https://smartneev.com/blog/${post.shortname}`}
                        summary={`Hey, checkout this blog about ${post.title}`}
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 cursor-pointer mr-2">
                          <i className="fa fa-linkedin text-lg text-white"></i>
                        </div>
                      </LinkedinShareButton>
                      {/* <a
                        href="https://www.facebook.com/sharer/sharer.php?u=https://smartneev.com/quiz/page/"
                        target="_blank"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 cursor-pointer mr-2">
                          <i className="fa fa-facebook text-lg text-white"></i>
                        </div>
                      </a>
                      <a
                        href="https://api.whatsapp.com/send/?text=Check this out https://smartneev.com/quiz/page/"
                        target="_blank"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 cursor-pointer mr-2">
                          <i className="fa fa-whatsapp text-lg text-white"></i>
                        </div>
                      </a>

                      <a
                        href="https://twitter.com/intent/tweet?url=https://smartneev.com/quiz/page/&text=Check this out"
                        target="_blank"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 cursor-pointer mr-2">
                          <i className="fa fa-twitter text-lg text-white"></i>
                        </div>
                      </a>
                      <a
                        href="https://www.instagram.com/share?url=https://smartneev.com/quiz/page/&text=Check this out"
                        target="_blank"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-800 cursor-pointer mr-2">
                          <i className="fa fa-instagram text-lg text-white"></i>
                        </div>
                      </a>
                      <a
                        href="  https://www.linkedin.com/shareArticle?mini=true&url=https://smartneev.com/quiz/page/&text=Check this out"
                        target="_blank"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 cursor-pointer mr-2">
                          <i className="fa fa-linkedin text-lg text-white"></i>
                        </div>
                      </a> */}
                    </div>
                  </div>
                  <hr className="mt-3 mb-5" />

                  <div className="p-2 md:p-5 ">
                    <img src={post.image} alt="" className="w-full  h-full" />
                    <div className="mt-5">
                      <div className="mt-10">
                        <div className="content">
                          {post.content && post.content[2].section_title && (
                            <h1 className="font-semibold text-lg mt-4">
                              Table of Contents
                            </h1>
                          )}
                          <ul className="pl-10 mt-2 list-decimal">
                            {post.content &&
                              post.content
                                .filter((section) => section.section_title) // Filter out empty section titles
                                .map((section, index) => (
                                  <li key={index} className="text-blue-600">
                                    <Link
                                      href={
                                        "#" +
                                        section.section_title
                                          .replace(/ /g, "")
                                          .toLowerCase()
                                      }
                                    >
                                      {section.section_title}
                                    </Link>
                                  </li>
                                ))}
                          </ul>
                          {post.content &&
                            post.content.map((section, index) => (
                              <div key={index} className="mt-5">
                                <div
                                  id={
                                    section.section_title
                                      ? section.section_title
                                          .replace(/ /g, "")
                                          .toLowerCase()
                                      : ""
                                  }
                                  className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold"
                                >
                                  {section.section_title
                                    ? section.section_title
                                    : ""}
                                </div>

                                <div className="mt-5">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: section.section_content,
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="mt-10">
                        <div className="text-xl md:text-2xl lg:text-3xl text-gray-700">
                          <b>HashTags</b>
                        </div>
                        <div className="text-blue-600">
                          {post.tags &&
                            post.tags.map((tag) => (
                              <span key={tag}> {tag} </span>
                            ))}
                        </div>
                      </div>
                      <div className="mt-10">
                        <div className="text-xl md:text-2xl lg:text-3xl text-gray-700">
                          <b>Category</b>
                        </div>
                        <div className="font-semibold">{post.category}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-12 lg:col-span-3 order-2 lg:order-2 ">
                <div className="sticky top-20">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 shadow-md bg-white rounded-md p-1">
                    <div class=" ">
                      <Link href="/">
                        {" "}
                        <img
                          src="https://media.designcafe.com/wp-content/uploads/2022/07/15170350/luxury-home-design-on-budget.jpg"
                          alt=""
                          className="w-full h-72 md:h-full lg:h-48 rounded-md"
                        />{" "}
                      </Link>
                    </div>
                    <div class=" py-4 px-2 md:px-4 lg:px-2 text-center md:text-left lg:text-center">
                      <h1 className="text-gray-700 font-semibold text-3xl">
                        Discover your dream home, today
                      </h1>
                      <p className="my-4">
                        Get exclusive, verified, and personalized
                        recommendations just for you
                      </p>
                      <Link
                        href={"/quiz/page"}
                        className="w-full py-2 px-4 rounded-md bg-blue-600 text-white"
                      >
                        Home MatchMaking Quiz
                      </Link>
                    </div>
                  </div>
                  <RecentArticle latestblogs={latestblogs} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
// export default BlogPage;
