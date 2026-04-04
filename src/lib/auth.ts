import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const resolvedAuthUrl =
  process.env.NEXTAUTH_URL ??
  process.env.BASE_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);

if (!process.env.NEXTAUTH_URL && resolvedAuthUrl) {
  process.env.NEXTAUTH_URL = resolvedAuthUrl;
}

const resolvedAuthSecret =
  process.env.NEXTAUTH_SECRET ??
  process.env.AUTH_SECRET ??
  (process.env.NODE_ENV === "development" ? "dev-only-nextauth-secret-change-me" : undefined);

if (!process.env.NEXTAUTH_SECRET && resolvedAuthSecret) {
  process.env.NEXTAUTH_SECRET = resolvedAuthSecret;
}

export const authOptions: NextAuthOptions = {
  secret: resolvedAuthSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await compare(credentials.password, user.passwordHash);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role ?? "EDITOR";
      }

      return session;
    },
  },
};

export async function getAuthSession() {
  return getServerSession(authOptions);
}
