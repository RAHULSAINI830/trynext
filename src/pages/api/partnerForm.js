//import { Pool } from 'pg';
import { sql } from '@vercel/postgres';

// export default async function handler(request, response) {
//   try {
//     const result =
//       await sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;
//     return response.status(200).json({ result });
//   } catch (error) {
//     return response.status(500).json({ error });
//   }
// }


export default async function handler(req, res) {
  // Retrieve the form data from the request body
  const { name, company, project, phone } = req.body;



  try {
    // Insert the form data into the database using parameterized query
    await sql`CREATE TABLE IF NOT EXISTS partner_details ( Name varchar(255), company varchar(255), project varchar(255), phone varchar(10) );`;
    //await pool.query('INSERT INTO partnertable (name, company, project, phone) VALUES ($1, $2, $3, $4)', [name, company, project, phone]);
    await sql`INSERT INTO partner_details (Name, company, project, phone ) VALUES (${name}, ${company}, ${project}, ${phone});`;
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.log({name, company, project, phone});
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Oops! An error occurred while submitting the form.' });
  }
};
