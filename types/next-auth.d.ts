import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "student" | "faculty" | "admin" | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "student" | "faculty" | "admin" | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "student" | "faculty" | "admin" | null;
  }
}