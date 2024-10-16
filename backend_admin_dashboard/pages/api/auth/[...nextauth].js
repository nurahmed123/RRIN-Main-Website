import NextAuth from 'next-auth'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/lib/mongodb'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...   
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Specify allowed email addresses
      const allowedEmails = ['06nurahmed@gmail.com', 'contact.robosuperior@gmail.com', 'ibnemahdi5@gmail.com', 'nadimshahriarapurbo@gmail.com', 'mdnurahmadoli529@gmail.com', 'arrohman.contact@gmail.com'];
      // console.log(user.email)
      // Check if the user's email is in the allowed list
      if (allowedEmails.includes(user.email)) {
        return true;
      } else {
        return false;
      }
    },
  },
})