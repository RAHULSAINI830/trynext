import { sql } from '@vercel/postgres';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  const { email } = req.body;
 console.log(req.body);
  try {
    // Query the database to check if the email exists

    const result = await sql`SELECT COUNT(*) as count FROM user_details WHERE mail = ${email}`;

    // if (!Array.isArray(result) || result.length === 0) {
    //   return res.status(500).json({ message: 'Error checking email: Empty or invalid result' });
    // }
    // If the email exists (count > 0), send an error response
    if (result.rows[0].count > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // If the email doesn't exist, send a success response
    return res.status(200).json({ message: 'Email not registered' });
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: 'Oops! An error occurred while checking the email.' });
  }
}
