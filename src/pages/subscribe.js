
'use client'
import cuslogo from './images/customlogo.jpg'
import logo from './images/logo-png.png'
import Image from "next/image";
import React ,{useState,useEffect,useRef}from "react";
import Login from "./Login/Login.js"
import {signIn,signOut} from 'next-auth/react'
import Link from 'next/link'
import {useFormik} from 'formik'
import {useRouter} from 'next/router';
import SignUp from './Login/SignUp'
import LoadingSpinner from './loadingSpinner';

function Subscribe({classDesc,type,text}){
  const [showSubscribe,setShowSubscribe]=useState(false);
  const [showSignIn,setShowSignIn]=useState(false);
  const router=useRouter();
  const [error, setError] = useState(null);
  const [communicationMethod, setCommunicationMethod] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [communication,setCommunication]=useState('Preferred Method of Communication');
  const [isLoading, setIsLoading] = useState(false);


 const formik=useFormik({
   initialValues:{
     email:'',
     password:''
   },
   validate:(values)=>{
     const errors={};
     if(!values.email){
       errors.email='Required';
     }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
       errors.email="invalid email address";
     }
     if(!values.password){
       errors.password="required";
     }else if(values.password.length<8 || values.password.length>20){
       errors.password="Must be greater than 8 and less than 20 characters long";
     }else if(values.password.includes(" ")){
       errors.password="Invalid Password";
     }
     return errors;
   },
   onSubmit
 })


  const formikReg = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      phone:'',
      communication:'',
    },
    validate:(values)=>{
      const errors={};
      if(!values.name){
        errors.name='Required';
      }
      if(!values.email){
        errors.email='Required';
      }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email="invalid email address";
      }

      if(!values.password){
        errors.password="required";
      }else if(values.password.length<8 || values.password.length>20){
        errors.password="Must be greater than 8 and less than 20 characters long";
      }else if(values.password.includes(" ")){
        erros.password="Invalid Password";
      }
      if(values.phone){
        if(!/^[0-9]{10}$/i.test(values.phone)){
            errors.phone="Invalid Number";
        }
      }
      if(!values.communication){
        errors.communication="Required";
      }else if(values.communication!=="Call" && values.communication!=="WhatsApp" &&  values.communication!=="Email"){
        errors.communication="Invalid Communication way";
      }
      return errors;
    },
    onSubmit: onSubmitReg
  })

  const handleCommunicationClick = (method) => {
   // Set the selected communication method to formikReg using setFieldValue
   formikReg.setFieldValue('communication', method);
   setCommunication(method);
   setIsOpen(false);
 };

  async function onSubmitReg(values){
     setIsLoading(true);
    try {
   // Check if the email is already registered
   const emailCheckResponse = await fetch('/api/checkEmail', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ email: values.email }),
   });

   if (emailCheckResponse.status === 200) {
     // Email is not registered, proceed with form submission

     const formSubmissionResponse = await fetch('/api/submitForm', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(values),
     });

     if (formSubmissionResponse.ok) {
       console.log('Form submitted successfully!');
       const status = await signIn('credentials', {
         redirect: false,
         email: values.email,
         password: values.password,
         callbackUrl: 'http://localhost:3000/Login/log1',
       });
       setShowSubscribe(false);
     }
   } else if (emailCheckResponse.status === 400) {
     // Email is already registered, display an error message
     const data = await emailCheckResponse.json();
     formikReg.setErrors({ email: data.message });
   }
 }  catch (error) {
      console.error('Error submitting form:', error);
      console.log('An error occurred while submitting the form.');
    }
    setIsLoading(false);

  }

