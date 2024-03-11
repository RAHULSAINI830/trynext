import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { email } = req.body;

  try {
    // Query the database to fetch user information based on the email
    const userData = await sql`SELECT name, mail, phone, communication FROM user_details WHERE mail = ${email}`;

    const data=userData.rows[0];

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Oops! An error occurred while fetching user data.' });
  }
}
