import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
    const { matches } = req.body;
    const json_matches = JSON.parse(matches);
    const ids = json_matches.map((match) => match.id);
    try {
        const { rows } = await sql`
            SELECT * 
            FROM property_details 
            WHERE id = ANY(${ids})
        `;
        console.log("querydata", rows[0]);
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}
