import {sql} from '@vercel/postgres';

export default async function handler(req,res){
  const {userName, userEmail, message, prop}= req.body;
   try {

     await sql`INSERT INTO prop_assistance (name, email, message, prop_name) VALUES (${userName},${userEmail}, ${message}, ${prop});`;
     res.status(200).json({ message: 'Form submitted successfully!' });
   } catch (error) {
     console.log({userName,userEmail, message, prop});
     if (error.code === '23505') {
      // Custom error message for duplicate entry
      res.status(400).json({ error: 'message for this property and email already sent!' });
    } else {
      // Handle other errors
      console.error('Error submitting form:', error);
      res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
   }
}
