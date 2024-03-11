import { sql } from '@vercel/postgres';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';
import Image from "next/image";

async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    // Replace these settings with your email service provider or SMTP server details
    host:'smtpout.secureserver.net',
    port:465,
    secure: true,
    auth: {
      user: 'info@smartneev.com', // your email address
      pass: 'Smart@123J', // your email password or API key
    },
  });

  const mailOptions = {
    from: 'info@smartneev.com', // your email address
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}




export default async function handler(req, res) {
  // Helper function to generate a random token
const generateToken = async () => {
  const randomBytesAsync = promisify(randomBytes);
  return (await randomBytesAsync(32)).toString('hex');
};


  try {

    const {email}= req.body;
    const token = await generateToken();
    console.log(token);
    // Save the token and user's email in the database (you need a 'reset_tokens' table for this)
    await sql`CREATE TABLE IF NOT EXISTS password_reset_tokens ( email varchar(255), token varchar(255), expires_at TIMESTAMP WITH TIME ZONE);`;
    await sql`INSERT INTO password_reset_tokens (email, token, expires_at)
      VALUES (${email}, ${token}, NOW() + INTERVAL '1 hour');
    `;

    // Send the password reset email with the token
    const resetLink = `http://localhost:3000/Login/set-new-password?token=${token}`;
    const emailBody = `<!DOCTYPE html>
<html>
<head>
  <style>
  .horizontal-line {
   display: block;
   border: none;
   text-color: black
   border-top: 1px solid ;
   margin: 10px 0;
   padding: 0;
 }
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    a {
      color: #007bff;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
</style>
</head>
<body>

<h1>Hi,</h1>
    <br></br>
    <p>We Have received your request to reset the password of your SmartNeev account.</p>

    <a href=${resetLink}>Reset Password</a>

    <p>this Link will expire in 24 hours.If you did not request to reset password please report at info@smartneev.com</p>
   <br class="horizontal-line" ></br>
    <p>Thanks & Regards,</p>
    <p>Team smartneev</p>
    <p class="text-lg">+91 9810774502</p>
  </body>
  </html>`;
    await sendEmail(email, 'Password Reset', emailBody);

    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Failed to update user data' });
  }
}
//Click the following link to reset your password: ${resetLink}
