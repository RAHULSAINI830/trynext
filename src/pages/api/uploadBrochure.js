import cloudinary from 'cloudinary';
import { sql } from '@vercel/postgres';

// Initialize Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};



const uploadBrochure = (brochure) => {
  //imgage = > base64
  //console.log(image);
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(brochure, opts, (error, result) => {
      if (result && result.secure_url) {
      //  console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      else{
        console.log(error.message);
        return reject({ message: error.message });
      }
    });
  });
};



export default async function handler(req, res) {
  const brochures = req.body.brochure;

  const id = req.body.uniqueId;
  //console.log(images);
  //console.log(id);
 //console.log(brochures);
  try {
    const resultUrls = [];

    for (const brochure of brochures) {
      const brochureUrl = await uploadBrochure(brochure);

      resultUrls.push(brochureUrl);
    }

    // Do something with resultUrls on the backend (e.g., store them in a database)
    // Instead of sending them to the frontend, you can handle them here.
    console.log(resultUrls);
    const dbResponse = await storeBrochureInDatabase(resultUrls,id);
    res.status(200).json({ message: "Brochure uploaded successfully" });
  } catch (error) {
    console.error("Error uploading Brochure:", error);
    res.status(500).json({ error: "Internal server error" });

  }
}


async function storeBrochureInDatabase(resultUrls,id) {
  try {
    for (const item of resultUrls) {

      // Check if the propertyId exists in the images table
      const existingRow = await sql`SELECT * FROM brochure WHERE property_id = ${id}`;
      //console.log(existingRow.rows[0][category]);

      if (existingRow.rowCount > 0) {
         const existingCategories = existingRow.rows[0]
         const updatedCategories = [...existingCategories['brochure'], item];
         //console.log(updatedCategories);
         await sql`DELETE FROM brochure WHERE property_id = ${id}`;
         existingCategories['brochure']=updatedCategories;
         console.log(existingCategories);
         await sql`INSERT INTO brochure(property_id, brochure)
                 VALUES (${id}, ${existingCategories.brochure})`;
         //await sql`UPDATE images SET ${category} = ${updatedCategories} WHERE propertyId = ${id}`;
      } else {
        const newRow = {
         id,
         brochure: [],

       };
        newRow['brochure'] = [item];
        await sql`INSERT INTO brochure(property_id, brochure) VALUES(${newRow.id}, ${newRow.brochure})`;
      }
    }

    console.log('Brochure table updated successfully.');
  } catch (error) {
    console.error('Error updating brochure table:', error);
  }
}
