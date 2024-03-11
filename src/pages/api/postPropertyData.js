import { sql } from '@vercel/postgres';

export default async function handler(req, res) {


  try {
    const { uniqueId, email, values } = req.body;
    console.log(req.body);
    const {
      pincode,
      city,
      address,
      propertyType,
      society,
      floorNumber,
      totalFloors,
      bhk,
      superArea,
      carpetArea,
      status,
      balconies,
      parkings,
      bathrooms,
      otherRooms,
      furnishing,
      facing,
      selectedAmenities,
      details,
      agentType,
      ownership,
      minPrice,
      minPriceType,
      maxPriceType,
      maxPrice,
      maintenance,
      category
    } = req.body.values;
    const minP = minPrice + ' ' + minPriceType;
    const maxP = maxPrice + ' ' + maxPriceType;
    const otherRoomsValues = otherRooms.map(room => room.value.toLowerCase());
     console.log(email);
     console.log(uniqueId);
     console.log(otherRoomsValues);
    await sql`INSERT INTO posted_properties (
        propertyId,
        address,
        agentType,
        balconies,
        bathrooms,
        bhk,
        carpetArea,
        city,
        details,
        facing,
        floorNumber,
        furnishing,
        maintenance,
        maxPrice,
        minPrice,
        otherRooms,
        ownership,
        parkings,
        propertyType,
        selectedAmenities,
        society,
        pincode,
        status,
        superArea,
        totalFloors,
        userEmail,
        category
      ) VALUES (
        ${uniqueId}, ${address}, ${agentType}, ${balconies}, ${bathrooms}, ${bhk}, ${carpetArea}, ${city}, ${details}, ${facing}, ${floorNumber}, ${furnishing}, ${maintenance}, ${maxP}, ${minP}, ${otherRoomsValues}, ${ownership}, ${parkings}, ${propertyType}, ${selectedAmenities}, ${society}, ${pincode}, ${status}, ${superArea}, ${totalFloors}, ${email},${category}
      )`;
    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Failed to update user data' });
  }
}
