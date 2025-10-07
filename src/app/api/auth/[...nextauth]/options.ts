import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { readFileSync } from "fs";
import { join } from "path";

const users = JSON.parse(readFileSync(join(process.cwd(), "src/app/api/data/users.json"), "utf8"));

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "assword", type: "password" },
      },
      async authorize(credentials) {

        // In actual senario db operations will be performed , and password would be encrypted
        const { email, password } = credentials ?? {};
        const foundUser = users.find((u:{id:number,email:string,password:string}) => u.email === email);

        if (!foundUser) {
          throw new Error("User not found");
        }

        if (foundUser.password !== password) {
          throw new Error("Invalid password");
        }

        return { id: foundUser.id, email: foundUser.email, username:foundUser.username };
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString();
        token.email = user.email;
        token.username=user.username
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
