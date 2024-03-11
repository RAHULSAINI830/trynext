import { useState } from 'react';
import {useFormik} from 'formik';
import Confetti from 'react-confetti';
export default function SubscribeToNewsLetter (){
  const [Loading, setLoading] = useState(false)
  const [res, setres] = useState({})
  const formik=useFormik({
    initialValues:{
      email:''
    },
    validate:(values)=>{
      const errors={};
      if(!values.email){
        errors.email='Email Required';
      }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email="Invalid email address";
      }
      return errors;
    },
    onSubmit
  })
  async function onSubmit(values){
    setLoading(true);

  try {
    const response = await fetch('/api/newsLetter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    setres(response)

    if (response.ok) {
      // Simulate a delay with setTimeout
      setTimeout(() => {
        setLoading(false);
        setres(true);
      }, 2000); // Adjust the time in milliseconds as needed
    } else {
      setLoading(false);
      // Handle error case
    }
  } catch (error) {
    console.log('error: ', error);
    setLoading(false);
  }

  };
  return <div className="w-full">
    <p className="text-center md:text-left md:text-2xl font-semibold py-1">Want more property related insights and news in India? </p>
    <p className="text-center md:text-left md:text-2xl font-semibold py-1">Subscribe to our newsletter today.</p>
    <div className="">
    <form noValidate="" onSubmit={formik.handleSubmit} action="" className="flex flex-col md:px-0 md:flex-row w-[80%] md:w-[100%] mx-auto" >
    <input type="email" {...formik.getFieldProps('email')} name="email" id="email" placeholder="Enter your email address" className={`md:w-2/3 rounded-md md:mr-2 my-1 border  text-sm text-gray-700 ${
    formik.errors.email && formik.touched.email
    ? "border-red-500 border-2" : "border-gray-400"
    }`} />
    <button type="submit" className=" my-1 mx-auto md:mx-0 border border-gray-300 p-2 w-fit text-white  hover:bg-blue-700  bg-blue-500 font-medium rounded-md text-lg text-center">Subscribe</button>
    </form>
    </div>
  {Loading && <Confetti/>}
  {res.status>=200 && res.status<=299 && <><div className="font-semibold pl-1">Subscribed!</div></>}
  {res.status>=400 && res.status<=499 && <><div className="font-semibold pl-1">Already Subscribed!</div></>}
    </div>
}
