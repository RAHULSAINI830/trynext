import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  const { name } = request.query;

  try {
    if (!name) {
      return response.status(400).json({ error: "Missing 'name' parameter" });
    }
    const result = await sql`
      SELECT pd.*, im.*
      FROM property_details pd
      LEFT JOIN prop_images im
      ON pd.id = im.prop_id
      WHERE pd.property_name = ${name};`;

    const data = result.rows[0];
    const loc = data.location;
    let nearBy;
    try {

      const properties = await sql`
      SELECT pd.property_name,pd.builder_details,pd.configuration,pd.price_range,pd.propertysize, pd.thumbnail FROM property_details pd
      WHERE pd.location = ${loc}
      AND pd.property_name <> ${name}
      AND pd.category = 'Residential'
      AND pd.price_range <> 'Price on request';`;

      nearBy = properties.rows;
    } catch (error) {
      console.error("Error in nearBy query:", error);
      // handle the error, e.g., return an error response
    }

    if (!data) {
      return response.status(404).json({ error: "property not found" });
    }

    return response.status(200).json({ data, nearBy });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
