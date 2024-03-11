'use client'
import cuslogo from './images/customlogo.jpg'
import Image from "next/image";
import React ,{useState}from "react";
function Partner({classDesc}){
  const [showPartner,setShowPartner]=useState(false);

  const [formData, setFormData] = useState({
   name: '',
   company: '',
   project: '',
   phone: '',
 });

 const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
    setShowPartner(false)
   e.preventDefault();

   try {
     // Make a POST request to the submitForm API route
     const response = await fetch('/api/partnerForm', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
     });

     if (response.ok) {
       alert('Form submitted successfully!');
     } else {
       alert('An error occurred while submitting the form.');
     }
   } catch (error) {
     console.error('Error submitting form:', error);
     alert('An error occurred while submitting the form.');
   }
 };

const handleclose = (e)=>{
  if(e.target.id=="wrapper")
    setShowPartner(false);

}


  return <div>
  <button type="button" onClick={()=> setShowPartner(true)} class={classDesc}>Send Request</button>
  {showPartner ?(
    <div onClick={handleclose} id="wrapper" className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
     <div className="w-[400px] justify-center items-center flex flex-col bg-white rounded py-6  px-6 lg:px-8 ">
       <div>
        <Image src={cuslogo} alt="Smartneev Logo" className="w-16  place-center"/>
       </div>
       <div>

      <h3 className="mb-4 text-xl text-center font-medium text-gray-900">Partner with Us</h3>
      <form onSubmit={handleSubmit} className="space-y-6" >
        <div>
         <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="XYZ" required/>
        </div>
        <div>
          <label for="company" className="block mb-2 text-sm font-medium text-gray-900">Your company name</label>
          <input id="company" type="name" name="company" value={formData.company} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="XYZ" required/>
        </div>
        <div>
          <label for="project" className="block mb-2 text-sm font-medium text-gray-900">Your project name</label>
          <input id="project" name="project" value={formData.project} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="XYZ" required/>
        </div>
        <div>
          <label for="phone" className="block mb-2 text-sm font-medium text-gray-900">Your contact number</label>
          <input id="phone" type="number" name="phone" value={formData.phone} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="XXXXXXXXXX" required/>
        </div>
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded lg text-sm px-5 py-2.5 text-center">Send Request</button>
      </form>
      </div>
      </div>
    </div>) :null}
  </div>

}

export default Partner;
