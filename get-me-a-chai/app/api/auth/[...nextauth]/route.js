import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
// import AppleProvider from 'next-auth/providers/apple';
import mongoose from "mongoose"; // Adjust the import path as necessary
import User from '@/models/User';
import Payment from '@/models/Payment';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // ❌ Removed EmailProvider to avoid adapter errors
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider == "github")
      {
        //Connect to database
        const client = await mongoose.connect();
        const currentUser = User.findOne({email:email})
        if(!currentUser)
        {
          //Create new user
          const newUser = await User.create({
            email: email,
            name: profile.name,
            username: profile.login.toLowerCase().replace(/\s+/g, ""),
            profilepic: profile.avatar_url,
            coverpic: "",
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
          user.id = newUser._id;
        }
        else
        {
          user.id = currentUser._id;
        }
      }
    },
  },
};

const handler = (req, res) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };
