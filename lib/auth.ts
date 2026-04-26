import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const validEmail = process.env.AUTH_EMAIL;
        const validHash = process.env.AUTH_PASSWORD_HASH;
        if (!validEmail || !validHash) return null;
        if (email !== validEmail) return null;
        const pwMatch = await bcrypt.compare(password, validHash);
        if (!pwMatch) return null;
        return { id: "admin", name: "Admin", email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, session }) {
      if (session?.user) token.user = session.user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user as any;
      return session;
    },
  },
  pages: { signIn: "/login" },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};
