import { sql } from '@vercel/postgres';
//
export default async function handler(req, res)  {
  // Retrieve the form data from the request body
  const { email,key,city } = req.body;
  console.log(city);

  try {
    // Insert the form data into the database using parameterized query
    await sql`DELETE FROM home_matchmaking WHERE mail = ${email};`;
    await sql`UPDATE home_matchmaking SET mail=${email} WHERE mail=${key};`;

    res.status(200).json({ message: 'Updated successfully!' });
  } catch (error) {
    console.log({key,email});
    console.error('Error updating:', error);
    res.status(500).json({ message: 'Oops! An error occurred while updating.' });
  }
};
