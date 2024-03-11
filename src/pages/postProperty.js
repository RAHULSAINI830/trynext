import Navbar from "./components/navbar";
import React, { useState,useEffect } from "react";
import Stepper from "./stepper";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Amenities from "./amenities/Amenities";
import MultiSelect from "./amenities/MultiSelect";
import CircularProgress from '@mui/material/CircularProgress';
import { useSession,getSession } from 'next-auth/react';
import Link from 'next/link'
import Propertylogin from './property-login';
import Subscribe from './subscribe';
import {useFormik} from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './loadingSpinner';
import { useRouter } from 'next/router';

export default function PostProperty() {
  
 const { data: session } = useSession();
 const router = useRouter();
  const notify = (msg) =>
  toast.error(msg, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const stepArray = [
    "Location",
    "Property Overview",
    "Property Details",
    "Photos",
    "Pricing",
  ];
  const propertyTypeArray = ["Apartment", "Villa", "Independent Floor", "Plot"];
  const statusArray = ["Ready to Move", "Under Construction"];
  const furnishingArray = ["UnFurnished", "Semi-Furnished", "Furnished"];
  const propertyFacingArray = [
    "East",
    "West",
    "North",
    "South",
    "North-East",
    "North-West",
    "South-East",
    "South-West"
]
  const ownerArray = ["Owner", "Agent"];
  const ownerShipArray = ["Freehold", "Lease hold", "Power of Attorney"];
  const cityArray = [
    "Delhi",
    "Gurugram",
    "Mumbai",
    "Kolkata",
    "Chennai",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Jaipur"
]

const price_ranges = [
  "Less than 1 Rs/sqft",
  "1-2 Rs/sqft",
  "2-3 Rs/sqft",
  "More than 3 Rs/sqft"
]


  const handleClick = (clickType) => {
    let newStep = currentStep;
    clickType == "next" ? newStep++ : newStep--;
    // Check if steps are within the boundary
    if (newStep > 0 && newStep <= stepArray.length) {
      setCurrentStep(newStep);
    }
  };

 const [isLoading, setIsLoading] = useState(false);


  const [carpetpropertySize, setCarpetPropertySize] = useState("");

  const [builtproSizeType, setBuiltProSizeType] = useState("");
  const [builtpropertySize, setBuiltPropertySize] = useState("");

   const [amenities, setAmenities] = useState([]);


  const [postbedroomimg, setPostbedroomimg] = useState([]);
  const [postbathroomimg, setPostbathroomimg] = useState([]);
  const [postkitchenimg, setPostkitchenimg] = useState([]);
  const [posthallimg, setPosthallimg] = useState([]);
  const [postFloorPlan, setPostFloorPlan] = useState([]);
  const [postOtherimg, setPostOtherimg] = useState([]);
  const [postBrochure, setPostBrochure] = useState([]);



  const [maintenanceType, setMaintenanceType] = useState("");



  const [loading,setLoading] = useState(false)


  const generateCustomID = () => {
   const timestamp = Date.now().toString(36);
   const randomPart = Math.random().toString(36).substr(2, 5);
   return timestamp + randomPart;
 };
 const [uniqueId, setUniqueId] = useState('');
 const [mail,setMail]=useState('');

  useEffect(() => {
    // Generate the unique ID within the useEffect
    const generatedId = generateCustomID(); // Implement your unique ID generation logic
    if(session){
      setMail(session.user.email);
    }
    // Set the unique ID in the component's state
    setUniqueId(generatedId);
    console.log(generatedId);
  }, []); // The empty dependency array ensures this runs once when the component mounts


 const [imgs, setImgs] = useState([]);



   const convertBase64 = (file) => {
     return new Promise((resolve, reject) => {
       const fileReader = new FileReader();
       fileReader.readAsDataURL(file);

       fileReader.onload = () => {
         resolve(fileReader.result);
       };

       fileReader.onerror = (error) => {
         reject(error);
       };
     });
   };

const handleSubmitImg= async()=>{
  // console.log(postbedroomimg);
  // console.log(postbathroomimg);
  // console.log(postkitchenimg);
  // console.log(posthallimg);
  // console.log(postFloorPlan);
  // console.log(postOtherimg);
  // console.log(imgs);
  const base64s = [];
  for (var i = 0; i < imgs.length; i++) {
    var base = await convertBase64(imgs[i].file);
    var category=imgs[i].category;
    base64s.push({base,category});
  }
//  console.log(base64s);
  uploadMultipleImages(base64s);

}

async function uploadMultipleImages(images) {
//console.log(images);
setIsLoading(true);
try{
 const response = await fetch('/api/uploadimg', {
   method: "POST",
   headers: {
     "Content-Type": "application/json", // Set the appropriate content type
   },
   body: JSON.stringify({ images ,uniqueId}),
 })
 if (response.ok) {
   setLoading(false);
   alert('image submitted successfully!');
 } else {
   alert('An error occurred while submitting the image.');
 }
} catch (error) {
 console.error('Error submitting image:', error);
 alert('An error occurred while submitting the image.');
}
setIsLoading(false);

}
  const verifyImg=(files)=>{
    let f = false;
    let filetype = ['image/jpeg', 'image/jpg', 'image/png'];
    for (let i = 0; i < files.length; i++) {
      // console.log(files[i].type);
      if (files[i].size > 1000000) {
        f = true;
        // console.log('ok');
      }

      if (!filetype.includes(files[i].type)) {
        f = true;
        // console.log('hi');
      }
    }
    if (f) {
      // console.log(f);
      notify('Upload images with proper file size < 1MB ');
    }
    return f;
  }
  const verifyBrochure=(files)=>{
    let f = false;
    let filetype = 'application/pdf';
    for (let i = 0; i < files.length; i++) {
      // console.log(files[i].type);
      if (files[i].size > 10000000) {
        f = true;
        // console.log('ok');
      }

      if (files[i].type !== filetype) {
        f = true;
         console.log('hi');
      }
    }
    if (f) {
      // console.log(f);
      notify('Upload pdf with proper file size < 10MB ');
    }
    return f;
  }

const handleImage = async (e) => {
    const  files  = e.target.files;
    const category=e.target.name;
    console.log(e.target.name);
    if (files.length > 0) {
      if(!verifyImg(files))
    {

    const newImages = Array.from(files).map((file) => ({
     file,
     category,
    }));
    setImgs((prevImgs) => [...prevImgs, ...newImages]);

    if(category==='bedroom'){
      setPostbedroomimg(files);
    }
    else if(category==='bathroom'){
      setPostbathroomimg(files);
    }
    else if(category==='kitchen'){
      setPostkitchenimg(files);
    }
    else if(category==='hall'){
      setPosthallimg(files);
    }
    else if(category==='floor_plan'){
      setPostFloorPlan(files);
    }
    else if(category==='other'){
      setPostOtherimg(files);
    }
    }
    }
  };
  const handleBrochure= async(e)=>{

    const files=e.target.files;
    if(!verifyBrochure(files)){
      setPostBrochure(files);
      const base64s = [];
      for (var i = 0; i < files.length; i++) {
        var base = await convertBase64(files[i]);

        base64s.push(base);
      }
      console.log(base64s);
     uploadBrochure(base64s);
    }

  }

  async function uploadBrochure(brochure) {
  //console.log(images);
  setIsLoading(true);
  try{
   const response = await fetch('/api/uploadBrochure', {
     method: "POST",
     headers: {
       "Content-Type": "application/json", // Set the appropriate content type
     },
     body: JSON.stringify({ brochure ,uniqueId}),
   })
   if (response.ok) {
     setLoading(false);
     alert('brochure submitted successfully!');
   } else {
     alert('An error occurred while submitting the brochure.');
   }
  } catch (error) {
   console.error('Error submitting brochure:', error);
   alert('An error occurred while submitting the brochure.');
  }
  setIsLoading(false);

  }
  const handleDelImg= async(e)=>{
    const category=e.target.getAttribute("name");
    console.log(category);
    if(category==='bedroom'){
      setPostbedroomimg([]);
    }
    else if(category==='bathroom'){
      setPostbathroomimg([]);
    }
    else if(category==='kitchen'){
      setPostkitchenimg([]);
    }
    else if(category==='hall'){
      setPosthallimg([]);
    }
    else if(category==='other'){
      setPostOtherimg([]);
    }
    else if(category==='floor_plan'){
      setPostFloorPlan([]);
    }
    else if(category==='brochure'){
      setPostBrochure([]);
    }
    const updatedImgs = imgs.filter((img) => img.category !== category);
    setImgs(updatedImgs);
  }




  const formik = useFormik({
    initialValues:{

      pincode:'',
      city:'',
      address:'',
      propertyType:'',
      society:'',
      floorNumber:'',
      totalFloors:'',
      bhk:'',
      superArea:'',
      carpetArea:'',
      status:'',
      balconies:0,
      parkings:0,
      bathrooms:0,
      otherRooms: [],
      furnishing:'',
      facing:'',
      selectedAmenities: [],
      details:'',
      agentType:'',
      ownership:'',
      minPrice:'',
      minPriceType:'',
      maxPrice:'',
      maxPriceType:'',
      category:'',
    },
    validate:(values)=>{
      const errors={};
      if(!values.pincode){
        errors.pincode='Required';
      }
      if (values.pincode && isNaN(Number(values.pincode))) {
      errors.pincode = 'Must be a number';
    }
      if(!values.city){
        errors.city='Required';
      }
      if(!values.address){
        errors.address="Required";
      }
      if(!values.propertyType){
        errors.propertyType="Required";
      }
      if(!values.society){
        errors.society="Required";
      }
      if(values.propertyType==="Apartment" || values.propertyType==="Independent FLoor"){
        if(values.floorNumber>values.totalFloors)
        errors.totalFloors="Total Floors should be more than Floor Number"
        if (!isNaN(Number(values.floorNumber)) && !isNaN(Number(values.totalFloors))) {
     if (Number(values.floorNumber) > Number(values.totalFloors)) {
       errors.totalFloors = 'Total Floors should be more than Floor Number';
     }
   }
      }
      if(!values.bhk){
        errors.bhk="Required";
      }
      if(!values.carpetArea && !values.superArea){
          errors.superArea="Atleast one of the area is required";
      }
      if (values.floorNumber && isNaN(Number(values.floorNumber))) {
      errors.floorNumber = 'Floor number must be a number';
    }
    if (values.totalFloors && isNaN(Number(values.totalFloors))) {
      errors.totalFloors = 'Total floors must be a number';
    }
    if (values.carpetArea && isNaN(Number(values.carpetArea))) {
      errors.carpetArea = 'Must be a number';
    }
    if (values.superArea && isNaN(Number(values.superArea))) {
      errors.superArea = 'Must be a number';
    }
      if(!values.status){
        errors.status="Required";
      }
      if(values.balconies<0){
        errors.balconies="Can't be less than 0";
      }
      if(values.parkings<0){
        errors.parkings="Can't be less than 0";
      }
      if(values.bathrooms<0){
        errors.bathrooms="Can't be less than 0";
      }
      if(!values.furnishing){
        errors.furnishing="Required";
      }
      if(!values.agentType){
        errors.agentType="Required";
      }
      if(!values.ownership){
        errors.ownership="Required";
      }
      if(!values.minPrice){
        errors.minPrice="Required";
      }
      if (values.minPrice && isNaN(Number(values.minPrice))) {
        errors.minPrice = 'Must be a number';
      }
      if(!values.minPriceType){
        errors.minPriceType="Required";
      }
      if(!values.maxPriceType){
        errors.maxPriceType="Required";
      }
      if(!values.maxPrice){
        errors.maxPrice="Required";
      }
      if (values.maxPrice && isNaN(Number(values.maxPrice))) {
        errors.maxPrice = 'Must be a number';
      }

      return errors;
    },
    onSubmit: onSubmit
  })

 async function onSubmit(values){
   const email=session.user.email;
   console.log(values)
   setIsLoading(true);

   try{
     handleSubmitImg();
    const response = await fetch('/api/postPropertyData', {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
      body: JSON.stringify({ values ,uniqueId, email}),
    })
    if (response.ok) {
      setLoading(false);
      alert('data submitted successfully!');
    } else {
      alert('An error occurred while submitting the data.');
    }
   } catch (error) {
    console.error('Error submitting data:', error);
    alert('An error occurred while submitting the data.');
   }
   setIsLoading(false);
   router.push({
   pathname:'../post-confirmation'
 });
 }
  // console.log(postOtherimg);
  return (
    <>
    {session?(
      <>
      <div className="bg-white min-h-[100vh] ">
      <div className="fixed w-screen z-50">

<Navbar/></div>
       {isLoading && <LoadingSpinner />}
        <div className="w-full py-36">
        <div className="mx-2 md:mx-10  lg:mx-36  shadow flex-col items-center justify-center ">
          <div className="horizontal bg-ghost h-36 w-full pt-5">
            <Stepper
              steps={stepArray}
              currentStepNumber={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>

          <div className="flex   text-black justify-center items-center  flex-col py-16">
            <form onSubmit={formik.handleSubmit}>
              {currentStep === 1 && (
                <div className="step">

                  <div>
                    <label>City<span className="text-rose-500 strong" > *</span></label>


                   <select
                        className={`w-full mt-2 border rounded-md ${
        formik.errors.city && formik.touched.city
          ? "border-red-500 border-2" : "border-blue-600"
      }`}

                        {...formik.getFieldProps('city')}
                      >
                        <option value="" hidden selected>--city--</option>
                        {cityArray.map((item, index) => {
                          return (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>


                  </div>


                  <div className="mt-2">
                    <label>Address<span className="text-rose-500 strong" > *</span></label>
                    <input
                      type="text"

                      {...formik.getFieldProps('address')}
                      className={`w-full mt-2 py-2 border rounded-md ${
      formik.errors.address && formik.touched.address
        ? "border-red-500 border-2" : "border-blue-600"
    }`}
                    />
                  </div>

                  <div className="mt-2">
                    <label>Pincode<span className="text-rose-500 strong" > *</span></label>
                    <input
                      type="text"

                      {...formik.getFieldProps('pincode')}
                      className={`w-full mt-2 py-2 border rounded-md ${
      formik.errors.pincode && formik.touched.pincode
        ? "border-red-500 border-2" : "border-blue-600"
    }`}
                    />
                  </div>


                </div>
              )}
              {currentStep === 2 && (
                <div className="step">
                  <div className="">
                    <label>Property Type<span className="text-rose-500 strong" > *</span></label>
                    <div className="flex mt-2 flex-wrap">
                      {propertyTypeArray.map((item, index) => {
                        return (
                          <>
                            <p
                               onClick={() => formik.setFieldValue('propertyType', item)}
                              className={
                                formik.values.propertyType === item
            ? "rounded-full bg-col  text-white px-5 py-1 m-1 cursor-pointer"
            : "rounded-full border border-blue-600 text-blue-600 px-5 py-1 m-1 cursor-pointer"
                              }
                            >
                              {item}
                            </p>
                          </>
                        );
                      })}
                    </div>
                    {formik.errors.propertyType && formik.touched.propertyType?<span className="text-rose-500">{formik.errors.propertyType}</span>:<></>}
                  </div>

                  <div className="mt-3">
                    <label>Society/Property Name<span className="text-rose-500 strong" > *</span></label>
                    <input
                      type="text"

                      {...formik.getFieldProps('society')}

                      className={`w-full mt-2 py-2 border rounded-md ${
      formik.errors.society && formik.touched.society
        ? "border-red-500 border-2" : "border-blue-600"
    }`}
                    />
                  </div>

                  {formik.values.propertyType == "Villa" || formik.values.propertyType == "Plot" ? (
                    <></>
                  ) : (
                    <div className="mt-2">
                      <div className="flex">
                        <div className="w-1/2 mr-1">
                          <label>Floor Number</label>
                          <input
                            type="text"

                            {...formik.getFieldProps('floorNumber')}

                            className={`w-full mt-2 py-2 border rounded-md ${
            formik.errors.floorNumber && formik.touched.floorNumber
              ? "border-red-500 border-2" : "border-blue-600"
          }`}
                          />
                        </div>

                        <div className="w-1/2 ml-1">
                          <label>Total Floors</label>
                          <input
                            type="text"

                            {...formik.getFieldProps('totalFloors')}

                            className={`w-full mt-2 py-2 border rounded-md ${
            formik.errors.floorNumber && formik.touched.floorNumber
              ? "border-red-500 border-2" : "border-blue-600"
          }`}
                          />
                        </div>

                      </div>
                          {formik.errors.totalFloors && formik.touched.totalFloors?<div className="text-rose-500">{formik.errors.totalFloors}</div>:<></>}
                        {formik.errors.floorNumber && formik.touched.floorNumber?<div className="text-rose-500">{formik.errors.floorNumber}</div>:<></>}
                    </div>
                  )}

                  <div className="mt-2">
                    <label>BHK Type<span className="text-rose-500 strong" > *</span></label>


                   <select
                        className={`w-full mt-2 border rounded-md ${
        formik.errors.bhk && formik.touched.bhk
          ? "border-red-500 border-2" : "border-blue-600"
      }`}

                        {...formik.getFieldProps('bhk')}
                      >
                         <option value="" selected disabled hidden>BHK</option>
		  <option value="2">2 BHK</option>
		  <option value="3">3 BHK</option>
		  <option value="4">4 BHK</option>
		  <option value="4+">4+ BHK</option>

                      </select>
                  </div>

                  <div className="mt-2">
                    <label>Property Size<span className="text-rose-500 strong" > *</span></label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Carpet Area"

                        {...formik.getFieldProps('carpetArea')}

                        className="w-full mt-2  py-2 border border-r-0  rounded-r-none border-blue-600  rounded-md"
                      />
                      {formik.errors.carpetArea && formik.touched.carpetArea?<span className="text-rose-500">{formik.errors.carpetArea}</span>:<></>}
                      <div class="relative mt-2">
                        <h1
                          className="block appearance-none w-full rounded-l-none border-l-0 bg-gray-200 border  border-blue-600  text-gray-700 py-3 px-4  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                        Sq.ft.
                        </h1>
                      </div>
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Super Area"
                        {...formik.getFieldProps('superArea')}

                        className="w-full mt-2  py-2 border border-r-0  rounded-r-none border-blue-600  rounded-md"
                      />

                      <div class="relative mt-2">
                        <h1
                          className="block appearance-none w-full rounded-l-none border-l-0 bg-gray-200 border  border-blue-600  text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                          Sq.ft.
                        </h1>
                      </div>
                    </div>
                    {formik.errors.superArea && formik.touched.superArea?<span className="flex text-rose-500">{formik.errors.superArea}</span>:<></>}
                  </div>
                  <div className="mt-4">
                    <label>Status<span className="text-rose-500 strong" > *</span></label>
                    <div className="flex mt-2 flex-wrap">
                      {statusArray.map((item, index) => {
                        return (
                          <>
                            <p

                              onClick={() => formik.setFieldValue('status', item)}
                              className={
                                formik.values.status === item
                                  ? "rounded-full bg-col  text-white px-5 py-1  m-1 cursor-pointer"
                                  : "rounded-full border  border-blue-600  text-blue-600  px-5 py-1 m-1 cursor-pointer"
                              }
                            >
                              {item}
                            </p>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {formik.errors.status && formik.touched.status?<span className="text-rose-500">{formik.errors.status}</span>:<></>}
                  {/* <div className="flex mt-4 justify-center">

                    <div className="w-1/2  flex justify-center items-center flex-col">

                    <small className="cursor-pointer mb-2" onClick={handleDelImg} name="brochure">Remove</small>
                    <label >
                        <div className="w-[120px] h-[120px] relative cursor-pointer border-2 text-4xl border-cyan-600 rounded-md flex justify-center items-center">
                          {postBrochure.length>0 ? (
                            <>

                              <div className="post_length  ">
                                <p className=" ">{postBrochure.length} +</p>
                              </div>

                            </>
                          ) : (
                            <AddIcon className="text-blue-400 " />
                          )}
                        </div>
                        <input
                          hidden
                          type="file"
                          accept=".pdf"
                          multiple
                          onChange={handleBrochure}
                          name="brochure"
                        />
                      </label>

                      <p className="text-center">Property Brochure</p>
                    </div>


                  </div> */}

<div className="mt-2">
                    <label>Property Brochure</label>
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handleBrochure}
                      name="brochure"
                      className="w-full mt-2  px-2 py-2 border  border-blue-600  rounded-md"
                    />
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <>
                  <div className="step">
                    <div>
                      <div className="flex justify-between">
                        <div className="pl-1">
                          <p>Balconies</p>
                          <div className="flex mt-2">
                            <button
                             type="button"
                              onClick={() => {
                                if (formik.values.balconies > 0) {
                                  formik.setFieldValue('balconies', formik.values.balconies - 1);
                                }
                              }}
                              className="w-[40px] h-[40px] bg-slate-300"
                            >
                              <RemoveIcon />
                            </button>
                            <input
                              type="text"
                              className="w-[40px] h-[40px] border  border-blue-600 "
                              value={formik.values.balconies}
                              readOnly
                            />
                            <button
                            type="button"
                              onClick={() => {
                                formik.setFieldValue('balconies', formik.values.balconies + 1);
                              }}
                              className="w-[40px] h-[40px] bg-slate-300"
                            >
                              <AddIcon />
                            </button>
                          </div>
                        </div>
                        <div className=" pr-1 ">
                          <p>No. of parking</p>
                          <div className="flex mt-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (formik.values.parkings > 0) {
                                  formik.setFieldValue('parkings', formik.values.parkings - 1);
                                }
                              }}
                              className="w-[40px] h-[40px] bg-slate-300"
                            >
                              <RemoveIcon />
                            </button>
                            <input
                              type="text"
                              className="w-[40px] h-[40px] border  border-blue-600"
                              value={formik.values.parkings}
                              readOnly
                            />
                            <button
                              type="button"
                              onClick={() => formik.setFieldValue('parkings', formik.values.parkings + 1)}
                              className="w-[40px] h-[40px] bg-slate-300"
                            >
                              <AddIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="pl-1 mt-2">
                        <p>Bathrooms</p>
                        <div className="flex mt-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (formik.values.bathrooms > 0) {
                                formik.setFieldValue('bathrooms', formik.values.bathrooms - 1);
                              }
                            }}
                            className="w-[40px] h-[40px] bg-slate-300"
                          >
                            <RemoveIcon />
                          </button>
                          <input
                            type="text"
                            className="w-[40px] h-[40px] border  border-blue-600"
                            value={formik.values.bathrooms}
                            readOnly
                          />
                          <button
                          type="button"
                            onClick={() => formik.setFieldValue('bathrooms', formik.values.bathrooms + 1)}
                            className="w-[40px] h-[40px] bg-slate-300"
                          >
                            <AddIcon />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <label htmlFor="">Other rooms</label>
                      <MultiSelect
                        otherRooms={formik.values.otherRooms}
                        setOtherRooms={(selectedRooms) => formik.setFieldValue('otherRooms', selectedRooms)}
                      />
                    </div>
                    <div className="mt-8">
                      <label> Furnishing<span className="text-rose-500 strong" > *</span></label>
                      <div className="flex mt-2 flex-wrap">
                        {furnishingArray.map((item, index) => {
                          return (
                            <>
                              <p
                              onClick={() => formik.setFieldValue('furnishing', item)}
                                className={
                                  formik.values.furnishing === item
                                    ? "rounded-full bg-col  text-white px-5 py-1 m-1 cursor-pointer"
                                    : "rounded-full border border-blue-600 text-blue-600 px-5 py-1 m-1 cursor-pointer"
                                }
                              >
                                {item}
                              </p>
                            </>
                          );
                        })}
                      </div>
                    </div>
                    {formik.errors.furnishing && formik.touched.furnishing?<span className="text-rose-500">{formik.errors.furnishing}</span>:<></>}


                    <div className="mt-8">
                      <label>Property Facing</label>
                      <select
                        className="w-full mt-2 border  border-blue-600 rounded-md"
                        {...formik.getFieldProps('facing')}
                      >
                        <option value="" hidden selected>--Select facing--</option>
                        {propertyFacingArray.map((item, index) => {
                          return (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {formik.errors.facing && formik.touched.facing?<span className="text-rose-500">{formik.errors.facing}</span>:<></>}
                    <div className="mt-8">
                      <label htmlFor="">Amenities</label>
                      <div className="mt-2">
                        <Amenities
                          amenities={amenities}
                          selectedAmenities={formik.values.selectedAmenities}
                          setSelectedAmenities={(selected) => formik.setFieldValue('selectedAmenities', selected)}
                        />
                      </div>
                    </div>
                    <div className="mt-8">
                      <label htmlFor="">Additional details</label>
                      <div className="mt-2">
                        <textarea
                          rows={5}
                          className="w-full border  border-blue-600 rounded-md bg-slate-50"
                          placeholder="Add details here...."
                            {...formik.getFieldProps('details')}
                        ></textarea>
                      </div>
                    </div>
                    {formik.errors.details && formik.touched.details?<span className="text-rose-500">{formik.errors.details}</span>:<></>}
                  </div>
                </>
              )}
              {currentStep === 4 && (
                <>
                  <div className="step">
                    <div className="flex justify-evenly">
                      <div className="w-1/2  flex justify-center items-center flex-col">
                      <small className="cursor-pointer mb-2" onClick={handleDelImg} name="bedroom">Remove</small>
                      <label >
                          <div className="w-[120px] h-[120px] relative cursor-pointer border-2 text-4xl border-cyan-600 rounded-md flex justify-center items-center">
                            {postbedroomimg.length>0 ? (
                              <>
                                <img
                                  src={URL.createObjectURL(postbedroomimg[0])}
                                  alt=""
                                  className="postim"

                                />
                                <div className="post_length  ">
                                  <p className=" ">{postbedroomimg.length} +</p>
                                </div>

                              </>
                            ) : (
                              <AddIcon className="text-blue-400 " />
                            )}
                          </div>
                          <input
                            hidden
                            type="file"
                            accept=".png, .jpeg , .jpg"
                            multiple
                            onChange={handleImage}
                            name="bedroom"
                          />
                        </label>

                        <p className="text-center">Bedroom</p>
                      </div>

                      <div className="w-1/2  flex justify-center items-center flex-col">
                      <small className="cursor-pointer mb-2" onClick={handleDelImg} name="bathroom">Remove</small>

                      <label >
                          <div className="w-[120px] h-[120px] relative cursor-pointer border-2 text-4xl border-cyan-600 rounded-md flex justify-center items-center">
                            {postbathroomimg.length>0 ? (
                              <>
                                <img
                                  src={URL.createObjectURL(postbathroomimg[0])}
                                  alt=""
                                  className="postim"

                                />
                                <div className="post_length  ">
                                  <p className=" ">{postbathroomimg.length} +</p>
                                </div>

                              </>
                            ) : (
                              <AddIcon className="text-blue-400 " />
                            )}
                          </div>
                          <input
                            hidden
                            type="file"
                            accept=".png, .jpeg , .jpg"
                            multiple
                            onChange={handleImage}
                            name="bathroom"
                          />
                        </label>

                        <p className="text-center">Bathroom</p>
                      </div>
                    </div>
                    <div className="flex justify-evenly mt-6">
                      <div className="w-1/2  flex justify-center items-center flex-col">
                      <small className="cursor-pointer mb-2" onClick={handleDelImg} name="kitchen">Remove</small>

                      <label >
                          <div className="w-[120px] h-[120px] relative cursor-pointer border-2 text-4xl border-cyan-600 rounded-md flex justify-center items-center">
                            {postkitchenimg.length>0 ? (
                              <>
                                <img
                                  src={URL.createObjectURL(postkitchenimg[0])}
                                  alt=""
                                  className="postim"

                                />
                                <div className="post_length  ">
                                  <p className=" ">{postkitchenimg.length} +</p>
                                </div>

                              </>
                            ) : (
                              <AddIcon className="text-blue-400 " />
                            )}
                          </div>
                          <input
                            hidden
                            type="file"
                            accept=".png, .jpeg , .jpg"
                            multiple
                            onChange={handleImage}
                            name="kitchen"
                          />
                        </label>

                        <p className="text-center">Kitchen</p>
                      </div>

                      <div className="w-1/2  flex justify-center items-center flex-col">
                      <small className="cursor-pointer mb-2" onClick={handleDelImg} name="hall">Remove</small>

                      <label >
                          <div className="w-[120px] h-[120px] relative cursor-pointer border-2 text-4xl border-cyan-600 rounded-md flex justify-center items-center">
                            {posthallimg.length>0 ? (
                              <>
                                <img
                                  src={URL.createObjectURL(posthallimg[0])}
                                  alt=""
                                  className="postim"

                                />
                                <div className="post_length  ">
                                  <p className=" ">{posthallimg.length} +</p>
                                </div>

                              </>
                            ) : (
                              <AddIcon className="text-blue-400 " />
                            )}
                          </div>
                          <input
                            hidden
                            type="file"
                            accept=".png, .jpeg , .jpg"
                            multiple
                            onChange={handleImage}
                            name="hall"
                          />
                        </label>

                        <p className="text-center">Living Room</p>
                      </div>
                    </div>
                    <div className="flex  mt-6">
                      <div className="w-1/2  flex justify-center items-center flex-col">
                      <small className="cursor-pointer mb-2" onClick={handleDelImg} name="floor_plan">Remove</small>

                        <label >
                          <div className="w-[120px] h-[120px] relative cursor-pointer border-2 text-4xl border-cyan-600 rounded-md flex justify-center items-center">
                            {postFloorPlan.length>0 ? (
                              <>
                                <img
                                  src={URL.createObjectURL(postFloorPlan[0])}
                                  alt=""
                                  className="postim"
                                />

                                <div className="post_length  ">
                                  <p className=" ">{postFloorPlan.length} +</p>
                                </div>

                              </>
                            ) : (
                              <AddIcon className="text-blue-400 " />
                            )}
                          </div>
                          <input
                            hidden
                            type="file"
                            accept=".png, .jpeg , .jpg"
                            multiple
                            onChange={handleImage}
                            name="floor_plan"
                          />
                        </label>

                        <p className="text-center">Floor Plan</p>
                      </div>
                      <div className="w-1/2  flex justify-center items-center flex-col">
                      <small className="cursor-pointer mb-2" onClick={handleDelImg} name="other">Remove</small>

                        <label >
                          <div className="w-[120px] h-[120px] relative cursor-pointer border-2 text-4xl border-cyan-600 rounded-md flex justify-center items-center">
                            {postOtherimg.length>0 ? (
                              <>
                                <img
                                  src={URL.createObjectURL(postOtherimg[0])}
                                  alt=""
                                  className="postim"
                                />

                                <div className="post_length  ">
                                  <p className=" ">{postOtherimg.length} +</p>
                                </div>

                              </>
                            ) : (
                              <AddIcon className="text-blue-400 " />
                            )}
                          </div>
                          <input
                            hidden
                            type="file"
                            accept=".png, .jpeg , .jpg"
                            multiple
                            onChange={handleImage}
                            name="other"
                          />
                        </label>

                        <p className="text-center">Other Images</p>
                      </div>
                    </div>

                  </div>
                </>
              )}

              {currentStep === 5 && (
                <div className="step">
                  <div className="">
                    <label>Are you owner or Agent?<span className="text-rose-500 strong" > *</span></label>
                    <div className="flex mt-2 mb-0 flex-wrap">
                      {ownerArray.map((item, index) => {
                        return (
                          <>
                            <p
                              onClick={() => formik.setFieldValue('agentType', item)}
                              className={
                                formik.values.agentType === item
                                  ? "rounded-full bg-col  text-white px-5 py-1  m-1 cursor-pointer"
                                  : "rounded-full border  border-blue-600  text-blue-600  px-5 py-1 m-1 cursor-pointer"
                              }
                            >
                              {item}
                            </p>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {formik.errors.agentType && formik.touched.agentType?<span className="mb-2 text-rose-500">{formik.errors.agentType}</span>:<></>}
                  <div className="mt-3">
                    <label>Ownership<span className="text-rose-500 strong" > *</span></label>
                    <div className="flex mt-2 mb-1 flex-wrap">
                      {ownerShipArray.map((item, index) => {
                        return (
                          <>
                            <p
                              onClick={() => formik.setFieldValue('ownership', item)}
                              className={
                                formik.values.ownership === item
                                  ? "rounded-full bg-col  text-white px-5 py-1  m-1 cursor-pointer"
                                  : "rounded-full border  border-blue-600  text-blue-600  px-5 py-1 m-1 cursor-pointer"
                              }
                            >
                              {item}
                            </p>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {formik.errors.ownership && formik.touched.ownership?<span className="text-rose-500">{formik.errors.ownership}</span>:<></>}

                  <div className="mt-4">
                    <label htmlFor="">Price Range<span className="text-rose-500 strong" > *</span></label>
                      <div className="flex">
                        <div className="w-1/2 mr-1">
                        <div className="flex">


                    <input
                        className={`w-[50%] mt-2 border rounded-r-none  border-r-0 rounded-md ${
        formik.errors.minPrice && formik.touched.minPrice
          ? "border-red-500 border-2" : "border-blue-600"
      }`}
                          {...formik.getFieldProps('minPrice')}
                        placeholder="Min Price"

                      />
                      <div class="relative mt-2 w-[50%]">
                        <select

                          className={`block appearance-none w-full rounded-l-none  border-l-0 bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white ${
          formik.errors.minPriceType && formik.touched.minPriceType
            ? "border-red-500 border-2" : ""
        }`}

                          {...formik.getFieldProps('minPriceType')}
                        >
                          <option value="" selected disabled hidden>Select</option>
                          <option value="Lac" >Lac</option>
                          <option value="Cr" >Cr</option>
                        </select>
                      </div>


                       </div>
                        </div>

                        <p className="mt-3 mx-4 text-lg">To</p>
                        <div className="w-1/2 ml-1">
                        <div className="flex">


                    <input
                    className={`w-[50%] mt-2 border rounded-r-none  border-r-0 rounded-md ${
    formik.errors.maxPrice && formik.touched.maxPrice
      ? "border-red-500 border-2" : "border-blue-600"
  }`}
                          {...formik.getFieldProps('maxPrice')}
                        placeholder="Max Price"

                      />
                      <div class="relative mt-2 w-[50%]">
                        <select

                          className={`block appearance-none w-full rounded-l-none  border-l-0 bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white ${
          formik.errors.maxPriceType && formik.touched.maxPriceType
            ? "border-red-500 border-2" : ""
        }`}
                          {...formik.getFieldProps('maxPriceType')}
                        >
                          <option value="" selected disabled hidden>Select</option>
                          <option value="Lac" >Lac</option>
                          <option value="Cr" >Cr</option>
                        </select>
                      </div>


                       </div>
                        </div>

                      </div>

                    </div>


                  <div className="mt-3">
                    <label>Maintenance</label>
                    <div className="flex">

                      <div class="relative mt-2 w-full">
                        <select
                          class="block appearance-none w-full   bg-gray-200 border  border-blue-600  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          {...formik.getFieldProps('maintenance')}
                        >
                          <option value="" selected disabled hidden>Select</option>
                          {price_ranges.map((val,ind)=>{
                            return(
                              <>
                              <option value={val}>{val}</option>
                              </>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                    {formik.errors.maintenance && formik.touched.maintenance?<span className="text-rose-500">{formik.errors.maintenance}</span>:<></>}
                    <div className="mt-3">
                      <label>Property Category</label>
                      <div className="flex">

                        <div class="relative mt-2 w-full">
                          <select
                            class="block appearance-none w-full   bg-gray-200 border  border-blue-600  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            {...formik.getFieldProps('category')}
                          >
                            <option value="" selected disabled hidden>Select</option>
                            <option value="Budget" >Budget</option>
                            <option value="Luxury" >Luxury</option>
                            <option value="Ultra Luxury" >Ultra Luxury</option>
                          </select>
                        </div>
                      </div>
                    </div>



                </div>
              )}
              {
                currentStep === 5 ?(
                  <>
                  <div className="text-center">
                <button
                  type="submit"

                  className="bg-col mt-4 ml-1 text-white w-[75%] md:w-full py-3 text-xl tracking-widest uppercase rounded-md"
                >
                  Submit
                </button>
              </div>
              {Object.keys(formik.errors).length > 0 ? (
    <div className="text-rose-500">Fill all the required fields</div>
  ) : null}
                  </>
                ):(
                  <>

                  <div className=" w-full flex justify-center">

                <p onClick={() => handleClick("next")} className=" cursor-pointer bg-col text-center mt-4 ml-1 text-white w-[75%]   md:w-full py-3 text-xl tracking-widest uppercase rounded-md"> Save to drafts</p>
              </div>

                  </>
                )
              }
            </form>
           {
            currentStep===5 &&  loading && (
              <div className="text-center mt-4">
                <CircularProgress  size={45} />
              </div>
            )
           }
          </div>

          {/* <div className="   flex justify-around my-2 py-3 ">
            <button
              onClick={() => handleClick()}
              className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-normal py-2 px-4 mr-1 rounded"
            >
              {" "}
              Previous{" "}
            </button>
            <button
              onClick={() => handleClick("next")}
              className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-normal py-2 px-4 rounded"
            >
              {" "}
              Next{" "}
            </button>
          </div> */}
        </div>
        </div>
      </div>

      <ToastContainer />
     </>
   ):null}
</>

  );
}
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
