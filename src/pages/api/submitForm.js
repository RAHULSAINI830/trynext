
// import { Pool } from 'pg';
//
// export default async (req, res) => {
//   // Retrieve the form data from the request body
//   const { name, mail, phone } = req.body;
//
//   // Create a new PostgreSQL connection pool
//   const pool = new Pool({
//     connectionString: 'postgresql://postgres:vidit06@localhost:5432/subscribeDB',
//   });
//
//   try {
//     // Insert the form data into the database using parameterized query
//     await pool.query('INSERT INTO subscribenew (name, mail, phone) VALUES ($1, $2, $3)', [name, mail, phone]);
//
//     res.status(200).json({ message: 'Form submitted successfully!' });
//   } catch (error) {
//     console.log({name, mail, phone});
//     console.error('Error submitting form:', error);
//     res.status(500).json({ message: 'Oops! An error occurred while submitting the form.' });
//   } finally {
//     // End the database connection
//     pool.end();
//   }
// };
import { sql } from '@vercel/postgres';
import {hash} from 'bcryptjs';
import { signIn } from 'next-auth/react';

export default async function handler(req, res) {
  // Retrieve the form data from the request body
  const { name,email, password, phone, communication } = req.body;
  const hashedPassword = await hash(password,12);

  try {
    // Insert the form data into the database using parameterized query
    //await sql`CREATE TABLE IF NOT EXISTS user_details ( name varchar(255), mail varchar(255), password varchar(255), phone varchar(10), communication varchar(30));`;
    //await pool.query('INSERT INTO partnertable (name, company, project, phone) VALUES ($1, $2, $3, $4)', [name, company, project, phone]);
    await sql`INSERT INTO user_details (name, mail, password, phone, communication) VALUES (${name},${email}, ${hashedPassword}, ${phone}, ${communication});`;



    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.log({name,email, password, phone, communication});
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Oops! An error occurred while submitting the form.' });
  }
};
