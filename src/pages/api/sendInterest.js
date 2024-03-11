import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  const { userName, userEmail, userPhone, userText, property_name } = req.body;

  // console.log(userName, userEmail, userPhone, userText, property_name);
  try {
    await sql`INSERT INTO send_interest (name, email, phone, text, property_name) VALUES (${userName},${userEmail}, ${userPhone}, ${userText}, ${property_name});`;
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    // console.log({ userName, userEmail, userPhone, userText, property_name });
    if (error.code === "23505") {
      // Custom error message for duplicate entry
      res
        .status(400)
        .json({ error: "Interest for this property and email already sent!" });
    } else {
      // Handle other errors
      console.error("Error submitting form:", error);
      res
        .status(500)
        .json({ error: "An error occurred while submitting the form." });
    }
  }
}
