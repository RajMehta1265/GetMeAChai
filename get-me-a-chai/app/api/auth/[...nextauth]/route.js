import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";

import mongoose from "mongoose";
import User from "@/models/User"; // Make sure this path is correct

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
};

export const authOptions = {
  providers: [
    GitHubProvider({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  authorization: {
    params: {
      scope: "read:user user:email",
    },
  },
}),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
  ],

  pages: {
    signIn: "/login", // 👈 Custom login page
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        try {
          await connectDB();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = await User.create({
              email: user.email,
              name: profile.name || user.name || "",
              username: profile.login.toLowerCase(),
              profilepic: profile.avatar_url || "",
              coverpic: "",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });

            user.id = newUser._id.toString();
          } else {
            user.id = existingUser._id.toString();
          }

          return true;
        } catch (err) {
          console.error("GitHub signIn error:", err);
          return false;
        }
      }

      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
