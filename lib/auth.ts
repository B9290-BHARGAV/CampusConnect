import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      let existingUser = await User.findOne({
        email: user.email,
      });

      if (!existingUser) {
        existingUser = await User.create({
          fullName: user.name,
          email: user.email,
          image: user.image,
          provider: "google",
          role: null,
        });
      }

      return true;
    },

    async jwt({ token }) {
      await connectDB();

      const dbUser = await User.findOne({
        email: token.email,
      });

      if (dbUser) {
        token.id = dbUser._id.toString();
        token.role = dbUser.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string | null;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Internal callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // Same-origin URLs
      if (url.startsWith(baseUrl)) {
        return url;
      }

      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};