import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import postgres from "postgres";
import bcrypt from "bcrypt";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      accountType: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    accountType: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accountType: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Query the database for the user
          const users = await sql`
            SELECT userid, firstname, lastname, email, password, accounttype
            FROM users
            WHERE email = ${credentials.email}
          `;

          if (users.length === 0) {
            return null;
          }

          const user = users[0];

          // Verify password
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            return null;
          }

          // Return the user
          return {
            id: String(user.userid),
            email: user.email,
            name: `${user.firstname} ${user.lastname}`,
            accountType: user.accounttype,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add custom fields to the JWT token
      if (user) {
        token.id = user.id;
        token.accountType = user.accountType;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom fields to the session
      if (session.user) {
        session.user.id = token.id;
        session.user.accountType = token.accountType;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};