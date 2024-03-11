import { sql } from "@vercel/postgres";

export default async function handler({ query }, res) {
  if (typeof query.query === "string") {
    try {
      const search = query.query; // Renamed 'seach' to 'search' for consistency
      const result = await sql`
      SELECT *
      FROM "blog_posts"
      WHERE
          title ~* ${search}
          OR name ~* ${search}
          OR category ~* ${search}
          ORDER BY "date" DESC;
      `;
      const posts = result.rows;
      const data = posts;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else if (query.query === undefined) {
    // Corrected the condition here
    try {
      const result = await sql`
        SELECT * FROM posts ORDER BY "id";
      `;
      const posts = result.rows;
      const data = posts;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
