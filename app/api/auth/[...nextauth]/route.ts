import { authOptions } from "@/app/_lib/auth";
import NextAuth from "next-auth";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log("Google OAuth credentials not provided");
  throw new Error("Google OAuth credentials not provided");
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
