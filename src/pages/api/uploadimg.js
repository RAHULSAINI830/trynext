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

const uploadImage = (image) => {
  //imgage = > base64
  //console.log(image);
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, opts, (error, result) => {
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
  const images = req.body.images;

  const id = req.body.uniqueId;
  //console.log(images);
  //console.log(id);

  try {
    const resultUrls = [];

    for (const image of images) {
      const imageUrl = await uploadImage(image.base);
      const category=image.category;
      resultUrls.push({imageUrl,category});
    }

    //console.log(resultUrls);
    const dbResponse = await storeImageUrlInDatabase(resultUrls,id);
    res.status(200).json({ message: "Images uploaded successfully" });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal server error" });

  }
}

async function storeImageUrlInDatabase(resultUrls,id) {
  try {
    for (const item of resultUrls) {
      const { imageUrl, category } = item;
      // Check if the propertyId exists in the images table
      const existingRow = await sql`SELECT * FROM images WHERE property_id = ${id}`;

      // console.log(imageUrl);
      // console.log(category);
      if (existingRow.rowCount > 0) {
         const existingCategories = existingRow.rows[0]
         const updatedCategories = [...existingCategories[category], imageUrl];
         //console.log(updatedCategories);
         await sql`DELETE FROM images WHERE property_id = ${id}`;
         existingCategories[category]=updatedCategories;
         //console.log(existingCategories);
         await sql`INSERT INTO images(property_id, bedroom, bathroom, kitchen, hall,floor_plan, other)
                 VALUES (${id}, ${existingCategories.bedroom}, ${existingCategories.bathroom},
                         ${existingCategories.kitchen}, ${existingCategories.hall},${existingCategories.floor_plan},
                         ${existingCategories.other})`;
      } else {
        const newRow = {
         id,
         bedroom: [],
         bathroom: [],
         kitchen: [],
         hall: [],
         floor_plan:[],
         other: [],
       };
        newRow[category] = [imageUrl];
        await sql`INSERT INTO images(property_id, bedroom, bathroom, kitchen, hall,floor_plan, other) VALUES(${newRow.id}, ${newRow.bedroom}, ${newRow.bathroom}, ${newRow.kitchen}, ${newRow.hall},${newRow.floor_plan}, ${newRow.other})`;
      }
    }

    console.log('Images table updated successfully.');
  } catch (error) {
    console.error('Error updating images table:', error);
  }
}
