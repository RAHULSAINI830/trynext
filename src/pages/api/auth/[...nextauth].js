import NextAuth from 'next-auth'
import { sql } from '@vercel/postgres';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
//import GetUserByUsername from '../../validate'
import {compare} from "bcryptjs";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      name:"Credentials",
      credentials: {
       // The fields your login form should have
       email: { label: "Email", type: "text" },
       password: { label: "Password", type: "password" }
     },
      async authorize(credentials,req){
         //const user = await GetUserByUsername(credentials.email);
         const result = await sql`SELECT * FROM user_details WHERE mail = ${credentials.email};`;
         if(!result){
            throw new Error("No user Found with Email Please Sign Up...!")
         }

         const user = result.rows[0];
         const checkPassword= await compare(credentials.password,user.password);

        if(!checkPassword || user.mail !== credentials.email){
                   throw new Error("Username or Password doesn't match");
               }

        return {

      name: user.name,
      email: user.mail,
      communication: user.commuincation
    };
      }
    })
  ],
  secret:"j6JyBhfnwJbhQRa0UVtq1FYm6Rm73m8qP8bm0oQj6E0=",
  callbacks: {
    async signIn(user, account, profile) {
      // Check if the user already exists in the database based on their email
      const result = await sql`SELECT * FROM user_details WHERE mail = ${user.email};`;
      const existingUser = result.rows[0];
      console.log(existingUser);
      if (!existingUser) {
        // User is signing in for the first time, so save their Google credentials to the database
        // You can use any unique identifier from the Google profile for password hashing
        await sql`INSERT INTO user_details (name,mail) VALUES (${user.user.name},${user.user.email});`;

      }

      return true; // Return true to indicate successful sign-in
    },
  }


})
