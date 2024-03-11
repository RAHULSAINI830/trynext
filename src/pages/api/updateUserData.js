import { sql } from '@vercel/postgres';

export default async function handler(req, res) {


  try {
    const { name, mail, phone, communication } = req.body;
    console.log(req.body);
    await sql`UPDATE user_details SET phone = ${phone}, communication = ${communication} WHERE mail = ${mail}`;
    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Failed to update user data' });
  }
}
