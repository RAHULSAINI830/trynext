import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  const { shortname } = request.query;
// console.log(shortname)
  try {
    if (!shortname) {
      return response.status(400).json({ error: "Missing 'shortname' parameter" });
    }
    console.log(shortname)
    const result = await sql`SELECT image FROM "blog_posts" WHERE shortname = ${shortname};`;
    const post = result.rows[0];

    if (!post) {
      return response.status(404).json({ error: "Blog post not found" });
    }

    return response.status(200).json(post);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
