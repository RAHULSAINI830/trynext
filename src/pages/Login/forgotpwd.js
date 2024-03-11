import logo from '../images/logo-png.png'
import Image from "next/image";
import {useFormik} from 'formik'

export default function ForgotPwd() {

  const formik=useFormik({
    initialValues:{
      email:''
    },
    validate:(values)=>{
      const errors={};
      if(!values.email){
        errors.email='Required';
      }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email="invalid email address";
      }
      return errors;
    },
    onSubmit
  })
  async function onSubmit(values){

       try {
         //check if email exist
         const emailCheckResponse = await fetch('/api/checkEmail', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(values),
         });
          //if mail not found
          if (emailCheckResponse.status === 200){
            const data = await emailCheckResponse.json();
            formik.setErrors({ email: data.message });
          }
          //if email is found
          else if (emailCheckResponse.status === 400){
            const response = await fetch('/api/resetPassword', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
            if (response.ok) {
              alert('mail sent successfully!');
            } else {
              alert('An error occurred while sending the mail.');
            }
          }
       } catch (error) {
         console.error('Error sending mail:', error);
         alert('An error occurred while sending the mail.');
       }
  };



    return (
        <>
       <div className="flex items-center justify-center text-center bg-white text-black h-screen">
        <form novalidate="" onSubmit={formik.handleSubmit} action="" className="flex flex-col w-full max-w-lg p-12 rounded-2xl shadow-lg text-gray-100">
            <label for="email" className="self-start text-xs text-black font-semibold">Email</label>
            <input type="email" {...formik.getFieldProps('email')} name="email" id="email" placeholder="Email"  className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri text-black focus:border-violet-400 focus:ri" />
            {formik.errors.email && formik.touched.email?<span className="text-rose-500">{formik.errors.email}</span>:<></>}
            <button type="submit" className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded bg-blue-500 text-white">Reset Password</button>

        </form>
    </div>

    </>
    );
}
