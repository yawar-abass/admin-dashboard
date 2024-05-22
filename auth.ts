import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (credentials.username === "admin" && credentials.password === "root") {
      return {
        name: "Admin",
      };
    } else return null;
  },
});

const config = {
  providers: [credentialsConfig],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/dashboard") return !!auth;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
