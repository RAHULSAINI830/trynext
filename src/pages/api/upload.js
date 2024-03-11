// import cloudinary from 'cloudinary';
// import { sql } from '@vercel/postgres';
//
// // Initialize Cloudinary
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// const opts = {
//   overwrite: true,
//   invalidate: true,
//   resource_type: "auto",
// };
//
// export default async function upload(req,res){
//
//  try{
//
//    const results= await sql`SELECT id, "4_BHK_plan" From test_properties WHERE CAST(id AS NUMERIC) > 2258 AND "4_BHK_plan" IS NOT NULL ORDER BY CAST(id AS NUMERIC)  ASC `;
//    //console.log(results.rows[0].id);
//
//    for (const row of results.rows) {
//         const id  = row.id;
//         const url= row['4_BHK_plan'];
//         //console.log(id);
//         //console.log(url);
//         const secureImageLinks = [];
//         let imagesExist = false;
//        for(const obj of url){
//          const image = obj.img;
//          const area = obj.name.replace(/\s+/g, '');
//          //console.log(obj.img);
//          //console.log(area);
//          if (!image) {
//        console.log(`Image URL is empty or undefined for prop_id ${id}`);
//        continue; // Skip this iteration and move to the next one
//      }
//          const cloudinaryResponse = await cloudinary.v2.uploader.upload(image, {
//           folder: `property_images/${id}`,
//           unique_filename: "false",
//           public_id: `${area}`, // Use prop_id as the Cloudinary public_id
//           overwrite: true,       // Overwrite if an image with the same public_id exists
//         });
//         const secureUrl = cloudinaryResponse.secure_url;
//         secureImageLinks.push(cloudinaryResponse.secure_url);
//         imagesExist = true;
//         //console.log(` ${id} uploaded : ${secureUrl}`);
//        }
//        console.log(`uploaded images : ${secureImageLinks}`);
//
//    // Save the secure URL and prop_id into your table
//    if (imagesExist) {
//       //  console.log(`Uploaded images for prop_id ${id}: ${secureImageLinks}`);
//
//         // Save the secure URL and prop_id into your table
//         const push = await sql`UPDATE prop_images SET "4bhk" = ${secureImageLinks} WHERE prop_id = ${id}`;
//         console.log(`Saved image information for prop_id ${id}`);
//       }
//     }
//
//    res.status(200).json({message: "image uploaded"});
//  } catch(error){
//    console.log(error);
//    res.status(500).json({error: "internal server error"});
//  }
// }




import cloudinary from 'cloudinary';
const XLSX = require('xlsx');

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Read Excel file
const workbook = XLSX.readFile('C:/Users/Vidit Mittal/Desktop/smartneev internship/temp_images.xlsx');
const sheetName = workbook.SheetNames[0];
const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Function to upload image to Cloudinary using fetch
async function uploadToCloudinary(propId, imageUrl) {
  console.log(imageUrl);
  try {
    const secureImageLinks = [];
    for (const image of imageUrl) {

     console.log(image);
      console.log(propId, ' : ', image);

      const cloudinaryResponse = await cloudinary.v2.uploader.upload(image, {
        folder: `property_images/${propId}/images`,
        unique_filename: "false",
        overwrite: false,    // Overwrite if an image with the same public_id exists
      });

      const secureUrl = cloudinaryResponse.secure_url;
      secureImageLinks.push(secureUrl);
    }
    return secureImageLinks;
  } catch (error) {
    console.log('error uploading :', error);
    throw error;
  }
}

// Process and upload images
export default async function processImages() {
  const processedData = [];
  for (const item of excelData) {
    const propId = item['propId'].toString();
    const imagesArray = item['images'];

    try {
      const response = await uploadToCloudinary(propId, imagesArray);
      processedData.push({
        propId: propId,
        urls: response,
      });
    } catch (error) {
      console.error(`Error processing images for propId ${propId}:`, error);
    }
  }

  // Step 2: Save the processed data to a new Excel file
  const processedWorkbook = XLSX.utils.book_new();
  const processedWorksheet = XLSX.utils.json_to_sheet(processedData);
  XLSX.utils.book_append_sheet(processedWorkbook, processedWorksheet, 'Processed Data');
  XLSX.writeFile(processedWorkbook, 'C:/Users/Vidit Mittal/Desktop/smartneev internship/new_images.xlsx');
}

//
//  import cloudinary from 'cloudinary';
// const XLSX = require('xlsx');
//
//
// // Configure Cloudinary with your credentials
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
//
// // Read Excel file
// const workbook = XLSX.readFile('C:/Users/Vidit Mittal/Desktop/smartneev internship/temp_images.xlsx');
// const sheetName = workbook.SheetNames[0];
// const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
//
//
//
// // Function to upload image to Cloudinary using fetch
// async function uploadToCloudinary(propId, imageUrl) {
//   try {
//     const secureImageLinks = [];
//     for(const image of imageUrl){
//       //console.log(obj.img);
//       console.log(propId,' : ',image);
//       //console.log(area);
//       const cloudinaryResponse = await cloudinary.v2.uploader.upload(image, {
//        folder: `property_images/${propId}/images`,
//        unique_filename: "false",
//        public_id: `images`, // Use prop_id as the Cloudinary public_id
//        overwrite: false,       // Overwrite if an image with the same public_id exists
//      });
//      const secureUrl = cloudinaryResponse.secure_url;
//      secureImageLinks.push(cloudinaryResponse.secure_url);
//
//      //console.log(` ${id} uploaded : ${secureUrl}`);
//     }
//     return secureImageLinks;
//
// }catch (error){
//   console.log('error uploading :', error);
// }
// }
// // Process and upload images
// export default async function processImages() {
//   const processedData = [];
//   for (const item of excelData) {
//     const propId = item['propId'].toString();
//     const imagesArray = item['images'];
//
//     // console.log(propId);
//     // console.log(imagesArray);
//
//
//     // for (const imageUrl of imagesArray) {
//     //   const cloudinaryUrl = await uploadToCloudinary(propId, imageUrl);
//     //   if (cloudinaryUrl) {
//     //     cloudinaryUrls.push(cloudinaryUrl);
//     //   }
//     // }
//   const response= await uploadToCloudinary(propId,imagesArray);
//
//     // Add propId and cloudinary URLs to processed data
//     processedData.push({
//       propId: propId,
//       urls: response,
//     });
//   }
//
//   // Step 2: Save the processed data to a new Excel file
//   const processedWorkbook = XLSX.utils.book_new();
//   const processedWorksheet = XLSX.utils.json_to_sheet(processedData);
//   XLSX.utils.book_append_sheet(processedWorkbook, processedWorksheet, 'Processed Data');
//   XLSX.writeFile(processedWorkbook, 'C:/Users/Vidit Mittal/Desktop/smartneev internship/new_images.xlsx');
// }
