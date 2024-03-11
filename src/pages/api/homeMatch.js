import { sql } from '@vercel/postgres';
//
export default async function handler(req, res) {
  // Retrieve the form data from the request body
  const { key, selectedPrice, selectedBedRoom, selectedFlight, selectedTransport, selectedFamily, selectedApar, selectedAmenities, selectedProximity, city } = req.body;
  const selectedBedRoomButtonText = selectedBedRoom?.buttonText || 'No bedroom preference';
  const selectedPriceButtonText = selectedPrice?.buttonText || 'No price preference';
  const selectedFlightButtonText = selectedFlight?.buttonText || 'No flight preference';
  const selectedFamilyButtonText = selectedFamily?.buttonText || 'No family preference';
  const selectedAparButtonText = selectedApar?.buttonText || 'No apartment preference';
  const selectedProximityButtonText = selectedProximity?.buttonText || 'No proximity preference';
  const selectedTransportButtonText = selectedTransport?.buttonText || 'No transport preference';

  const modelInput = {
    "city": city,
    "min_price": selectedPriceButtonText === 'No price preference' ? 0 : selectedPriceButtonText.split(' ')[0] === 'Less' ? 0 : selectedPriceButtonText.split(' ')[0] === 'Above' ? 3 : Number(selectedPriceButtonText.split(' ')[0][0]), // 0 if no preference
    "max_price": selectedPriceButtonText === 'No price preference' ? 0 : selectedPriceButtonText.split(' ')[0] === 'Less' ? Number(selectedPriceButtonText.split(' ')[2]) : selectedPriceButtonText.split(' ')[0] === 'Above' ? 3 /* change for above 3cr input */ : Number(selectedPriceButtonText.split(' ')[2][0]),
    "gym": selectedAmenities.includes("Gym") ? 1 : 0,
    "swimming_pool": selectedAmenities.includes('Swimming Pool') ? 1 : 0,
    "sports": selectedAmenities.includes('Sports Court') ? 1 : 0,
    "backup": selectedAmenities.includes("Power Backup") ? 1 : 0,
    "garden": selectedAmenities.includes('Gardens') ? 1 : 0,
    "restaurant": selectedAmenities.includes('Restaurant') ? 1 : 0,
    "gated_access": selectedAmenities.includes('Gated Access') ? 1 : 0,
    "2_BHK": selectedBedRoomButtonText === '2 BHK' ? 1 : 0,
    "3_BHK": selectedBedRoomButtonText === '3 BHK' || selectedBedRoomButtonText === '2 BHK' ? 1 : 0,
    "4_BHK": selectedBedRoomButtonText === '4 BHK' || selectedBedRoomButtonText === '3 BHK' || selectedBedRoomButtonText === '2 BHK' ? 1 : 0,
    "4_plus_BHK": selectedBedRoomButtonText === '4 BHK +' || selectedBedRoomButtonText === '4 BHK' || selectedBedRoomButtonText === '3 BHK' || selectedBedRoomButtonText === '2 BHK' ? 1 : 0,
    "airpot_distance_Always": selectedFlightButtonText === 'Always' ? 1 : 0,
    "airpot_distance_Rarely": selectedFlightButtonText === 'Rarely' ? 1 : 0,
    "airpot_distance_Sometimes": selectedFlightButtonText === 'Sometimes' ? 1 : 0,
    "metro_distance_Always": selectedTransportButtonText === 'Always' ? 1 : 0,
    "metro_distance_Rarely": selectedTransportButtonText === 'Rarely' ? 1 : 0,
    "metro_distance_Sometimes": selectedTransportButtonText === 'Sometimes' ? 1 : 0,
    "popular_hubs_Important": selectedProximityButtonText === 'Important' ? 1 : 0,
    "popular_hubs_Not_important": selectedProximityButtonText === 'Not Important' ? 1 : 0,
    "popular_hubs_Very_important": selectedProximityButtonText === 'Very Important' ? 1 : 0,
    "school_distance_Children_living_with_me": selectedFamilyButtonText === 'Children living with me' ? 1 : 0,
    "school_distance_Children_not_living_with_me": selectedFamilyButtonText === 'Children not living with me' ? 1 : 0,
    "school_distance_No_children_and_no_plan": selectedFamilyButtonText === 'No children & no plans' ? 1 : 0,
    "school_distance_No_children_but_planning": selectedFamilyButtonText === 'No children but planning' ? 1 : 0,
    "property_type_budget": selectedAparButtonText === 'Budget' ? 1 : 0,
    "property_type_luxury": selectedAparButtonText === 'Luxury' ? 1 : 0,
    "property_type_unknown": selectedAparButtonText === 'No apartment preference' || selectedAparButtonText === '' ? 1 : 0

  };

  const response = await fetch('https://smartneevrecomv1.azurewebsites.net/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(modelInput)
  });

  const data = await response.json();
  console.log(data);

  try {

    // Insert the form data into the database using parameterized query
    //await sql`CREATE TABLE IF NOT EXISTS home_matchmaking ( mail varchar(255),price varchar(255), bedrooms varchar(255), flight varchar(255), transport varchar(255), family varchar(255), apartment varchar(255), amenitites varchar(255), proximity varchar(255)  );`;
    //await pool.query('INSERT INTO partnertable (name, company, project, phone) VALUES ($1, $2, $3, $4)', [name, company, project, phone]);
    // const dat=await sql`Select * from property_details limit 6;`;
    // console.log("data", data)
    await sql`INSERT INTO home_matchmaking (mail,price, bedrooms, flight, transport, family, apartment, amenitites, proximity,city, home_matches ) VALUES (${key},${selectedPriceButtonText}, ${selectedBedRoomButtonText}, ${selectedFlightButtonText}, ${selectedTransportButtonText},  ${selectedFamilyButtonText},  ${selectedAparButtonText},  ${selectedAmenities},  ${selectedProximityButtonText}, ${city},${JSON.stringify(data)});`;
    // const dat=await sql`Select * from home_matchmaking where home_matches is not null;`;
    // console.log(dat.rows[0].registration)
    // console.log(dat.rows[0].home_matches[0].Property);

    res.status(200).json({ data, message: 'Form submitted successfully!' });
  } catch (error) {
    console.log({ key, selectedPrice, selectedBedRoom, selectedFlight, selectedTransport, selectedFamily, selectedApar, selectedAmenities, selectedProximity, city });
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Oops! An error occurred while submitting the form.' });
  }
};
