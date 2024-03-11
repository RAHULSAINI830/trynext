import { sql } from '@vercel/postgres';
import {hash} from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { token, password } = req.body;
  const hashedPassword = await hash(password,12);
  try {
    // Check if the token exists in the database and is not expired
    const tokenExists = await sql`
      SELECT EXISTS(
        SELECT 1 FROM password_reset_tokens WHERE token = ${token} AND expires_at > NOW()
      );
    `;

    if (!tokenExists) {
      // Token not found or expired
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Update the user's password in the database
    await sql`
      UPDATE user_details SET password = ${hashedPassword} WHERE mail = (
        SELECT mail FROM password_reset_tokens WHERE token = ${token}
      );
    `;

    // Delete the used token from the database
    await sql`
      DELETE FROM password_reset_tokens WHERE token = ${token};
    `;

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ error: 'Failed to update password' });
  }
}