async function onSubmit(values){
  setIsLoading(true);
  const status= await signIn('credentials',{
    redirect: false,
    email:values.email,
    password:values.password,
    callbackUrl:"http://localhost:3000/Login/log1"
  })
  setIsLoading(false);
  if(status.ok){
    if(text==="Post Property"){
      router.push("/postProperty");
    }

    setShowSignIn(false);
    console.log("successfully logged In");
  }

  if (status.error) {
      setError('Incorrect username or password');
    }
};


 const handleClose = (e)=>{
   if(e.target.id=="wrapper")
     setShowSubscribe(false);
   if(e.target.id=="wrapper2")
     setShowSignIn(false);
 };

 async function handleGoogleSignin() {
   signIn('google',{callbackURL:"http://localhost:3000"})
 }

   const toggleDropdown = () => {
     setIsOpen(!isOpen);
   };
   const buttonRef = useRef(null);

    const handleClick = () => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    };
  return <div>
  <div onClick={handleClick}>
  <button type="button" ref={buttonRef} onClick={()=>{
    if(type==="Sign Up"){setShowSubscribe(true)}
    else{setShowSignIn(true)}
  } } class={classDesc}>{text}</button></div>
  {isLoading && <LoadingSpinner />}
  {showSubscribe ?(
    <div id="wrapper" onClick={handleClose} className="fixed inset-0  bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
     <div className="w-full max-w-md p-7 space-y-3 rounded-xl bg-white text-gray-100">
      <a href="https://smartneev.com/" class="flex justify-center">
      <Image src={logo} alt="Smartneev" className="logo"/>
      </a>
      <h1 className="text-sm text-center text-black">Sign up to a free account to join other home addicts!</h1>
      <br></br>
    <form onSubmit={formikReg.handleSubmit} action="" className="space-y-3 relative">
       <div className="space-y-1 text-sm">
        <input type="text" name="name" {...formikReg.getFieldProps('name')} id="name" placeholder="Name" className="w-full px-4 py-1 rounded-md border-gray-700 bg-white text-black focus:border-violet-400" />
      </div>
      {formikReg.errors.name && formikReg.touched.name?<span className="text-rose-500">{formikReg.errors.name}</span>:<></>}
      <div className="space-y-1 text-sm">

        <input type="text" name="email" {...formikReg.getFieldProps('email')} id="email" placeholder="Email" className="w-full px-4 py-1 rounded-md border-gray-700 bg-white text-black focus:border-violet-400" />
      </div>
      {formikReg.errors.email && formikReg.touched.email?<span className="text-rose-500">{formikReg.errors.email}</span>:<></>}
      <div className="space-y-1 text-sm">

        <input type="password" name="password"  {...formikReg.getFieldProps('password')} id="password" placeholder="Password" className="w-full px-4 py-1 rounded-md border-gray-700 bg-white text-black focus:border-violet-400" />
      </div>
      {formikReg.errors.password && formikReg.touched.password?<span className="text-rose-500">{formikReg.errors.password}</span>:<></>}
      <div className="space-y-1 text-sm">

       <input type="tel" name="phone" id="phone" placeholder="Phone"  {...formikReg.getFieldProps('phone')} className="w-full px-4 py-1 rounded-md border-gray-700 bg-white text-black focus:border-violet-400" />
      </div>
      {formikReg.errors.phone && formikReg.touched.phone?<span className="text-rose-500">{formikReg.errors.phone}</span>:<></>}
      <div className="space-y-1 text-sm">
           <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"  class="text-gray-700 w-full bg-white focus:ring-blue-300 font-medium rounded-lg border-2 border-gray-400 px-5 py-2 mt- inline-flex items-center" type="button"  onClick={toggleDropdown}>{communication}<svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
           </svg></button>
           {isOpen && (
             <div id="dropdown" class="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
             <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a onClick={() => handleCommunicationClick('Call')} class="block px-4 py-2 hover:bg-gray-100 text-black">Phone Call</a>
      </li>
      <li>
        <a onClick={() => handleCommunicationClick('Email')} class="block px-4 py-2 hover:bg-gray-100 text-black">Email</a>
      </li>
      <li>
        <a onClick={() => handleCommunicationClick('WhatsApp')} class="block px-4 py-2 hover:bg-gray-100 text-black">WhatsApp</a>
      </li>

             </ul>
             </div>
           )}
         </div>

      <button type="submit" className="block w-full p-2 text-center rounded-lg text-white bg-blue-600">Sign Up</button>
    </form>

    <div className="flex items-center pt-2 space-x-1">
      <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
      <p className="px-3 text-sm text-gray-400">Sign Up with social accounts</p>
      <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
    </div>
    <div className="flex justify-center space-x-4">
      <button aria-label="Log in with Google" onClick={handleGoogleSignin} className="p-0 rounded-sm">
   <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
   <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
   </svg>
      </button>
    </div>
     <p className="text-xs text-center sm:px-6 text-gray-500">Already have an account?
     <a  onClick={()=>{setShowSignIn(true); setShowSubscribe(false)}}className="ml-1 underline text-blue-700">Log In</a>
     </p>
    </div>
  </div>
  ):null}
  {showSignIn ?(
  <div onClick={handleClose} id="wrapper2" className="fixed z-[999] inset-0  bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white text-gray-100">
      <a href="https://smartneev.com/" class="flex justify-center">
      <Image src={logo} alt="Smartneev" className="logo"/>
      </a>
      <h1 className="text-sm text-center text-black">Welcome Back!</h1>
      <br></br>
    <form novalidate="" onSubmit={formik.handleSubmit} action="" className="space-y-6">
    {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display the error message */}
     <div className="space-y-1 text-sm">

      <input type="email" {...formik.getFieldProps('email')} name="email" id="email" placeholder="Email" className="w-full px-4 py-1 rounded-md border-gray-700 bg-white text-black focus:border-violet-400" />
     </div>
     {formik.errors.email && formik.touched.email?<span className="text-rose-500">{formik.errors.email}</span>:<></>}
     <div className="space-y-1 text-sm">

      <input type="password" {...formik.getFieldProps('password')} name="password" id="password" placeholder="Password" className="w-full px-4 py-1 rounded-md border-gray-700 bg-white text-black focus:border-violet-400" />
     <div className="flex justify-end text-xs text-gray-400">
     <a rel="noopener noreferrer" href="./Login/forgotpwd">Forgot Password?</a>
     </div>
     {formik.errors.password && formik.touched.password?<span className="text-rose-500">{formik.errors.password}</span>:<></>}
     </div>
     <button type="submit" className="block w-full p-2 text-center rounded-lg text-white bg-blue-600">Log In</button>
    </form>
    <div className="flex items-center pt-4 space-x-1">
      <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
      <p className="px-3 text-sm text-gray-400">Log In with social accounts</p>
      <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
    </div>
    <div className="flex justify-center space-x-4">
      <button onClick={handleGoogleSignin} aria-label="Log in with Google" className="p-0 rounded-sm">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>
      </button>
    </div>
      <p className="text-xs text-center sm:px-6 text-gray-500">Don&apos;t have an account?&nbsp;
      <a onClick={()=>{setShowSignIn(false); setShowSubscribe(true)}} className="underline text-blue-700">Sign Up</a>
      </p>
    </div>
  </div>
  ):null}
</div>
};
export default Subscribe;
//  console.log(values);
  //
  // try {
  //   // Make a POST request to the submitForm API route
  //   const response = await fetch('/api/submitForm', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(values),
  //   });
  //
  //   if (response.ok) {
  //     console.log('Form submitted successfully!');
  //
  //     const status= await signIn('credentials',{
  //       redirect: false,
  //       email:values.email,
  //       password:values.password,
  //       callbackUrl:"http://localhost:3000/Login/log1"
  //     })
  //     setShowSubscribe(false);
  //   }
  // }
