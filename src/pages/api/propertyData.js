import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // const {id}=req.query;
  //console.log(id);
  const { matches } = req.body;
  console.log("matches", matches)
  // const json_matches = JSON.parse(matches);
  const ids = matches.map((match) => match.id);

  try {

    const result = await sql`
    SELECT * FROM property_details AS tp
    WHERE
    tp.maxprice IS NOT NULL
    AND tp.category = 'Residential'
    AND tp.maxArea IS NOT NULL 
    AND tp.id = ANY(${ids})
    LIMIT 10
    ;`;

    const originalData = result.rows;
    const newDataArray = originalData.map((item) => {
      const propertysize = item.propertysize || [];
      const [unitCount, landSize] = propertysize;
      let obj2 = matches.find(obj2 => obj2.id == item.id)
      return {
        id: item.id,
        img: item.thumbnail,
        property_name: item.property_name,
        address: item.location,
        range: item.price_range,
        minprice: item.minprice,
        maxprice: item.maxprice,
        status: item.status,
        unitCount: unitCount || '',
        landSize: landSize || '',
        configuration: item.configuration,
        builder_name: item.builder_details?.name || '',
        builder_experience: item.builder_details?.experience || '',
        builder_img: item.builder_details?.img || '',
        builder_desc: item.builder_details?.desc || '',
        max_Area: item.maxarea,
        min_Area: item.minarea,
        airport: item.airpot_distance,
        metro: parseFloat(item.metro_distance?.dist),
        school: parseFloat(item.school?.rate),
        Similarity: obj2.Similarity,
        tags: item.tags,
      };
    });


    //console.log(newDataArray[0]);
    res.status(200).json(newDataArray);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'An error occurred while fetching data.' });
  }
}
