import {sql} from '@vercel/postgres'

export default async function handler(req, res) {
    console.log("Hit smartCollections -> body", req.body)
    let {tag,city} = req.body;
    
    if(!tag){
        tag='near metro'
    }
    // const json_matches = JSON.parse(tag);
    try {
        const {rows} = await sql`
            SELECT * 
            FROM property_details AS tp
            WHERE ${tag} = ANY(tp.tags)
            AND city = ${city}
            LIMIT 4
        `;
        console.log("rows.length in smartcollection=", rows.length);
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while fetching data.'});
    }
}
