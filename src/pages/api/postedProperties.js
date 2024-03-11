import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const email= req.query.userEmail;
  //console.log(id);
  try {
    const result = await sql`
      SELECT society,
      propertyType,
      address,
      maxPrice,
      minPrice
      FROM posted_properties
      WHERE userEmail = ${email};`;

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'An error occurred while fetching data.' });
  }
}
