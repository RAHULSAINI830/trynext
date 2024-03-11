import {sql} from '@vercel/postgres'

export default async function handler(req, res) {
    const {email}=req.query;
    const {key}=req.query;
    const {rows}=await sql`SELECT home_matches from home_matchmaking where mail=${email || key} AND home_matches IS NOT NULL;`;
    console.log(rows)
    const matches=rows[0].home_matches;
    
    // const json_matches = JSON.parse(matches);
    // const ids = json_matches.map((match) => match.id);

    try {
        const response = await fetch('/api/getHousesWithMatches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: matches
        })
        const data=await response.json();
        // console.log("querydata", rows[0]);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}