
import fetch from 'node-fetch';

export default async (req, res) => {
  console.log("Hit amenities api -> req.query",req.query)
  const { location, radius, type } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY; // Get your API key from environment variables
  console.log(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`)
  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data.results);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching amenities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//
// Gym "leisure"="fitness_centre"
// Temples "amenity"="place_of_worship"
//
// Metro Stations: Tagged with "railway"="station" or "station"="subway" or specific tags for the metro system in a particular city
// Restaurants: Tagged with "amenity"="restaurant"
// Parks: Tagged with "leisure"="park"
//amenity=school
//amenity=hospital
