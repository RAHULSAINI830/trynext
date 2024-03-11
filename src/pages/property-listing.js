import React, { useState,useEffect } from "react";
import Navbar from "./components/navbar";
import Link from "next/link";
import { useSession,getSession } from 'next-auth/react';

const Propertylisting = () => {
  const [propertyList, setPropertyList] = useState([1,2,3,1,2,4,5]);
  const [data, setData] = useState([]);
  const { data: session } = useSession();
  const [mail,setMail]=useState('');
  useEffect(() => {
    if(session){
      setMail(session.user.email);
    }
    async function fetchData() {
      try {
        const response = await fetch(`/api/postedProperties?userEmail=${session.user.email}`);
        const jsonData = await response.json();
        console.log(jsonData.rows);
        setData(jsonData.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();

  },[]);

  return (
    <>
    <div className="w-screen min-h-full">
    <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div className="bg_box ">
        <div className="w-full p-5 h-16 bg-col text-white flex justify-between items-center">
          <h3>My Listing</h3>
          <Link
            href="/postProperty"
            className="text-white bg-blue-800 rounded-md py-2 px-6"
          >
            Post property
          </Link>
        </div>
        <div className="">
          {propertyList.length == 0 ? (
            <>
              <div className="p-3 flex justify-center items-center flex-col pt-20">
                <img src="./Property.png" alt="" className="w-[80px] my-2" />
                <p className="text-center">
                  You haven’t listed any property yet. Tap ‘Post Property’ to
                  list your property on smartneev.com for free.
                </p>
                <Link
                  href="/postProperty"
                  className="text-white mt-4 bg-blue-800 rounded-md py-2 px-6"
                >
                  Post property
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className=" hidden md:block">
                <table class="w-[100%]   ">
                  <thead className="bg-white border-b-2 border-gray-200">
                    <tr>

                      <th className=" p-3 text-sm tracking-wide text-left">No</th>
                      <th className=" p-3 text-sm tracking-wide text-left">Property name</th>
                      <th className=" p-3 text-sm tracking-wide text-left">Price</th>
                      <th className=" p-3 text-sm tracking-wide text-left">Address</th>
                      <th className=" p-3 text-sm tracking-wide text-left">Property type</th>
                      <th className=" p-3 text-sm tracking-wide text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                        data.map((property,ind)=>{
                            return(
                                <>

                                <tr className="border-b font-semibold">
                      <td className="py-6 px-3 text-sm tracking-wide text-left ">{ind+1}</td>
                      <td className="py-6 px-3 text-sm tracking-wide text-left text-blue-600">{property.society}</td>
                      <td className="py-6 px-3 text-sm tracking-wide text-left ">₹{property.minprice} - ₹{property.maxprice}</td>
                      <td className="py-6 px-3 text-sm tracking-wide text-left ">{property.address}</td>
                      <td className="py-6 px-3 text-sm tracking-wide text-left ">{property.propertytype}</td>

                      <td className="py-6 px-3 text-sm tracking-wide text-left ">
                        <span className="py-1 px-3 rounded-lg  font-bold  text-green-800 bg-green-200">Under Review</span>
                      </td>

                    </tr>
                                </>
                            )
                        })
                    }



                  </tbody>
                </table>
              </div>

              <div className="space-y-6 md:hidden p-4">
                       {
                        data.map((property,ind)=>{
                            return(
                                <>
                                 <div className="bg-white p-4  shadow ">
                            <div className="flex items-center space-x-8 text-sm">
                                <div>
                                    <p className=" font-bold">{ind+1}</p>
                                </div>

                                <div>
                                <span className="py-1 text-xs px-3 rounded-lg  font-bold  text-green-800 bg-green-200">Approved</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-blue-500 mt-2 text-lg">{property.society}</p>
                                <p>{property.address}</p>
                                <p>₹{property.minprice} - ₹{property.maxprice}</p>
                                <p className="underline ">{property.propertytype}</p>
                            </div>

                        </div>
                                </>
                            )
                        })
                       }
              </div>

              <div className="text-center mt-10">
              <Link
                  href="/postProperty"
                  className="text-white mt-4 bg-blue-800 rounded-md py-2 px-6"
                >
                  Post property
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    </>
  );
};

export default Propertylisting;


export async function getServerSideProps({req}){
  const session = await getSession({req})
  if(!session){
    return {
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }
  return {
    props:{session}
  }
}
