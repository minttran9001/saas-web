import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./services/user.service";
import { currentUserDto } from "./utils/user.dto";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    signIn: async ({ user, account }) => {
      // If the user is signing in with credentials, check if their email is verified
      if (account?.provider === "credentials") {
        const existingUser = user.id ? await getUserById(user.id) : null;
        return !!existingUser?.emailVerified;
      }
      return true;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (token.sub) {
        const currentUser = await getUserById(token.sub);
        session.user = {
          ...session.user,
          ...(currentUser ? currentUserDto(currentUser) : {}),
        };
      }

      return session;
    },
  },

  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
